"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const auth_model_1 = require("../Auth/auth.model");
const carService_model_1 = require("../CarServices/carService.model");
const slots_model_1 = require("../Slots/slots.model");
const booking_model_1 = require("./booking.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createBookingIntoDB = (payload, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const user = yield auth_model_1.User.isUserExists(email);
    const customerId = user === null || user === void 0 ? void 0 : user._id;
    if (!user) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist!");
    }
    const service = yield carService_model_1.CarService.findById(payload === null || payload === void 0 ? void 0 : payload.service);
    if (!service) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Car Service doesn't exist!");
    }
    const slot = yield slots_model_1.SlotAppointment.findById(payload === null || payload === void 0 ? void 0 : payload.slot);
    if (!slot) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Slot Appointment doesn't exist!");
    }
    const bookingData = Object.assign(Object.assign({}, payload), { customer: customerId });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const [createdBooking] = yield booking_model_1.Booking.create([bookingData], { session });
        const result = yield createdBooking.populate([
            { path: 'customer' },
            { path: 'service' },
            { path: 'slot' },
        ]);
        if (!Object.keys(result).length) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to book service!');
        }
        yield slots_model_1.SlotAppointment.findByIdAndUpdate(slot === null || slot === void 0 ? void 0 : slot._id, { isBooked: 'booked' }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        // throw new AppError(httpStatus.BAD_REQUEST, 'Failed to book service!');
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate([
        { path: 'customer' },
        { path: 'service' },
        { path: 'slot' },
    ]);
    if (result.length === 0) {
        return null;
    }
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
};

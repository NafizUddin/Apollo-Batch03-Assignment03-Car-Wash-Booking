"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const bookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CarService',
        required: true,
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Slot', // database name
        required: true,
    },
    vehicleType: {
        type: String,
        enum: {
            values: booking_constant_1.vehicleTypes,
            message: '{VALUE} is not a valid vehicle type',
        },
        required: [true, 'Vehicle type is required'],
    },
    vehicleBrand: {
        type: String,
        required: [true, 'Vehicle brand is required'],
    },
    vehicleModel: {
        type: String,
        required: [true, 'Vehicle model is required'],
    },
    manufacturingYear: {
        type: Number,
        required: [true, 'Manufacturing year is required'],
        min: [1886, 'Manufacturing year must be greater than or equal to 1886'], // Considering the first car was made in 1886
    },
    registrationPlate: {
        type: String,
        unique: true,
        required: [true, 'Registration plate is required'],
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);

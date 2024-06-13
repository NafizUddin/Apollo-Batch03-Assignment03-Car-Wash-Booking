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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotServices = void 0;
const slots_model_1 = require("./slots.model");
const getAvailableSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if ((query === null || query === void 0 ? void 0 : query.date) && (query === null || query === void 0 ? void 0 : query.serviceId)) {
        const result = yield slots_model_1.SlotAppointment.find({
            date: query === null || query === void 0 ? void 0 : query.date,
            service: query === null || query === void 0 ? void 0 : query.serviceId,
        }).populate('service');
        if (result.length === 0) {
            return null;
        }
        return result;
    }
    else if (query === null || query === void 0 ? void 0 : query.date) {
        const result = yield slots_model_1.SlotAppointment.find({
            date: query === null || query === void 0 ? void 0 : query.date,
        }).populate('service');
        if (result.length === 0) {
            return null;
        }
        return result;
    }
    else if (query === null || query === void 0 ? void 0 : query.serviceId) {
        const result = yield slots_model_1.SlotAppointment.find({
            service: query === null || query === void 0 ? void 0 : query.serviceId,
        }).populate('service');
        if (result.length === 0) {
            return null;
        }
        return result;
    }
    const result = yield slots_model_1.SlotAppointment.find().populate('service');
    if (result.length === 0) {
        return null;
    }
    return result;
});
exports.SlotServices = {
    getAvailableSlotsFromDB,
};

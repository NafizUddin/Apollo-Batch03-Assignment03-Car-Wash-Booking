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
/* eslint-disable @typescript-eslint/no-explicit-any */
const slots_model_1 = require("./slots.model");
const getAvailableSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const dateArray = (query === null || query === void 0 ? void 0 : query.date) ? query === null || query === void 0 ? void 0 : query.date.split(',') : null; // Split the date string into an array
    const queryConditions = {};
    if (dateArray && dateArray.length > 0) {
        queryConditions.date = { $in: dateArray }; // Use $in operator for matching multiple dates
    }
    if (query === null || query === void 0 ? void 0 : query.serviceId) {
        queryConditions.service = query === null || query === void 0 ? void 0 : query.serviceId;
    }
    const result = yield slots_model_1.SlotAppointment.find(queryConditions).populate('service');
    if (result.length === 0) {
        return null;
    }
    return result;
});
exports.SlotServices = {
    getAvailableSlotsFromDB,
};

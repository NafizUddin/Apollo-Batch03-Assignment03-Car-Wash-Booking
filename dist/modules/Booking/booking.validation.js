"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: 'Service Id is required',
        }),
        slotId: zod_1.z.string({
            required_error: 'Slot Id is required',
        }),
    }),
});
exports.bookingValidations = {
    createBookingValidationSchema,
};

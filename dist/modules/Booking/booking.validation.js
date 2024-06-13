"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: 'Service Id is required',
        }),
        slotId: zod_1.z.string({
            required_error: 'Slot Id is required',
        }),
        vehicleType: zod_1.z.enum([...booking_constant_1.vehicleTypes]),
        vehicleBrand: zod_1.z.string({
            required_error: 'Vehicle Brand is required',
            invalid_type_error: 'Vehicle Brand must be a string',
        }),
        vehicleModel: zod_1.z.string({
            required_error: 'Vehicle Model is required',
            invalid_type_error: 'Vehicle Model must be a string',
        }),
        manufacturingYear: zod_1.z
            .number()
            .int()
            .min(1886, 'Manufacturing year must be greater than or equal to 1886')
            .positive(),
        registrationPlate: zod_1.z.string({
            required_error: 'Registration Plate is required',
            invalid_type_error: 'Registration Plate must be a string',
        }),
    }),
});
exports.bookingValidations = {
    createBookingValidationSchema,
};

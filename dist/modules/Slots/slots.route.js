"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const slots_controllers_1 = require("./slots.controllers");
const auth_constant_1 = require("../Auth/auth.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/availability', (0, auth_1.default)(auth_constant_1.USER_ROLE.admin, auth_constant_1.USER_ROLE.user), slots_controllers_1.SlotControllers.getAvailableSlots);
exports.SlotRoutes = router;

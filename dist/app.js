"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['https://turboshine-apollob3a5.netlify.app'], // Allow requests from this origin
    credentials: true, // Allow cookies and other credentials
}));
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Car Wash Booking!');
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;

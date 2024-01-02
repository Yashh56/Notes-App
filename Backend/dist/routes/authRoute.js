"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../controllers/AuthController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/signup', AuthController_1.signup);
router.post('/login', AuthController_1.login);
router.get('/logout', AuthController_1.logout);
router.get('/refetch', AuthController_1.refetch);
exports.default = router;
//# sourceMappingURL=authRoute.js.map
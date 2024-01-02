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
exports.verifyToken = exports.JWT_SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt = jsonwebtoken_1.default;
exports.JWT_SECRET = 'zoro';
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json('You need to Login');
    }
    jwt.verify(token, exports.JWT_SECRET, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json('Token is not valid !!');
        }
        req.userId = data.id;
        // console.log("passed")
        next();
    }));
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map
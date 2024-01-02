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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refetch = exports.logout = exports.login = exports.signup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = require("../utils/verifyToken");
const jwt = jsonwebtoken_1.default;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // const user = User.findOne({ email: email })
        // if (user) {
        //     return res.status(400).json({ message: "The user already exists" })
        // }
        const salt = yield bcryptjs_1.default.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, parseInt(salt));
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const savedUser = yield newUser.save();
        res.status(200).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "The user does not exist" });
        }
        const validPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "The password is not valid" });
        }
        const token = jwt.sign({ _id: user._id, user: user.username, email: user.email }, verifyToken_1.JWT_SECRET, { expiresIn: '3d' });
        const _a = user._doc, { password } = _a, info = __rest(_a, ["password"]);
        res.cookie('token', token).status(200).json(Object.assign(Object.assign({}, info), { token }));
        // res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token', { sameSite: 'none', secure: true }).status(200).json({ message: "Logged out" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});
exports.logout = logout;
const refetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    jwt.verify(token, verifyToken_1.JWT_SECRET, {}, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(404).json(err);
        }
        res.status(200).json(data);
    }));
});
exports.refetch = refetch;
//# sourceMappingURL=AuthController.js.map
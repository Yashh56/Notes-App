"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectToDB_js_1 = require("./db/connectToDB.js");
const authRoute_js_1 = __importDefault(require("./routes/authRoute.js"));
const postRoute_js_1 = __importDefault(require("./routes/postRoute.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
// Middlewares
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// DB
(0, connectToDB_js_1.connectToDB)();
// Routes
app.use('/api/auth', authRoute_js_1.default);
app.use('/api/posts', postRoute_js_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    return console.log(`Express is listening at http://localhost:${3000}}`);
});
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const todos_json_1 = __importDefault(require("./docs/todos.json"));
const app = (0, express_1.default)();
// EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../src/templates'));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(todos_json_1.default));
app.use('/api/todos', todo_route_1.default);
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));

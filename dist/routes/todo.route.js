"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controllers/todo.controller");
const todoRoutes = express_1.default.Router();
todoRoutes.get('/', todo_controller_1.getAllTodos);
todoRoutes.post('/', todo_controller_1.createTodo);
todoRoutes.get('/:id', todo_controller_1.getTodoById);
todoRoutes.put('/:id', todo_controller_1.updateTodo);
todoRoutes.delete('/:id', todo_controller_1.deleteTodo);
exports.default = todoRoutes;

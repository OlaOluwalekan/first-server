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
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.createTodo = exports.getAllTodos = void 0;
const todos_1 = require("../utils/todos");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const todo_model_1 = require("../models/todo.model");
const uuid_1 = require("uuid");
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, todos_1.readTodos)();
        res
            .status(http_status_codes_1.default.OK)
            .json({ success: true, error: null, data: { todos } });
    }
    catch (error) {
        console.log('Error getting todos ==> ', error);
        res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .json({ success: false, error: 'Error getting todos', data: null });
    }
});
exports.getAllTodos = getAllTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const parsedBody = todo_model_1.todoSchema.safeParse(body);
        if (!parsedBody.success) {
            return res
                .status(http_status_codes_1.default.BAD_REQUEST)
                .json({ success: false, error: 'Invalid request body', data: null });
        }
        const existingTodos = yield (0, todos_1.readTodos)();
        const newTodo = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, parsedBody.data), { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        const todos = [...existingTodos, newTodo];
        yield (0, todos_1.writeTodos)(todos);
        res
            .status(http_status_codes_1.default.CREATED)
            .json({ success: true, error: null, data: { todo: newTodo } });
    }
    catch (error) {
        console.log('Error creating todo ==> ', error);
        res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .json({ success: false, error: 'Error creating todo', data: null });
    }
});
exports.createTodo = createTodo;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingTodos = yield (0, todos_1.readTodos)();
        const todo = existingTodos.find((t) => t.id === id);
        if (!todo) {
            return res
                .status(http_status_codes_1.default.NOT_FOUND)
                .json({ success: false, error: 'Todo not found', data: null });
        }
        res
            .status(http_status_codes_1.default.OK)
            .json({ success: true, error: null, data: { todo } });
    }
    catch (error) {
        console.log('Error getting todo by id ==> ', error);
        res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .json({ success: false, error: 'Error getting todo by id', data: null });
    }
});
exports.getTodoById = getTodoById;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const parsedBody = todo_model_1.todoSchema.safeParse(body);
        if (!parsedBody.success) {
            throw new Error('Invalid request body');
        }
        const existingTodos = yield (0, todos_1.readTodos)();
        const todo = existingTodos.find((t) => t.id === id);
        if (!todo) {
            return res
                .status(http_status_codes_1.default.NOT_FOUND)
                .json({ success: false, error: 'Todo not found', data: null });
        }
        const updatedTodo = Object.assign(Object.assign(Object.assign({}, todo), parsedBody.data), { updatedAt: new Date().toISOString() });
        const todos = existingTodos.map((t) => (t.id === id ? updatedTodo : t));
        yield (0, todos_1.writeTodos)(todos);
        res
            .status(http_status_codes_1.default.OK)
            .json({ success: true, error: null, data: { todo: updatedTodo } });
    }
    catch (error) {
        console.log('Error updating todo ==> ', error);
        res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .json({ success: false, error: 'Error updating todo', data: null });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const existingTodos = yield (0, todos_1.readTodos)();
        const todo = existingTodos.find((t) => t.id === id);
        if (!todo) {
            return res
                .status(http_status_codes_1.default.NOT_FOUND)
                .json({ success: false, error: 'Todo not found', data: null });
        }
        const todos = existingTodos.filter((t) => t.id !== id);
        yield (0, todos_1.writeTodos)(todos);
        res
            .status(http_status_codes_1.default.OK)
            .json({ success: true, error: null, data: { todo } });
    }
    catch (error) {
        console.log('Error deleting todo ==> ', error);
        res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .json({ success: false, error: 'Error deleting todo', data: null });
    }
});
exports.deleteTodo = deleteTodo;

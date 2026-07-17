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
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTodos = exports.readTodos = void 0;
const file_1 = require("./file");
const readTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    const readFileResponse = yield (0, file_1.readJsonFile)();
    let todos = [];
    if (readFileResponse.todos) {
        todos = readFileResponse.todos;
    }
    return todos;
});
exports.readTodos = readTodos;
const writeTodos = (todos) => __awaiter(void 0, void 0, void 0, function* () {
    const readFileResponse = yield (0, file_1.readJsonFile)();
    const newJsonData = Object.assign(Object.assign({}, readFileResponse), { todos });
    yield (0, file_1.writeToJsonFile)(newJsonData);
});
exports.writeTodos = writeTodos;

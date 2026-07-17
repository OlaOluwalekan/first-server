"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = void 0;
const zod_1 = require("zod");
exports.todoSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(100),
    description: zod_1.z.string().min(3).max(255),
    completed: zod_1.z.boolean(),
});

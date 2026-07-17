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
exports.localWriteJson = exports.localReadJson = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Store the local DB next to the compiled output so it survives restarts
const LOCAL_DB_PATH = path_1.default.join(__dirname, '..', '..', '..', 'data', 'db.json');
const ensureFile = () => {
    const dir = path_1.default.dirname(LOCAL_DB_PATH);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    if (!fs_1.default.existsSync(LOCAL_DB_PATH)) {
        fs_1.default.writeFileSync(LOCAL_DB_PATH, JSON.stringify({ todos: [] }, null, 2), 'utf-8');
    }
};
const localReadJson = () => __awaiter(void 0, void 0, void 0, function* () {
    ensureFile();
    const raw = fs_1.default.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(raw);
});
exports.localReadJson = localReadJson;
const localWriteJson = (newData) => __awaiter(void 0, void 0, void 0, function* () {
    ensureFile();
    fs_1.default.writeFileSync(LOCAL_DB_PATH, JSON.stringify(newData, null, 2), 'utf-8');
});
exports.localWriteJson = localWriteJson;

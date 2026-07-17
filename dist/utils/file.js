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
exports.writeToJsonFile = exports.readJsonFile = void 0;
const cloudinary_1 = require("./adapters/cloudinary");
const local_1 = require("./adapters/local");
/**
 * Returns true when all four Cloudinary env variables are present.
 * If any are missing the app falls back to the local JSON file adapter.
 */
const isCloudinaryConfigured = () => {
    return !!(process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET &&
        process.env.CLOUDINARY_JSON_FILE_URL &&
        process.env.CLOUDINARY_PUBLIC_ID);
};
const useCloudinary = isCloudinaryConfigured();
if (useCloudinary) {
    console.log('📦 Storage: Cloudinary');
}
else {
    console.log('💾 Storage: Local file (data/db.json) — set Cloudinary env vars to switch');
}
const readJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (useCloudinary) {
            return yield (0, cloudinary_1.cloudinaryReadJson)();
        }
        return yield (0, local_1.localReadJson)();
    }
    catch (error) {
        console.log('Error reading file ==>', error);
        return { todos: [] };
    }
});
exports.readJsonFile = readJsonFile;
const writeToJsonFile = (newData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (useCloudinary) {
            yield (0, cloudinary_1.cloudinaryWriteJson)(newData);
        }
        else {
            yield (0, local_1.localWriteJson)(newData);
        }
    }
    catch (error) {
        console.log('Error writing to file ==>', error);
    }
});
exports.writeToJsonFile = writeToJsonFile;

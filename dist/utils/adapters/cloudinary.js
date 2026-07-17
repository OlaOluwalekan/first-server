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
exports.cloudinaryWriteJson = exports.cloudinaryReadJson = void 0;
const cloudinary_1 = require("cloudinary");
const axios_1 = __importDefault(require("axios"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryJsonFileUrl = process.env.CLOUDINARY_JSON_FILE_URL;
const cloudinaryPublicId = process.env.CLOUDINARY_PUBLIC_ID;
const cloudinaryReadJson = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(cloudinaryJsonFileUrl);
    return data;
});
exports.cloudinaryReadJson = cloudinaryReadJson;
const cloudinaryWriteJson = (newData) => __awaiter(void 0, void 0, void 0, function* () {
    const newDataString = JSON.stringify(newData, null, 2);
    const base64Data = `data:application/json;base64,${Buffer.from(newDataString).toString('base64')}`;
    yield cloudinary_1.v2.uploader.upload(base64Data, {
        public_id: cloudinaryPublicId,
        resource_type: 'raw',
        overwrite: true,
        invalidate: true,
    });
});
exports.cloudinaryWriteJson = cloudinaryWriteJson;

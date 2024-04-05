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
exports.ftpAdapter = void 0;
const path_1 = __importDefault(require("path"));
const basic_ftp_1 = require("basic-ftp");
const stream_1 = require("stream");
const ftpAdapter = ({ endpoint, host, password, secure, user }) => ({ collection }) => {
    const generateURL = ({ filename, prefix = "" }) => `${endpoint}/${collection.slug}/${path_1.default.posix.join(prefix, filename)}`;
    const handleDelete = (_a) => __awaiter(void 0, [_a], void 0, function* ({ filename }) {
        const client = new basic_ftp_1.Client();
        client.ftp.verbose = true;
        yield client.access({
            host,
            user,
            password,
            secure,
        });
        yield client.ensureDir(collection.slug);
        yield client.remove(filename);
        client.close();
    });
    const handleUpload = (_b) => __awaiter(void 0, [_b], void 0, function* ({ file }) {
        const client = new basic_ftp_1.Client();
        client.ftp.verbose = true;
        yield client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false,
        });
        yield client.ensureDir(collection.slug);
        yield client.uploadFrom(stream_1.Readable.from(file.buffer), file.filename);
        client.close();
    });
    const webpack = (existingWebpackConfig) => {
        var _a, _b;
        const newConfig = Object.assign(Object.assign({}, existingWebpackConfig), { resolve: Object.assign(Object.assign({}, (existingWebpackConfig.resolve || {})), { alias: Object.assign(Object.assign({}, (((_a = existingWebpackConfig.resolve) === null || _a === void 0 ? void 0 : _a.alias)
                    ? existingWebpackConfig.resolve.alias
                    : {})), { "payloadcms-ftp-storage": path_1.default.resolve(__dirname, "./mock.js") }), fallback: Object.assign(Object.assign({}, (((_b = existingWebpackConfig.resolve) === null || _b === void 0 ? void 0 : _b.fallback)
                    ? existingWebpackConfig.resolve.fallback
                    : {})), { stream: false }) }) });
        return newConfig;
    };
    return {
        generateURL,
        handleDelete,
        handleUpload,
        staticHandler: () => { },
        webpack,
    };
};
exports.ftpAdapter = ftpAdapter;

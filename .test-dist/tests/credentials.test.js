"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const credentials_1 = require("../lib/credentials");
(0, node_test_1.default)("password hashing verifies the original password", () => {
    const hashed = (0, credentials_1.hashPassword)("Secret123");
    strict_1.default.equal((0, credentials_1.verifyPassword)(hashed, "Secret123"), true);
    strict_1.default.equal((0, credentials_1.verifyPassword)(hashed, "Wrong123"), false);
});
(0, node_test_1.default)("otp hashing verifies the original code", () => {
    const hashed = (0, credentials_1.hashOtp)("123456");
    strict_1.default.equal((0, credentials_1.verifyOtpHash)(hashed, "123456"), true);
    strict_1.default.equal((0, credentials_1.verifyOtpHash)(hashed, "654321"), false);
});

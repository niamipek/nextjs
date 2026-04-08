"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const change_password_flow_1 = require("../lib/change-password-flow");
(0, node_test_1.default)("change password flow cookie round-trips signed payload", () => {
    const cookie = (0, change_password_flow_1.createChangePasswordFlowCookie)({
        userId: "U001",
        email: "user@example.com",
        newPasswordHash: "hashed-password",
    });
    const payload = (0, change_password_flow_1.verifyChangePasswordFlowCookie)(cookie);
    strict_1.default.deepEqual(payload, {
        userId: "U001",
        email: "user@example.com",
        newPasswordHash: "hashed-password",
    });
});
(0, node_test_1.default)("change password flow cookie rejects tampering", () => {
    const cookie = (0, change_password_flow_1.createChangePasswordFlowCookie)({
        userId: "U001",
        email: "user@example.com",
        newPasswordHash: "hashed-password",
    });
    const tampered = `${cookie}tampered`;
    strict_1.default.equal((0, change_password_flow_1.verifyChangePasswordFlowCookie)(tampered), null);
});

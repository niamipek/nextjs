"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const reset_otp_1 = require("../lib/reset-otp");
(0, node_test_1.default)("forgot-password email content uses recovery wording", () => {
    const content = (0, reset_otp_1.getEmailContent)("forgot_password");
    const html = (0, reset_otp_1.buildEmailHtml)("Quan Ly", "123456", "forgot_password");
    strict_1.default.equal(content.subject, "Ma OTP khoi phuc mat khau");
    strict_1.default.match(html, /Khoi phuc mat khau/);
    strict_1.default.match(html, /123456/);
});
(0, node_test_1.default)("change-password email content uses confirmation wording", () => {
    const content = (0, reset_otp_1.getEmailContent)("change_password");
    const html = (0, reset_otp_1.buildEmailHtml)("Quan Ly", "654321", "change_password");
    strict_1.default.equal(content.subject, "Ma OTP xac nhan doi mat khau");
    strict_1.default.match(html, /Xac nhan doi mat khau/);
    strict_1.default.match(html, /654321/);
});

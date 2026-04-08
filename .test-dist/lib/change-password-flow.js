"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChangePasswordFlowCookie = createChangePasswordFlowCookie;
exports.verifyChangePasswordFlowCookie = verifyChangePasswordFlowCookie;
exports.getChangePasswordFlowCookieName = getChangePasswordFlowCookieName;
require("server-only");
const node_crypto_1 = require("node:crypto");
const CHANGE_PASSWORD_FLOW_COOKIE_NAME = "change_password_flow";
function getSecret() {
    return process.env.AUTH_SECRET || "dev-only-secret-change-me";
}
function toBase64Url(value) {
    return Buffer.from(value).toString("base64url");
}
function fromBase64Url(value) {
    return Buffer.from(value, "base64url").toString("utf8");
}
function sign(value) {
    return (0, node_crypto_1.createHmac)("sha256", getSecret()).update(value).digest("base64url");
}
function createChangePasswordFlowCookie(payload) {
    const encodedPayload = toBase64Url(JSON.stringify(payload));
    const signature = sign(encodedPayload);
    return `${encodedPayload}.${signature}`;
}
function verifyChangePasswordFlowCookie(cookieValue) {
    if (!cookieValue) {
        return null;
    }
    const [encodedPayload, receivedSignature] = cookieValue.split(".");
    if (!encodedPayload || !receivedSignature) {
        return null;
    }
    const expectedSignature = sign(encodedPayload);
    const receivedBuffer = Buffer.from(receivedSignature);
    const expectedBuffer = Buffer.from(expectedSignature);
    if (receivedBuffer.length !== expectedBuffer.length) {
        return null;
    }
    if (!(0, node_crypto_1.timingSafeEqual)(receivedBuffer, expectedBuffer)) {
        return null;
    }
    try {
        return JSON.parse(fromBase64Url(encodedPayload));
    }
    catch {
        return null;
    }
}
function getChangePasswordFlowCookieName() {
    return CHANGE_PASSWORD_FLOW_COOKIE_NAME;
}

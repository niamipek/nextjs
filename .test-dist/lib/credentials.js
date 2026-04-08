"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.hashOtp = hashOtp;
exports.verifyOtpHash = verifyOtpHash;
require("server-only");
const node_crypto_1 = require("node:crypto");
const SCRYPT_KEY_LENGTH = 64;
const PASSWORD_PREFIX = "scrypt";
const OTP_PREFIX = "otp";
function createSalt(length = 16) {
    return (0, node_crypto_1.randomBytes)(length).toString("hex");
}
function encodeHash(prefix, plainText) {
    const salt = createSalt();
    const derivedKey = (0, node_crypto_1.scryptSync)(plainText, salt, SCRYPT_KEY_LENGTH).toString("hex");
    return `${prefix}$${salt}$${derivedKey}`;
}
function verifyEncodedHash(encodedValue, plainText, expectedPrefix) {
    const [prefix, salt, storedHash] = encodedValue.split("$");
    if (prefix !== expectedPrefix || !salt || !storedHash) {
        return false;
    }
    const incomingHash = (0, node_crypto_1.scryptSync)(plainText, salt, SCRYPT_KEY_LENGTH);
    const storedBuffer = Buffer.from(storedHash, "hex");
    if (incomingHash.length !== storedBuffer.length) {
        return false;
    }
    return (0, node_crypto_1.timingSafeEqual)(incomingHash, storedBuffer);
}
function hashPassword(password) {
    return encodeHash(PASSWORD_PREFIX, password);
}
function verifyPassword(storedValue, password) {
    if (!storedValue) {
        return false;
    }
    if (storedValue.startsWith(`${PASSWORD_PREFIX}$`)) {
        return verifyEncodedHash(storedValue, password, PASSWORD_PREFIX);
    }
    return storedValue === password;
}
function hashOtp(code) {
    return encodeHash(OTP_PREFIX, code);
}
function verifyOtpHash(storedValue, code) {
    if (!storedValue.startsWith(`${OTP_PREFIX}$`)) {
        return false;
    }
    return verifyEncodedHash(storedValue, code, OTP_PREFIX);
}

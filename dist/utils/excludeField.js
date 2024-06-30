"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exclude(user, keys) {
    // Convert the object into an array of key-value pairs using Object.entries()
    // Filter out the key-value pairs where the key is not included in the keys array
    const filteredEntries = Object.entries(user).filter(([key]) => !keys.includes(key));
    // Convert the filtered array back into an object using Object.fromEntries()
    // Omitting the specified keys
    return Object.fromEntries(filteredEntries);
}
exports.default = exclude;

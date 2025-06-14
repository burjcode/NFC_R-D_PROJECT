"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const admin = __importStar(require("firebase-admin"));
const cors_1 = __importDefault(require("cors"));
const corsHandler = (0, cors_1.default)({ origin: true });
const getUser = (req, res) => {
    corsHandler(req, res, async () => {
        const { userId } = req.query;
        if (!userId) {
            res.status(400).json({ error: 'Missing userId parameter' });
            return;
        }
        try {
            const docRef = admin.firestore().collection('users').doc(userId);
            const doc = await docRef.get();
            if (!doc.exists) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json({ id: doc.id, ...doc.data() });
        }
        catch (err) {
            console.error('getUser error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    });
};
exports.getUser = getUser;
//# sourceMappingURL=getUser.js.map
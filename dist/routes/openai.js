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
exports.openAiRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const askQuestion_1 = require("./askQuestion");
exports.openAiRouter = express_1.default.Router();
exports.openAiRouter.use(express_1.default.json());
exports.openAiRouter.get(`/`, (0, express_validator_1.query)(`prompt`).notEmpty().isString(), (0, express_validator_1.query)(`temperature`).optional().isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`--- OpenAi request ---`, Date.now());
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        const { prompt, temperature: rawTemperature } = (0, express_validator_1.matchedData)(req);
        const temperature = (_a = Number(rawTemperature)) !== null && _a !== void 0 ? _a : undefined;
        console.log(`prompt`, prompt);
        console.log(`temperature`, temperature);
        try {
            const answer = yield (0, askQuestion_1.askQuestion)(prompt, { temperature: temperature });
            console.log(`--- answer to ${prompt}`, answer);
            res.send(answer);
        }
        catch (e) {
            console.error(e);
            res.status(500).send({ error: e });
        }
    }
    else {
        res.status(400).send({ error: errors.array() });
    }
}));

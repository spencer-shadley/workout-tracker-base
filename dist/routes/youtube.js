"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const youtube_search_1 = __importDefault(require("youtube-search"));
exports.youtubeRouter = express_1.default.Router();
exports.youtubeRouter.use(express_1.default.json());
exports.youtubeRouter.get(`/`, (0, express_validator_1.query)(`exercise`).notEmpty().isString(), (req, res) => {
    console.log(`--- YouTube request ---`, Date.now());
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ error: errors.array() });
        return;
    }
    const { exercise } = (0, express_validator_1.matchedData)(req);
    console.log(`--- video search for exercise`, exercise);
    try {
        const opts = {
            maxResults: 1,
            key: `AIzaSyBKLpjDurJWREpz9oQu_FWh-nwrNoKDkzA`,
            type: `video`,
        };
        (0, youtube_search_1.default)(`how to do ${exercise}`, opts, (err, results) => {
            if (err) {
                res.status(500).send({ error: err });
                return;
            }
            console.dir(`video results`, results);
            if (results === null || results === void 0 ? void 0 : results.length) {
                res.send(results[0].link);
                return;
            }
            const errorMessage = `No video found for exercise ${exercise}`;
            console.error(errorMessage);
            res.status(400).send({ error: errorMessage });
            return;
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).send({ error: e });
        return;
    }
});

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestion = void 0;
const openai_1 = require("openai");
// each request costs money - safety to avoid massive charges from bugs like infinite loops
const MAX_NUMBER_OF_ACTIVE_REQUESTS = 50;
let numberOfActiveRequests = 0;
function askQuestion(prompt, initialProps = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`askQuestion`, prompt);
        const configuration = new openai_1.Configuration({
            apiKey: process.env.OPEN_AI_KEY,
        });
        const openai = new openai_1.OpenAIApi(configuration);
        initialProps.prompt = prompt.trim();
        ++numberOfActiveRequests;
        if (numberOfActiveRequests > MAX_NUMBER_OF_ACTIVE_REQUESTS) {
            console.error(`too many requests`);
            return Promise.reject(`too many requests`);
        }
        const defaultProps = {
            model: `text-davinci-003`,
            temperature: 0.2,
            max_tokens: 1500,
        };
        const props = Object.assign(Object.assign({}, defaultProps), initialProps);
        return new Promise((resolve, reject) => {
            openai
                .createCompletion(props)
                .then((response) => {
                var _a;
                let data = (_a = response.data.choices[0].text) !== null && _a !== void 0 ? _a : ``;
                data = data.trim();
                resolve(data);
            })
                .catch((error) => {
                reject(error);
                console.error(error);
            })
                .finally(() => {
                --numberOfActiveRequests;
            });
        });
    });
}
exports.askQuestion = askQuestion;

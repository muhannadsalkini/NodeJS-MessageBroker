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
const express = require("express");
const bodyParser = require("body-parser");
const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const redisClient = new Redis({
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: 19522,
});
app.use(bodyParser.json());
// Producer
app.post("/produce", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }
    yield redisClient.rpush("messageQ", message);
    res.json({ success: true, message: "Message produced successfully" });
}));
// Consumer
app.get("/consume", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // The lpop operation is not atomic, meaning there is a chance of a race condition if multiple consumers try to pop.
    // By using MULTI and EXEC, the lpop operation is now atomic preventing race conditions.
    const result = yield redisClient.multi().lpop("messageQ").exec();
    const message = result[0][1];
    if (message !== null) {
        res.json({ success: true, message });
    }
    else {
        res.json({ success: false, message: "No messages in the queue" });
    }
}));
app.get("/", (req, res) => {
    res.json({ msg: "test route" });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

/* App.use Stuff*/

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

/* Actual Logic*/

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

/* A basic function */
const generate = async (userPrompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat();

    const msg = `${userPrompt}`;

    const result = await chat.sendMessage(msg);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    res.status("500").json("Error generating content:", error.message);
    return null;
  }
};

/* Requests */

app.get("/", async (req, res) => {
  try {
    const result = await generate("Get a famous inspirational quote");
    res.status(200).json(result);
  } catch (error) {
    res.status("500").json({ error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const result = await generate(`${req.body.prompt}`);
    res.status(200).json(result);
  } catch (error) {
    res.status("500").json({ error: error.message });
  }
});

app.listen("3000", "192.168.8.102", () =>
  console.log("listening on port 3000")
);

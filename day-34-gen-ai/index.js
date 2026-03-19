import dotenv from "dotenv";
import readline from "readline";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool, createAgent } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";

dotenv.config();

// ---------------- TOOL ----------------
const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Send an email when user asks to send mail. Requires to, subject, html",
  schema: z.object({
    to: z.string().describe("Recipient email"),
    subject: z.string().describe("Subject"),
    html: z.string().describe("HTML body"),
  }),
});

// ---------------- MODEL ----------------
const model = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL || "gemini-1.5-pro",
  apiKey: process.env.GEMINI_API_KEY,
});

// ---------------- AGENT ----------------
const agent = createAgent({
  model,
  tools: [emailTool],
  systemPrompt: `
You are a helpful assistant.

If user asks to send email,
you MUST use emailTool.

Generate subject and body if not provided.
Do not ask again.
`,
});

// ---------------- READLINE ----------------
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ---------------- LOOP ----------------
async function askQuestion() {
  rl.question("Aap kya puchna chahte ho? (exit likhne par band hoga) ", async (input) => {
    if (!input.trim()) {
      askQuestion();
      return;
    }

    if (input.toLowerCase() === "exit") {
      console.log("\n✅ Chat band ho gayi.\n");
      rl.close();
      return;
    }

    try {
      console.log("\n👤 User:");
      console.log("  ", input, "\n");

      const result = await agent.invoke({
        messages: [{ role: "user", content: input }],
      });

      console.log("🤖 AI Response:");
      const lastMessage = result.messages[result.messages.length - 1];
      console.log("  " + lastMessage.content + "\n");
    } catch (error) {
      console.error("\n❌ Error:", error.message, "\n");
    }

    askQuestion();
  });
}

// ---------------- START ----------------
askQuestion();
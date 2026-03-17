// import dotenv from "dotenv";
// import readline from "readline"
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import "dotenv/config"


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// async function run() {
//   const result = await model.generateContent("Hello AI!");
//   console.log(result.response.text());
// }
// run();


// import dotenv from "dotenv";
// import readline from "readline";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// // Gemini setup
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Readline setup
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // user se question lo
// rl.question("Aap kya puchna chahte ho? ", async (input) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: process.env.GEMINI_MODEL,
//     });

//     const result = await model.generateContent(input);
//     const response = await result.response;

//     console.log("\n🤖 Gemini Reply:");
//     console.log(response.text());

//     const chat = model.startChat({
//             history: [
//                      { role: "user", parts: [{ text: "Hello" }] },
//                      { role: "model", parts: [{ text: "Hi, how can I help?" }] },
//                 ],
//     });

//    async function run() {
//           const result = await chat.sendMessage("What is AI? Explain under 30 words.");
//           console.log(result.response.text());
//     }
//     run();


//   } catch (error) {
//     console.error("❌ Error:", error.message);
//   }

//    rl.close();
// }); 




// import dotenv from "dotenv";
// import readline from "readline";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({
//   model: process.env.GEMINI_MODEL || "gemini-1.0-pro",
// });

// // Chat session setup
// const chat = model.startChat({
//   history: [
//     { role: "user", parts: [{ text: "Hello" }] },
//     { role: "model", parts: [{ text: "Hi, how can I help?" }] },
//   ],
// });

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Aap kya puchna chahte ho? ", async (input) => {
//   try {
//     const result = await chat.sendMessage(input);
//     console.log("\n🤖 Gemini Reply:");
//     console.log(result.response.text());
//   } catch (error) {
//     console.error("❌ Error:", error.message);
//   }

//    rl.close();
// });





import dotenv from "dotenv";
import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model setup (stable model name)
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL ,
});

// Chat session setup (stateful conversation)
const chat = model.startChat({
  history: [
    { role: "user", parts: [{ text: "Hello" }] },
    { role: "model", parts: [{ text: "Hi, how can I help?" }] },
  ],
});

// Readline setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Recursive function for continuous Q&A
 async function askQuestion() {
  rl.question("Aap kya puchna chahte ho? (exit likhne par band hoga) ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("\n✅ Chat band ho gayi.\n");
      rl.close();
      return;
    }

    try {
      // Format user input
      console.log("\n👤 User:");
      console.log(`   ${input}\n`);
      
      const result = await chat.sendMessage(input);
      
      // Format AI response
      console.log("🤖 AI Response:");
      console.log(`   ${result.response.text()}\n`);
    } catch (error) {
      console.error("\n❌ Error:", error.message, "\n");
    }

    //  dobara call karo taaki loop chale
     askQuestion();
  });

}

// Start loop
askQuestion();


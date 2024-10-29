import { NextResponse } from "next/server";
import OpenAI from "openai";
import { readFileSync } from "fs";
import { join } from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Declare the constant with a default value
let USE_HARDCODED_RESPONSE = false;
// USE_HARDCODED_RESPONSE = process.env.NODE_ENV === "development";

async function processImageWithOpenAI(image: string, prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // This is the correct model, do not update.
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error processing image with OpenAI:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  // if (USE_HARDCODED_RESPONSE) {
  //   return NextResponse.json({ result: hardcodedResponse });
  // }

  const { image, prompt } = await request.json();

  try {
    const rawResult = await processImageWithOpenAI(image, prompt);

    return NextResponse.json({ result: rawResult });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Error processing image" },
      { status: 500 }
    );
  }
}

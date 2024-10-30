import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Declare the constant with a default value
let USE_HARDCODED_RESPONSE = false;
// USE_HARDCODED_RESPONSE = process.env.NODE_ENV === "development";

async function processImageWithOpenAI(
  image: string,
  prompt: string,
  responseFormat: { type: "text" | "json_object" }
) {
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
      response_format: responseFormat,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error processing image with OpenAI:", error);
    throw error;
  }
}

export const POST = async (request: Request) => {
  const { image, prompt, responseFormat } = await request.json();

  // return NextResponse.json(
  //   {
  //     error:
  //       "We're experiencing high demand! Too many pet parents are using Sniff right now. Please try again in a few minutes.",
  //     isRateLimit: true,
  //   },
  //   { status: 429 }
  // );

  try {
    const result = await processImageWithOpenAI(image, prompt, responseFormat);
    return result
      ? NextResponse.json(JSON.parse(result))
      : NextResponse.json({});
  } catch (error: any) {
    console.error("Error processing image:", error);

    // Check if it's a rate/quota limit error
    if (error?.response?.status === 429) {
      return NextResponse.json(
        {
          error:
            "We're experiencing high demand! Too many pet parents are using Sniff right now. Please try again in a few minutes.",
          isRateLimit: true,
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Error processing image" },
      { status: 500 }
    );
  }
};

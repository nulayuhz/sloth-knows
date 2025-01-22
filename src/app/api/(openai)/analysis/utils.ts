import OpenAI from "openai";
import {
  ChatCompletionContentPart,
  ChatCompletionContentPartImage,
} from "openai/resources/index.mjs";
const openai = new OpenAI();

const questions = `Base on the stock chart, given the orange line for SMA 20, beige line for SMA 50, pink line for SMA 200, and other indicator lines; 1. what graph pattern and trend does the chart show? 2. tell me what are the resistance levels and support levels 3. predict the price action movement for the next month, 4. what is a good entry price if I were to look for short to medium term gain?`;

export const analyzeImage = async (url: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: questions },
          {
            type: "image_url",
            image_url: {
              url,
            },
          },
        ],
      },
    ],
  });

  return response.choices[0];
};

export const analyzeMultipleImages = async (urls: string[]) => {
  const content: Array<ChatCompletionContentPart> = [
    { type: "text", text: questions },
  ];
  urls.forEach((url) => {
    content.push({
      type: "image_url",
      image_url: {
        url,
      },
    });
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });

  return response.choices[0];
};

export const analyzeImages = async (urls: string[]) => {
  console.log("analyzing charts...");
  const analysisPromise = urls?.map((url: string) => {
    console.log("analyzing charts...", url);
    return analyzeImage(url);
  });
  const analysis = await Promise.all(analysisPromise);
  console.log(analysis[0]);
  return analysis;
};

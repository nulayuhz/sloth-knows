import OpenAI from "openai";
import {
  ChatCompletionContentPart,
  ChatCompletionContentPartImage,
} from "openai/resources/index.mjs";
const openai = new OpenAI();

// const questions = `given the orange line for SMA 20, beige line for SMA 50, pink line for SMA 200, and other trend lines; 1. what graph pattern and trend does the chart show? 2. tell me what are the resistance levels and support levels 3. predict the price action movement for the next month, 4. what is a good entry price if I were to look for short to medium term gain?`;
// const questions = `given the orange line for SMA 20, beige line for SMA 50, pink line for SMA 200, and other trend lines, can you identify the trend, support, resistance, good entry price and predict short to medium term price action movement`;
const questions = `given SMA lines and other sloping lines, analyze the entry price; is it near breakout, or consolidation; if yes, what is the breakout entry price`;
const failToInterpretWords = [
  "unable to analyze",
  "unable to view",
  "unable to interpret",
  "can't analyze",
  "can't view",
  "can't interpret",
];

const askChat = async (url: string) => {
  return await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "developer",
        content: [
          {
            type: "text",
            text: "You are an expert financial analyst that has very deep understanding of technical analysis, please answers trading questions for me",
          },
        ],
      },
      {
        role: "user",
        content: [
          { type: "text", text: "what is a good entry price" },
          // {
          //   type: "image_url",
          //   image_url: {
          //     url,
          //   },
          // },
        ],
      },
    ],
    store: true,
    temperature: 0.5,
    max_tokens: 4095,
  });
};

export const analyzeImage = async (url: string) => {
  let response = await askChat(url);
  let answer = response.choices[0]?.message?.content;
  let failToAnalyze = failToInterpretWords.some((word) =>
    answer?.includes(word)
  );
  if (failToAnalyze) {
    // retry once
    console.log("AI somehow couldn' analyze the image, retry one more time...");
    response = await askChat(url);
  }
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
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: [
          {
            type: "text",
            text: "You are an expert financial analyst that has very deep understanding of technical analysis and identifies stock trend and price action movements",
          },
        ],
      },
      // {
      //   role: "user",
      //   content: [
      //     {
      //       type: "text",
      //       text: "analyze the short to medium term trend and entry price of the chart",
      //     },
      //   ],
      // },
      {
        role: "user",
        content,
      },
    ],
    store: true,
    temperature: 0.5,
    // max_tokens: 4095,
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

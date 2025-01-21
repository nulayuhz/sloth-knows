import fs from "fs";
import path from "path";
import { Writable } from "stream";

export const downloadImage = async (url: string, filename: string) => {
  // Directory to save the downloaded images ,
  const DOWNLOAD_DIR = path.join(process.cwd(), process.env.ASSET_PATH || "");
  console.log(DOWNLOAD_DIR, filename);

  // Ensure the directory exists
  if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR);
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch image from ${url}: ${response.statusText}`
    );
  }

  const filePath = path.join(DOWNLOAD_DIR, filename);
  const writer = fs.createWriteStream(filePath);

  // Stream the response to a file
  return new Promise((resolve, reject) => {
    response?.body?.pipeTo(Writable.toWeb(writer));
    writer.on("finish", () => resolve(filePath));
    writer.on("error", reject);
  });
};

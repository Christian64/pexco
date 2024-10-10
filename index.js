import { mkdirSync } from "node:fs";
import { rm } from "node:fs/promises";
import { join } from "node:path";
const rootDir = process.env.PWD;

export function createLenguage(language) {
  if (!language) return console.log("Language is required");
  if (language)
    mkdirSync(`${join(rootDir, "/pexco", language)}`, { recursive: true });
}

export function removeLenguage(language) {
  rm(`${join(rootDir, "/pexco", language)}`, { recursive: true, force: true });
}

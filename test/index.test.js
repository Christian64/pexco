import { describe, expect, onTestFinished, test } from "vitest";
import { createLenguage, removeLenguage } from "../index.js";
import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const rootDir = join(process.env.PWD, "/pexco");

describe("Add new project", () => {
  test("should create a directory called javascript", async () => {
    createLenguage("javascript");
    createLenguage("ruby");
    createLenguage("python");

    expect(await readdir(rootDir)).toEqual(["javascript", "python", "ruby"]);

    onTestFinished(() => {
      removeLenguage("javascript");
      removeLenguage("python");
      removeLenguage("ruby");
    });
  });

  test("should not to create blank folder", async () => {
    const languages = await readdir(rootDir);
    const haveBlank = languages.find((language) => language === "");
    expect(haveBlank).toBeFalsy();
  });
});

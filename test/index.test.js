import { describe, expect, onTestFinished, test } from "vitest";
import { createProject, deleteProject } from "../index.js";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const rootDir = join(process.env.PWD, "/pexco");

describe("Add new project", () => {
  test("should create a directory called javascript", async () => {
    createProject("javascript");
    createProject("ruby");
    createProject("python");

    expect(await readdir(rootDir)).toEqual(["javascript", "python", "ruby"]);

    onTestFinished(() => {
      deleteProject("javascript");
      deleteProject("python");
      deleteProject("ruby");
    });
  });

  test("should not to create blank folder", async () => {
    const languages = await readdir(rootDir);
    const haveBlank = languages.find((language) => language === "");
    expect(haveBlank).toBeFalsy();
  });
});

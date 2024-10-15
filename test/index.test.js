import { describe, expect, onTestFinished, test, beforeEach } from "vitest";
import { createProject, deleteProject, searchProject } from "../index.js";
import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const rootDir = join(process.cwd(), "/pexco");

const clearDirectory = async ()=> {
  const projects = await readdir(rootDir);
  for (const project of projects) {
    await rm(join(rootDir, project), { recursive: true, force: true });
  }
}

describe("Add new project", () => {
  beforeEach(async () => {
    await clearDirectory();
  });
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

  test("should not create blank folder", async () => {
    const languages = await readdir(rootDir);
    const haveBlank = languages.find((language) => language === "");
    expect(haveBlank).toBeFalsy();
  });

  test("should not allow creating a directory with the same name if it exists", async () => {

    createProject("javascript");
    
    expect(() => {
      createProject("javascript");
    }).toThrow("Directory javascript already exists");

    
  });
});
describe("search for a project", () => {

  beforeEach(async () => {
    await clearDirectory();
  });

  test("should search directory called python", async () => {
    
    const directories = await readdir(rootDir);
    
    if (!directories.includes('python')) {
      createProject('python');
    }

    searchProject("python");

    expect(await readdir(rootDir)).toEqual(['python']);
  });

  test("Should not search the directory without the name", ()=>{
    expect(() => {
    searchProject()})
    .toThrow("Project name is required")
  })

});

describe("list of projects", () =>{

  test("I should create a list with the projects in each folder", async ()=>{})
})
import { mkdirSync, existsSync, readdirSync } from "node:fs";
import fs from "node:fs/promises";
import { platform } from "node:process";
import { join } from "path";

const rootDir = platform === "win32" ? process.cwd() : process.pwd();

export function createProject(language) {

  const projectPath = join(rootDir, "pexco", language);

  if (existsSync(projectPath)) {
    throw new Error(`Directory ${language} already exists`);
  }

  mkdirSync(projectPath, { recursive: true });
}

export const deleteProject = async (project) => {
  const projectPath = join(rootDir, "pexco", project);

  try {
    if (projectPath) {
      await fs.rm(projectPath, { recursive: true, force: true });
      console.log(`${project} has been deleted`);
    } else {
      console.log("file not exists");
    }
  } catch (err) {
    console.log(`Error deleting project: ${err.message}`);
  }
};

export const searchProject = (language) => {

  if (!language) {
    throw new Error("Project name is required");
  }

  const languagePath = join(rootDir, `pexco/${language}`);

  if (existsSync(languagePath)) {
    let projects = readdirSync(languagePath).map(
      (project, index) => `${index + 1}- ${project}`,
    );
    console.log(projects.join("\n"));
  } else {
    console.log(`The folder ${languagePath} does not exist.`);
  }
};


export const lenguageList = () => {
  const projectPath = join(rootDir, "pexco");

  readdirSync(projectPath).forEach((project) => {
    const folders = readdirSync(join(projectPath, project));
    console.log(`<${project.toUpperCase()}>\n${folders.join("\n")}\n`);
  });
};

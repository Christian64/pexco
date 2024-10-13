import { Command } from "commander";
import {
  createProject,
  searchProject,
  deleteProject,
  lenguageList,
} from "./index.js";
const program = new Command();

program
  .command("add")
  .argument("<string>", "name of the language")
  .description("Add new program language")
  .action((str) => createProject(str));

program
  .command("delete")
  .argument("<string>", "delete project")
  .description("delete project from a language")
  .action((project) => deleteProject(project));

program
  .command("search")
  .argument("<string>", "search project")
  .description("search project from a language")
  .action((search) => searchProject(search));

program
  .command("list")
  .description("list of files and their languages")
  .action(lenguageList);

program.parse();

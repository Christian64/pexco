const { mkdirSync, rmdir } = require("node:fs");
const { platform } = require("node:process");
const { join } = require("path");
const { Command } = require("commander");
const program = new Command();
const rootDir = platform === 'win32' ? process.cwd() : process.cwd();

const main = () => {
  program
    .command("hello")
    .description("Say hello world")
    .action(() => {
      console.log("Hello World");
    });

  program
    .command("add")
    .argument("<string>", "name of the language")
    .description("Add new program language")
    .action((str) => createLanguage(str));

  program
    .command("delete")
    .argument("<string>", "delete project")
    .description("delete project from a language")
    .action((project) => deleteProject(project));

  program.parse();
};

function createLanguage(language) {
  mkdirSync(join(rootDir, `pexco/${language}`), { recursive: true });
}

const deleteProject = (project) => {
  rmdir(join(rootDir, `pexco/${project}`),
   (err)=> err
  ? console.log(`Error borrando el proyecto: ${err.message}`) 
  : console.log(`${project} ha sido borrado con exito!`) );
};

main();

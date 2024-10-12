const { mkdirSync, existsSync, readdirSync } = require("node:fs");
const fs = require('fs').promises;
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
};

// Function to create a new folder for a project
function createProject(language) {
  mkdirSync(join(rootDir, `pexco/${language}`), { recursive: true });
}

// Function to delete a specific project folder
const deleteProject = async (project) => {
  const projectPath = join(rootDir, `pexco/${project}`);
  
  try{
    if(!projectPath){
        await fs.rm(projectPath, { recursive: true, force: true });
        console.log(`${project} has been deleted`);
    }else{
      console.log('file not exists')
    }
  } catch (err) {
    console.log(`Error deleting project: ${err.message}`);
  }
};

// Function to search for a specific project
const searchProject = (language) => {
  
  const languagePath = join(rootDir, `pexco/${language}`);

  if (existsSync(languagePath)) {
    let projects = readdirSync(languagePath).map((project, index) => `${index +1}- ${project}`)
    console.log(projects.join('\n'))
    
  } else {
    console.log(`The folder ${languagePath} does not exist.`);
  }

}

// Function to list the files in each folder
const lenguageList = () => {
  const projectPath = join(rootDir, 'pexco');

  readdirSync(projectPath)
    .forEach(project => {
    const folders = readdirSync(join(projectPath, project)); 
    console.log(`<${project.toUpperCase()}>\n${folders.join('\n')}\n`);
    });
};

main();
  

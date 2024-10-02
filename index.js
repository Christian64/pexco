const { mkdirSync } = require("node:fs");
const { Command } = require("commander");
const program = new Command();
const rootDir = process.env.PWD;

const main = () => {
  program
    .command("hello")
    .description("Say hello world")
    .action(() => {
      console.log("Hello World");
    });

  program
    .command("add")
    .argument("<string>", "name of the langauge")
    .description("Add new program language")
    .action(createLengauge);

  program.parse();
};

function createLengauge(language) {
  mkdirSync(`${rootDir}/pexco/${language}`, { recursive: true });
}

main();

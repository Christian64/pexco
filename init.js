import { Command } from "commander";
const program = new Command();

program
  .command("add")
  .argument("<string>", "name of the langauge")
  .description("Add new program language")
  .action(createLenguage);

program.parse();

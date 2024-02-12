const fs = require("fs");
const chalk = require("chalk");
const yargs = require("yargs");
const { addNote, getNotes, removeNote, listNotes, readNote } = require("./notes");

//fs.writeFileSync('notes.txt',' file was created by Node.js!')
//  fs.appendFileSync('notes.txt','Tarun')
// console.log(chalk.red.bold('Hiiiii'))
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of notes",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    removeNote(argv.title);
  },
});
yargs.command({
  command: "list",
  describe: "Listing notes",
  handler() {
    listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Reading a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
        readNote(argv.title);
    },
});

//  console.log(process.argv)
// console.log(yargs.argv)
yargs.parse();

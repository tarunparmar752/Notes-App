const fs = require("fs");
const chalk = require('chalk')

const getNotes = function () {
  return "Your Notes";
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateTitle = notes.filter((obj) => obj.title === title);
  if (duplicateTitle.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    console.log(chalk.green("Note added"));
  } else {
    console.log(chalk.red("Note title already exist"));
  }

  saveNotes(notes);
};

//remove notes
const removeNote = function (title) {
    const notes = loadNotes();
    const newElements = notes.filter((note) => note.title !== title)
    if(newElements.length === notes.length){
        console.log(chalk.red("No such title found"))
    } else {
        saveNotes(newElements)
        console.log(chalk.green('Successfully deleted'))
    }
}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};



module.exports = { getNotes, addNote , removeNote};

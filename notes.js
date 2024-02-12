const fs = require("fs");
const chalk = require('chalk')

const getNotes = () => {
  return "Your Notes";
};

//add notes 
const addNote = (title, body) => {
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
const removeNote = (title) => {
    const notes = loadNotes();
    const newElements = notes.filter((note) => note.title !== title)
    if(newElements.length === notes.length){
        console.log(chalk.red("No such title found"))
    } else {
        saveNotes(newElements)
        console.log(chalk.green('Successfully deleted'))
    }
}

//list all the notes

const listNotes = () => {
    console.log(chalk.red.inverse('Your Notes'))
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.green(note.title))
    });
}

// read note 
const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find((note) => note.title === title);
    if(foundNote){
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red("No such title found"))
    }

}
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};



module.exports = { getNotes, addNote , removeNote , listNotes , readNote};

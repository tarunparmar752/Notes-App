const fs = require("fs");

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
    console.log("Note added");
  } else {
    console.log("Note title already exist");
  }

  saveNotes(notes);
};

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

module.exports = { getNotes, addNote };

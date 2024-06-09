const fs = require('fs'); //Importing Node.js filesystem module to interact with files on the system
const chalk = require('chalk'); // mporting chalk for colorized output in the terminal

//i used this function to to add a new note to the list of notes
const addNote = (title, body) => {
    const notes = loadNotes(); //This will load the existing notes from file
    const duplicateNote = notes.find((note) => note.title === title); //The arrow fucntion will check if a note with the same title already exists

    //created an if or else statement 
    //The If statement is saying that if no duplicate note is found, add the new note to the list
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes); //Save the updated list of notes to file
        console.log(chalk.green.inverse('New note added!')); //I will see that the note has been added
    } else {
        console.log(chalk.red.inverse('Note title taken!')); //I will see that the note title is already taken
    }
};

//This function is to remove a note from the list of notes
const removeNote = (title) => { //arrow function
    const notes = loadNotes(); //Load existing notes from file
    const notesToKeep = notes.filter((note) => note.title !== title); //Filter out the note with the specified title

    //If a note is removed, update the list of notes and save it to file
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!')); //I will know that the note has been added
        saveNotes(notesToKeep); //Save the updated list of notes to file
    } else {
        console.log(chalk.red.inverse('No note found!')); //I will see that no note with the specified title was found
    }    
};

//Use this function to list all notes currently stored
const listNotes = () => {
    const notes = loadNotes(); //Load existing notes from file

    console.log(chalk.inverse('Your notes')); //Will print a header for the list of notes

    //This will Iterate over each note and print its title
    notes.forEach((note) => {
        console.log(note.title);
    });
};

//this function to read the contents of a specific note
const readNote = (title) => {
    const notes = loadNotes(); 
    const note = notes.find((note) => note.title === title); 

    //If the note is found, display its title and body
    if (note) {
        console.log(chalk.inverse(note.title)); //Print the title of the note
        console.log(note.body); //Print the body of the note
    } else {
        console.log(chalk.red.inverse('Note not found!')); 
    }
};

//Function to save the list of notes to file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes); //Convert the list of notes to a JSON string
    fs.writeFileSync('notes.json', dataJSON); //Write the JSON string to a file named 'notes.json'
};

//Function is to load the list of notes from file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json'); //Read the file 'notes.json'
        const dataJSON = dataBuffer.toString(); //Convert the file into a string
        return JSON.parse(dataJSON); //Parse the string as JSON and return it as an array of notes
    } catch (e) {
        return []; //If an error occurs, return an empty array
    }
};

//Exporting functions for external use
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};

import { useState } from "react";
import NotetConext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesinitial = []
    const [notes, setNotes] = useState(notesinitial)

    // Get all notes
    // use API
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        // console.log(json)
        setNotes(json)
    }
    // Add note
    // use API
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })

        });
        const note = await response.json()
        setNotes(notesinitial.concat(note))
    }
    // Delete note
    // use API

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = response.json()
        console.log(json)
        console.log("deleteing the notes" + id);
        const newNotes = notes.filter((notes) => { return notes._id !== id })
        setNotes(newNotes);

    }
    // Edit note
    // use API
    const editnote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }
    return (
        <NotetConext.Provider value={{ notes, addnote, deleteNote, editnote, getNotes }}>
            {props.children}
        </NotetConext.Provider>
    )
}

export default NoteState;

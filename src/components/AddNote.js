import React, { useContext, useState } from 'react'
import notesContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(notesContext);
    const { addnote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const abc = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully", "Success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (

        <div className="container my-4">
            <h2>Add a Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={onChange} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={abc}>Add Notes</button>
            </form>
        </div>
    )
}

export default AddNote

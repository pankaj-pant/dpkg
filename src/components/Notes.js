import React, {useState} from 'react';

const Notes = ({packages, selectedPackage, setPackages, setSelectedPackage}) => {
    const [note, setNote] = useState("")
    const [edit, setEdit] = useState(false)

    const handleChange = (event) => {
        setNote(event.target.value)
    }

    const handleClick = () => {
        if (note.trim() !== "") {
            const updatedPackage = {...selectedPackage, notes: note}
            const updatedPackages = packages.map(pkg => pkg.name === updatedPackage.name ? updatedPackage : pkg)
            setPackages(updatedPackages)
            setSelectedPackage(updatedPackage)
            setNote("")
            setEdit(false)
        }
    }

    const editNote = () => {
        setNote(selectedPackage.notes)
        setEdit(!edit)
    }

    const deleteNote = () => {
        const updatedPackage = {...selectedPackage, notes: ""}
        const updatedPackages = packages.map(pkg => pkg.name === updatedPackage.name ? updatedPackage : pkg)
        setPackages(updatedPackages)
        setSelectedPackage(updatedPackage)
        setNote("")
        setEdit(true)
    }

    const form = () => {
        return(
            <>
            <h4>Add a note:</h4>
            <form>
                <br/>
                <textarea rows={5} cols={50} onChange={handleChange} value={note}/>
                <br/>
                <input type="button" onClick={handleClick} value="Save note"/>
            </form>
            </>
        )
    }

    const display = () => {
        if (edit){
            return (form())
        } else {
            return (
                <> 
                    <h4>Notes:</h4>
                    {selectedPackage.notes}{" "}
                    <button onClick={editNote}>Edit note</button>{" "}
                    <button onClick={deleteNote}>Delete note</button>
                </>
            )
        }
    }
    
    return (
        <div>
            {selectedPackage.notes ? display() : form()}
        </div>
    )
}

export default Notes
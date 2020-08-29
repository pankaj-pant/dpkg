import React, {useState} from 'react';

const Notes = ({packages, selectedPackage, setPackages, setSelectedPackage}) => {
    const [note, setNote] = useState("")
    const [edit, setEdit] = useState(false)

    const handleChange = (event) => {
        setNote(event.target.value)
    }

    const handleClick = () => {
        if (note !== "") {
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

    const form = () => {
        return(
            <form>
                <label>
                    Add a note:
                </label>
                <br/>
                <textarea rows={5} cols={50} onChange={handleChange} value={note}/>
                <input type="button" onClick={handleClick} value="Save note"/>
            </form>
        )
    }

    const display = () => {
        if (edit){
            return (form())
        } else {
            return (
                <> 
                    <p>Notes:</p>
                    <p>{selectedPackage.notes}</p>
                    <button onClick={editNote}>Edit note</button>
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
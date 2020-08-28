import React, {useState} from 'react';

const Notes = () => {
    const [note, setNote] = useState("")

    const handleChange = (event) => {
        setNote(event.target.value)
    }

    
    return (
        <div>
            <form>
                <label>
                    Add a note:
                </label>
                <br/>
                <textarea rows={5} cols={50} onChange={handleChange}/>
            </form>
        </div>
    )
}

export default Notes
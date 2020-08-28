import React, {useState} from 'react';

const InputTag = ({packages, selectedPackage, setPackages, setSelectedPackage}) => {

    //const [tags, setTags] = useState([])
    const [currentValue, setCurrentValue] = useState("")
      
    const handleChange = (event) => {
        setCurrentValue(event.target.value)
    }

    const handleClick = () => {
        if (currentValue !== "") {
            if (selectedPackage.tags.find(tag => tag.toLowerCase() === currentValue.toLowerCase())) {
                return;
              }
            const updatedPackage = {...selectedPackage, tags: [...selectedPackage.tags, currentValue]}
            const updatedPackages = packages.map(pkg => pkg.name === updatedPackage.name ? updatedPackage : pkg)
            setPackages(updatedPackages)
            setSelectedPackage(updatedPackage)
            setCurrentValue("")
        }
    }

    const deleteTag = (i) => {
        const newTags = [ ...selectedPackage.tags ];
        newTags.splice(i, 1);
        const updatedPackage = {...selectedPackage, tags: newTags}
        const updatedPackages = packages.map(pkg => pkg.name === updatedPackage.name ? updatedPackage : pkg)
        setPackages(updatedPackages)
        setSelectedPackage(updatedPackage)

        //setTags(newTags);
      }
  
    return (
      <div className="input-tag">
          Add a tag:
        <ul className="input-tag__tags">
          { selectedPackage.tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => deleteTag(i)}>-</button>
            </li>
          ))}
          <li className="input-tag__tags__input">
              <input type="text" onChange={handleChange} value={currentValue}/>
              <input type="button" onClick={handleClick} value="Add tag"/>
          </li>
        </ul>
      </div>
    );
  }

export default InputTag
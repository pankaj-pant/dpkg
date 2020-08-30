import React, {useState} from 'react';

const InputTag = ({packages, selectedPackage, setPackages, setSelectedPackage}) => {

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
      }
  
    return (
      <div>
        <h4>Add a tag:</h4>
        <ul>
          { selectedPackage.tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => deleteTag(i)}>-</button>
            </li>
          ))}
          <li>
              <input type="text" onChange={handleChange} value={currentValue}/>
              {" "}
              <input type="button" onClick={handleClick} value="Add tag"/>
          </li>
        </ul>
      </div>
    );
  }

export default InputTag
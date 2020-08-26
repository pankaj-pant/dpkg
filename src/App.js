import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [file, setFile] = useState()
  const [packages, setPackages] = useState([])
  const [reverseDependencies, setReverseDependencies] = useState({})

  const readFile = (input) => {
    let reader = new FileReader()

    reader.onloadend = () => {
        parseFile(reader.result)
    } 
    reader.readAsText(input)
}

  const parseFile = (input) => {
    const parsedPackages = []
    const reverseDependencies = {}

    //Split text file by double new line
    let packagesArray = input.split('\n\n')

    const parseDependencies = (packageName, dependencies) => {
      //remove package versions from dependencies
      const strippedDependencies = [...new Set(
        dependencies.replace(/(\([^()]*\))*/g, "")
          .split(',')
          .map(d => d.trim())
      )]
  
      //check for alternate dependencies in dependency list
      const finalDependencies = strippedDependencies.map(dep => dep.split('|').map(altDep => altDep.trim())).flat()
    
      //Setting reverse dependencies
      return finalDependencies.map(dep => {
          if (!reverseDependencies[dep]) {
            reverseDependencies[dep] = [packageName]
          } else if (!reverseDependencies[dep].includes(packageName)) {
            reverseDependencies[dep] = [...reverseDependencies[dep], packageName]
          }
          return dep
        }
      )
    }

    packagesArray.map(pkg => {
      //extract Package, Description and Depends fields
      const regex = /(Package: \s*([^\n\r]*))|(Description:((?: [^\n]+\n)+)(?:^ [^\n]*)?)|(\nDepends: \s*([^\n\r]*))/g
      const matchedPackage = pkg.match(regex)
      
      if (matchedPackage) {
        let packageObject = {}

        //extract content of matchedPackage
        const regex = /Package: |Depends: |Description: /gi;
        const matchedPackageContent = matchedPackage.map(item => item.replace(regex, ''))

        //handle packages with dependencies and without dependencies
        if(matchedPackageContent.length < 3){
          packageObject['name'] = matchedPackageContent[0]
          packageObject['description'] = matchedPackageContent[1]
          packageObject['dependencies'] = []
        } else {
          packageObject['name'] = matchedPackageContent[0]
          packageObject['dependencies'] = parseDependencies(matchedPackageContent[0], matchedPackageContent[1])
          packageObject['description'] = matchedPackageContent[2]
        }

        parsedPackages.push(packageObject)
        return matchedPackage
      } 
      return true
    })
    setPackages(parsedPackages)
    setReverseDependencies(reverseDependencies)
    
  }

  return (
    <div className="App">
      <h2>Package Analyser</h2>
      <input type="file" onChange={(event) => setFile(event.target.files[0])}></input>
      <button onClick={() => readFile(file)}>Read file</button>
      <h3>List of packages</h3>
      {packages.map(pkg => <li key={pkg.name}>{pkg.name}</li>)}
    </div>
  );
}

export default App;

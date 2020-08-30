import React, {useState, useEffect} from 'react';
import './App.css';
import PackageList from './components/PackageList'
import PackageDetails from './components/PackageDetails'
import data from './status.real'

const App = () => {
  const [file, setFile] = useState()
  const [packages, setPackages] = useState(JSON.parse(localStorage.getItem('packagesInLocalStorage')) || null)
  const [selectedPackage, setSelectedPackage] = useState(
    JSON.parse(localStorage.getItem('selectedPackageInLocalStorage')) || {
    name: '',
    description: '',
    dependencies: [],
    notes: '',
    tags: []
  })
  const [reverseDependencies, setReverseDependencies] = useState({})

  //save packages data to browser local storage
  useEffect(() => {
    localStorage.setItem('packagesInLocalStorage', JSON.stringify(packages))
  }, [packages])

  //save selectedPackage data to browser local storage & bring selected package into view
  useEffect(() => {
    const element = document.querySelector('.active')
    element && element.scrollIntoView({
      behavior: 'smooth'
    })
    localStorage.setItem('selectedPackageInLocalStorage', JSON.stringify(selectedPackage))
  }, [selectedPackage])

  //read file
  const readFile = (input) => {
    let reader = new FileReader()
    reader.onloadend = () => {
        parseFile(reader.result)
    } 
    reader.readAsText(input)
    setSelectedPackage({
      name: '',
      description: '',
      dependencies: [],
      notes: '',
      tags: []
    })
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
          packageObject['notes'] = ''
          packageObject['tags'] = []
        } else {
          packageObject['name'] = matchedPackageContent[0]
          packageObject['dependencies'] = parseDependencies(matchedPackageContent[0], matchedPackageContent[1])
          packageObject['description'] = matchedPackageContent[2]
          packageObject['notes'] = ''
          packageObject['tags'] = []
        }

        parsedPackages.push(packageObject)
        return matchedPackage
      } 
      return true
    })

    //sort packages alphabetically
    parsedPackages.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })  

    setPackages(parsedPackages)
    setReverseDependencies(reverseDependencies)
  }

  const findPackage = (name) => {
    return packages.find(pkg => pkg.name === name)
  } 

  const handleClick = (pkg) => {
    const foundPackage = findPackage(pkg)
    const {name, description, dependencies, notes, tags} = foundPackage
    setSelectedPackage({
      name,
      description,
      dependencies,
      notes,
      tags
    })
  }

  return (
    <div className="App">
      <section className="header">
        <h2>DPKG File Analyser</h2>
        <p>
          Select a dpkg status file to see the status of installed packages, or use this {" "}
          <span>
            <a href={data} download="status.real">sample file.</a></span>
        </p>
      </section>
      <section className="input">
        <input type="file" onChange={(event) => setFile(event.target.files[0])}></input>
        <button onClick={() => readFile(file)} disabled={!file}>Read file</button>
      </section>
      <PackageList packages={packages} selectedPackage={selectedPackage} handleClick={handleClick}/>
      <PackageDetails packages={packages} selectedPackage={selectedPackage} reverseDependencies={reverseDependencies} handleClick={handleClick} findPackage={findPackage} setPackages={setPackages} setSelectedPackage={setSelectedPackage}/>
    </div>
  );
}

export default App;
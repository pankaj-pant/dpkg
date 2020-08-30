import React from 'react';
import InputTag from './InputTag'
import Notes from './Notes'
import { v4 as uuidv4 } from 'uuid';

const PackageDetails = ({packages, selectedPackage, reverseDependencies, findPackage, handleClick, setPackages, setSelectedPackage}) => {
    return(
        <div className="package-info">
            {packages && packages.length > 0 && selectedPackage.name === '' && <div>Select a package from the list to know more about it!</div>}
            {packages && packages.length > 0 && selectedPackage.name !== '' &&
            <>
                <h3>Package details</h3>
                <section className="scrollable">
                    <h4>Name:</h4> 
                    <p>{selectedPackage.name}</p>
                    <h4>Description:</h4>
                    <p>{selectedPackage.description}</p>
                    {selectedPackage.dependencies.length === 0 ? (
                    <><h4>Dependencies:</h4><p>None found!</p></>
                    ) : (
                    <>
                        <h4>Dependencies: </h4>
                        {selectedPackage.dependencies.map((dep, i) => {
                            if(findPackage(dep) === undefined) {
                            return <li style ={{color: 'darkgray'}} key={`${dep}-${i}`}>{dep}</li>
                            }
                            return <li key={`${dep}-${i}`} onClick={() => handleClick(dep)}>{dep}</li>
                            }
                        )}
                    </>
                    )}
                    {reverseDependencies[selectedPackage.name] ? (
                    <>
                        <h4>Reverse dependencies:</h4>
                        {reverseDependencies[selectedPackage.name].map((rDep, i) => <li key={`${rDep}-${i}`} onClick={() => handleClick(rDep)}> {rDep}</li>)}
                    </>
                    ) : (
                    <><h4>Reverse dependencies:</h4><p>None found!</p></>
                    )}       
                    <InputTag key={selectedPackage.name} selectedPackage={selectedPackage} setPackages={setPackages} packages={packages} setSelectedPackage={setSelectedPackage}/>
                    <br/>
                    <Notes key={uuidv4()} selectedPackage={selectedPackage} setPackages={setPackages} packages={packages} setSelectedPackage={setSelectedPackage}/>
                </section>
            </>
            }
            
        </div>
    )
}

export default PackageDetails
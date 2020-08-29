import React from 'react';
import InputTag from './InputTag'
import Notes from './Notes'

const PackageDetails = ({packages, selectedPackage, reverseDependencies, findPackage, handleClick, setPackages, setSelectedPackage}) => {
    return(
        <div className="package-info">
            {packages && packages.length > 0 && selectedPackage.name === '' && <div>Select a package from the list to know more about it!</div>}
            {packages && packages.length > 0 && selectedPackage.name !== '' &&
            <>
                <h3>Package details</h3>
                <section className="scrollable">
                    <p>Package name: {selectedPackage.name}</p>
                    <p>Description: {selectedPackage.description}</p>
                    <Notes selectedPackage={selectedPackage} setPackages={setPackages} packages={packages} setSelectedPackage={setSelectedPackage}/>
                    <br/>
                    <InputTag selectedPackage={selectedPackage} setPackages={setPackages} packages={packages} setSelectedPackage={setSelectedPackage}/>
                    {selectedPackage.dependencies.length === 0 ? (
                    <p>Dependencies: None found!</p>
                    ) : (
                    <p>
                        Dependencies: 
                        {selectedPackage.dependencies.map((dep, i) => {
                            if(findPackage(dep) === undefined) {
                            return <li style ={{color: 'darkgray'}} key={`${dep}-${i}`}>{dep}</li>
                            }
                            return <li key={`${dep}-${i}`} onClick={() => handleClick(dep)}>{dep}</li>
                            }
                        )}
                    </p>
                    )}
                    {reverseDependencies[selectedPackage.name] ? (
                    <p>
                        Reverse dependencies: 
                        {reverseDependencies[selectedPackage.name].map((rDep, i) => <li key={`${rDep}-${i}`} onClick={() => handleClick(rDep)}> {rDep}</li>)}
                    </p>
                    ) : (
                    <p>Reverse Dependencies: None found!</p>
                    )}
                </section>
            </>
            }
            
        </div>
    )
}

export default PackageDetails
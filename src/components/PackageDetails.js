import React from 'react';

const PackageDetails = ({packages, selectedPackage, reverseDependencies, findPackage, handleClick}) => {
    return(
        <div className="package-info">
            {packages && packages.length > 0 && selectedPackage.name === '' && <div>Select a package from the list to know more about it!</div>}
            {packages && packages.length > 0 && selectedPackage.name !== '' &&
            <>
                <h3>Package details</h3>
                <br/>
                <section className="scrollable">
                    <p>Package name: {selectedPackage.name}</p> <br />
                    <p>Description: {selectedPackage.description}</p> <br />
                    {selectedPackage.dependencies.length === 0 ? (
                    <><p>Dependencies: None found!</p><br /></>
                    ) : (
                    <>
                        <p>
                            Dependencies: 
                            {selectedPackage.dependencies.map((dep, i) => {
                                if(findPackage(dep) === undefined) {
                                return <li style ={{color: 'red'}} key={`${dep}-${i}`}>{dep}</li>
                                }
                                return <li key={`${dep}-${i}`} onClick={() => handleClick(dep)}>{dep}</li>
                                }
                            )}
                        </p>
                        <br />
                    </>
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
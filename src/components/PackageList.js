import React from 'react';

const PackageList = ({packages, selectedPackage, handleClick}) => {
    return (
        <div className="package-list">
            {packages && packages.length === 0 && <div>No packages found, try another file!</div>}
            {packages && packages.length > 0 && 
            <>
            <h3>List of packages</h3>
            <br/>
            <section className="package-list-container scrollable">
                {packages.map((pkg, i) => 
                    <li 
                        key={pkg.name} 
                        onClick={() => handleClick(pkg.name)} 
                        className={selectedPackage.name === pkg.name ? 'active' : ''}
                    >
                        {pkg.name}
                    </li>
                )}
            </section>
            </>
            }
        </div>
    )
}

export default PackageList
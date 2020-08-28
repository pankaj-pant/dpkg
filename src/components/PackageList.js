import React, {useState} from 'react';

const PackageList = ({packages, selectedPackage, handleClick}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className="package-list">
            {packages && packages.length === 0 && <div>No packages found, try another file!</div>}
            {packages && packages.length > 0 && 
            <>
            <h3>List of packages</h3>
            <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange}/>
            <section className="package-list-container scrollable">
                {packages.filter(pkg => {
                    if(searchTerm === "") {
                        return pkg
                    } else {
                        return pkg.tags.includes(searchTerm)
                    }
                }).map((pkg, i) => 
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
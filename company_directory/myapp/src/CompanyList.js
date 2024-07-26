import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from './api';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/companies/`)
            .then(data => {
                setCompanies(data);
                setFilteredCompanies(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setFilteredCompanies(
            companies.filter(company =>
                company.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, companies]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search by company name"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <ul>
                {filteredCompanies.map(company => (
                    <li key={company.company_id}>
                        <Link to={`/companydetails/${company.company_id}`}>{company.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;

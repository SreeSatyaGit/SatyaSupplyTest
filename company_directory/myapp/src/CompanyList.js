import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from './api';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/companies/`)
            .then(data => {
                setCompanies(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Company List</h1>
            <ul>
                {companies.map(company => (
                    <li key={company.company_id}>
                        <Link to={`/companydetails/${company.company_id}`}>{company.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;

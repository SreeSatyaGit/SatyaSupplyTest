import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from './api';

const ContactList = () => {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData('http://backend:8000/api/companies/')
            .then(data => setCompanies(data))
            .catch(error => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Contact List</h1>
            <ul>
                {companies.map(company => (
                    <li key={company.company_id}>
                        <Link to={`/contactdetails/${company.company_id}`}>{company.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;

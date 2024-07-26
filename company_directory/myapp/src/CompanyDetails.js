import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from './api';

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [locations, setLocations] = useState([]);
    const [loadingCompany, setLoadingCompany] = useState(true);
    const [loadingLocations, setLoadingLocations] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/companies/${id}/`)
                .then(data => {
                    setCompany(data);
                    setLoadingCompany(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoadingCompany(false);
                });
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/companies/${id}/locations/`)
                .then(data => {
                    setLocations(data);
                    setLoadingLocations(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoadingLocations(false);
                });
        }
    }, [id]);

    if (loadingCompany || loadingLocations) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>{company.name}</h1>
            <p>{company.address}</p>
            <h2>Locations</h2>
            <ul>
                {locations.map(location => (
                    <li key={location.location_id}>
                        {location.name} - {location.address}
                    </li>
                ))}
            </ul>
            <a href="/">Back to List</a>
        </div>
    );
};

export default CompanyDetails;

import React, { useState, useEffect } from 'react';
import { useParams , Link} from 'react-router-dom';
import { fetchData } from './api';

const ContactDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/companies/${id}/`)
            .then(data => setCompany(data))
            .catch(error => setError(error.message));
    }, [id]);

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/companies/${id}/locations/`)
            .then(data => setLocations(data))
            .catch(error => setError(error.message));
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!company) {
        return <div>Loading...</div>;
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
            <Link to="/">Back to List</Link>
        </div>
    );
};

export default ContactDetails;

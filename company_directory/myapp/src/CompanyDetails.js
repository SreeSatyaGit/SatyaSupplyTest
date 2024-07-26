import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchData } from './api';

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

    if (!company) {
        return <div>No company data available</div>;
    }

    return (
        <div>
            <h1>{company.name}</h1>
            <p>{company.address}</p>
            <div style={{ height: '400px' }}>
                <MapContainer center={[company.latitude, company.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[company.latitude, company.longitude]}>
                        <Popup>
                            {company.name} <br /> {company.address}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
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

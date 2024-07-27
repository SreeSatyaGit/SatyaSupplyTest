import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CompanyList from './CompanyList';
import { fetchData } from './api';

jest.mock('./api');

describe('CompanyList Component', () => {
    const mockCompanies = [
        { company_id: 1, name: 'Company One' },
        { company_id: 2, name: 'Company Two' },
        { company_id: 3, name: 'Another Company' },
    ];

    beforeEach(() => {
        fetchData.mockResolvedValue(mockCompanies);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        render(
            <Router>
                <CompanyList />
            </Router>
        );
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders companies after data is fetched', async () => {
        render(
            <Router>
                <CompanyList />
            </Router>
        );

        await waitFor(() => expect(screen.getByText('Company One')).toBeInTheDocument());
        expect(screen.getByText('Company Two')).toBeInTheDocument();
        expect(screen.getByText('Another Company')).toBeInTheDocument();
    });

    test('renders error message if fetching fails', async () => {
        fetchData.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(
            <Router>
                <CompanyList />
            </Router>
        );

        await waitFor(() => expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument());
    });

    test('filters companies based on search input', async () => {
        render(
            <Router>
                <CompanyList />
            </Router>
        );

        await waitFor(() => expect(screen.getByText('Company One')).toBeInTheDocument());

        const searchInput = screen.getByPlaceholderText('Search by company name');
        fireEvent.change(searchInput, { target: { value: 'Another' } });

        expect(screen.queryByText('Company One')).not.toBeInTheDocument();
        expect(screen.queryByText('Company Two')).not.toBeInTheDocument();
        expect(screen.getByText('Another Company')).toBeInTheDocument();
    });
});

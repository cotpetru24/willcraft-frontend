import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import Dashboard from './Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const mockReducer = (state = {}, action) => state;

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));


describe('Dashboard', () => {
    const initialOrdersState = {
        orders: [
            {
                _id: '6685c88356a9ae939edd3a57',
                status: 'CreatingOrder',
                testator: 'Test Name',
                dob: '1989-07-25',
                fullAddress: 'Test Street',
                updatedAt: '2024-08-29T21:22:38.367Z',
                currentStep: 3
            }
        ],
        isLoading: false,
        isError: false,
        message: '',
    };

    const store = configureStore({
        reducer: {
            orders: (state = initialOrdersState, action) => state,
            mock: mockReducer,
        }
    });

    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });


    test('should render the dashboard with correct elements', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('My Wills')).toBeInTheDocument();
        expect(screen.getByText('Create a new Will')).toBeInTheDocument();
    });


    test('should navigate to creatinOrder page on button click', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </Provider>
        );

        const createWillButton = screen.getByText('Create a new Will');
        fireEvent.click(createWillButton);

        expect(mockNavigate).toHaveBeenCalledWith('/creatingOrder');
    });


    test('should render OrdersList component with orders', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Test Name')).toBeInTheDocument();
        expect(screen.getByText('29/08/2024, 22:22:38')).toBeInTheDocument();
    });
});

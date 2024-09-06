import React from 'react';
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import OrdersList from './OrdersList';
import { BrowserRouter } from 'react-router-dom';


const mockReducer = (state = { orders: [], isLoading: false, isError: false, message: '' }, action) => state;

describe('OrdersList', () => {
    const store = configureStore({
        reducer: {
            orders: mockReducer,
        }
    });

    test('should render the orders correctly', () => {
        const mockState = {
            orders: [
                {
                    _id: '1',
                    status: 'CreatingOrder',
                    testator: 'Test Name 1',
                    dob: '1980-01-01',
                    fullAddress: '123 Test St',
                    updatedAt: '2024-08-29T21:22:38.367Z',
                },
                {
                    _id: '2',
                    status: 'Complete',
                    testator: 'Test Name 2',
                    dob: '1990-02-02',
                    fullAddress: '456 Sample Street',
                    updatedAt: '2024-08-30T21:22:38.367Z',
                }
            ],
            isLoading: false,
            isError: false,
            message: ''
        };

        render(
            <Provider store={configureStore({ reducer: { orders: () => mockState } })}>
                <BrowserRouter>
                    <OrdersList />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Test Name 1')).toBeInTheDocument();
        expect(screen.getByText('Test Name 2')).toBeInTheDocument();
    });

    test('should render no wills message correctly', () => {
        const mockState = {
            orders: [],
            isLoading: false,
            isError: false,
            message: ''
        };

        render(
            <Provider store={configureStore({ reducer: { orders: () => mockState } })}>
                <BrowserRouter>
                    <OrdersList />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText("You don't have any wills yet.")).toBeInTheDocument();
        expect(screen.getByText("Click Create my will to get started.")).toBeInTheDocument();
    });

    test('should render the loading spinner when loading', () => {
        const mockState = {
            orders: [],
            isLoading: true,
            isError: false,
            message: ''
        };

        render(
            <Provider store={configureStore({ reducer: { orders: () => mockState } })}>
                <BrowserRouter>
                    <OrdersList />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
});

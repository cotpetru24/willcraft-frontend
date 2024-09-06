import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import TestatorCard from './TestatorCard';


const mockState = {
    testator: {
        title: 'Mr.',
        fullLegalName: 'John Smith',
        dob: '1990-01-01T00:00:00.000Z',
        fullAddress: '123 London Road',
    },
    currentOrderStep: {
        currentStep: 1,
    }
};


describe('TestatorCard', () => {
    const mockStore = configureStore({
        reducer: {
            testator: (state = mockState.testator, action) => state,
            currentOrderStep: (state = mockState.currentOrderStep, action) => state,
        },
        preloadedState: mockState,
    });


    test('should render TestatorCard component correctly', () => {

        render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <TestatorCard />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('About you')).toBeInTheDocument();
        expect(screen.getByText(/Mr\.\sJohn\sSmith/)).toBeInTheDocument();
        expect(screen.getByText('Date of birth:')).toBeInTheDocument();
        expect(screen.getByText('01/01/1990')).toBeInTheDocument();
        expect(screen.getByText('123 London Road')).toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
    });


    test('should render "Get Started" button when fields are not filled in', () => {

        const mockStateEmpty = {
            testator: {
                title: '',
                fullLegalName: '',
                dob: '',
                fullAddress: '',
            },
            currentOrderStep: {
                currentStep: 0,
            }
        };

        const mockStoreEmpty = configureStore({
            reducer: {
                testator: (state = mockStateEmpty.testator, action) => state,
                currentOrderStep: (state = mockStateEmpty.currentOrderStep, action) => state,
            },
            preloadedState: mockStateEmpty,
        });

        render(
            <Provider store={mockStoreEmpty}>
                <BrowserRouter>
                    <TestatorCard />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Tell us about you')).toBeInTheDocument();
        expect(screen.getByText('Get Started')).toBeInTheDocument();
    });
});

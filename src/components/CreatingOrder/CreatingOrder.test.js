import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import CreatingOrder from './CreatingOrder';
import currentOrderReducer from '../../features/currentOrder/currentOrderSlice';


const mockState = {
    auth: {
        user: {
            _id: '6691a1559949d9c888e2e850',
            firstName: 'TestFirstName',
            lastName: 'TestLastName',
            email: 'demo@demo.com',
            token: 'mocked_token',
        },
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    orders: {
        orders: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    currentOrder: {
        orderId: '66cbdd6aafd8a462bd5854f2',
        userId: '6691a1559949d9c888e2e850',
        status: 'CreatingOrder',
        peopleAndRoles: [
            {
                personId: {
                    _id: '66c4fb8e693d3653028006ec',
                    title: 'Mr.',
                    fullLegalName: 'John Smith',
                    fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                    dob: '1999-11-11T00:00:00.000Z',
                },
                role: ['testator'],
            },
            {
                personId: {
                    _id: '66c4fba0693d3653028006f3',
                    title: 'Mrs.',
                    fullLegalName: 'Mary Smith',
                    fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                    dob: '1999-11-11T00:00:00.000Z',
                },
                role: ['spouse'],
            },
        ],
        assetsAndDistribution: [
            {
                assetId: {
                    _id: '66c4fbe4693d36530280071b',
                    assetType: 'Bank Account',
                    bankName: 'HSBC',
                },
                distribution: [
                    {
                        personId: {
                            _id: '66c4fba0693d3653028006f3',
                            fullLegalName: 'Mary Smith',
                        },
                        receivingAmount: '50',
                    },
                ],
            },
        ],
        isError: false,
        isSuccess: true,
        isLoading: false,
        message: ''
    },
    currentOrderStep: {
        currentStep: 6
    },
    testator: {
        _id: '66c4fb8e693d3653028006ec',
        title: 'Mr.',
        fullLegalName: 'John Smith',
        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
        dob: '1999-11-11T00:00:00.000Z',
    },
    spouseOrPartner: {
        _id: '66c4fba0693d3653028006f3',
        title: 'Mrs.',
        fullLegalName: 'Mary Smith',
        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
        dob: '1999-11-11T00:00:00.000Z',
    },
    kids: [
        {
            _id: '66c4fbc9693d365302800707',
            title: 'Mr.',
            fullLegalName: 'George Smith',
            fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
            dob: '1999-11-11T00:00:00.000Z',
        },
    ],
    assets: [
        {
            _id: '66c4fbe4693d36530280071b',
            assetType: 'Bank Account',
            bankName: 'HSBC',
            distribution: [
                {
                    personId: {
                        _id: '66c4fba0693d3653028006f3',
                        title: 'Mrs.',
                        fullLegalName: 'Mary Smith',
                    },
                    receivingAmount: '50',
                },
            ],
        },
    ],
    additionalBeneficiaries: [
        {
            personId: {
                _id: '66d0e7700e5faa277cb1c087',
                title: 'Mr.',
                fullLegalName: 'Adam Taylor',
                fullAddress: 'Ranan House, 456 Kingsland Rd, London E8 4AE, UK',
                dob: '1966-06-25T00:00:00.000Z',
            },
            role: ['additional beneficiary', 'executor'],
        }
    ],
    additionalExecutors: [
        {
            _id: '66d0e7c80e5faa277cb1c101',
            title: 'Mrs.',
            fullLegalName: 'Margaret Taylor',
            fullAddress: '77 Wimpole St, London W1G 9RU, UK',
            dob: '1977-08-30T00:00:00.000Z',
        }
    ]
};

describe('CreatingOrder', () => {
    
    const mockStore = configureStore({
        reducer: {
            currentOrder: currentOrderReducer,
            currentOrderStep: (state = mockState.currentOrderStep, action) => state,
            auth: (state = mockState.auth, action) => state,
            orders: (state = mockState.orders, action) => state,
            testator: (state = mockState.testator, action) => state,
            spouseOrPartner: (state = mockState.spouseOrPartner, action) => state,
            kids: (state = mockState.kids, action) => state,
            assets: (state = mockState.assets, action) => state,
            additionalBeneficiaries: (state = mockState.additionalBeneficiaries, action) => state,
            additionalExecutors: (state = mockState.additionalExecutors, action) => state,
        },
        preloadedState: mockState,
    });

    test('renders CreatingOrder component correctly', () => {

        render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <CreatingOrder />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('My Will')).toBeInTheDocument();
        expect(screen.getByText('About you')).toBeInTheDocument();
        expect(screen.getByText('Your spouse or partner')).toBeInTheDocument();
        expect(screen.getByText('Your children')).toBeInTheDocument();
        expect(screen.getByText('Your Assets')).toBeInTheDocument();
        expect(screen.getByText('Assets Distribution')).toBeInTheDocument();
        expect(screen.getByText('Your Executors')).toBeInTheDocument();
        expect(screen.getByText('Order Progress')).toBeInTheDocument();
        expect(screen.getByText('Review and Complete Your Order')).toBeInTheDocument();
        expect(screen.getAllByText('Edit')).toHaveLength(6);
        expect(screen.getByText('Back')).toBeInTheDocument();
    });
});

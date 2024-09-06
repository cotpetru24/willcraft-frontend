import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from 'react-router-dom';
import OrderItem from './OrderItem';


const mockReducer = (state = {}, action) => state;

describe('OrderItem', () => {
    const order = {
        testator: 'Test Name',
        dob: '1989-07-25',
        fullAddress: 'Test Street',
        updatedAt: '2024-08-29T21:22:38.367Z',
    };

    const store = configureStore({
        reducer: {
            mock: mockReducer,
        }
    });

    test('should render OrderItem and order details correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <OrderItem order={order} />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(order.testator)).toBeInTheDocument();
        expect(screen.getByText(new Date(order.dob).toLocaleDateString('en-GB'))).toBeInTheDocument();
        expect(screen.getByText(order.fullAddress)).toBeInTheDocument();
        expect(screen.getByText(new Date(order.updatedAt).toLocaleString('en-GB'))).toBeInTheDocument();
    });
});

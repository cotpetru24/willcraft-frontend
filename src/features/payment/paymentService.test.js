import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createPaymentIntent, createPayment } from './paymentService';

const mock = new MockAdapter(axios);


describe('paymentService', () => {

    afterEach(() => {
        mock.reset();
    });

    test('calls createPaymentIntent successfully', async () => {
        const token = 'mock_token';
        const products = [
            { name: 'Product 1', price: 20 },
            { name: 'Product 2', price: 30 },
        ];
        const clientSecret = 'mock_client_secret';

        // Mock the request with the expected payload and headers
        mock.onPost('/api/payments/create-payment-intent', products)
            .reply(config => {
                if (config.headers.Authorization === `Bearer ${token}`) {
                    return [200, { clientSecret }];
                }
                return [400, { message: 'Bad Request' }];
            });

        const response = await createPaymentIntent(products, token);
        expect(response.clientSecret).toEqual(clientSecret);
    });


    test('createPayment successfully', async () => {
        const token = 'mock_token';
        const paymentData = {
            orderId: '66d252ed245514d47ddb7247',
            amount: 5000,
            status: 'succeeded',
            paymentDate: '2024-08-30T23:18:40.022Z',
            paymentMethod: 'card',
            products: [
                { name: 'Product 1', price: 20 },
                { name: 'Product 2', price: 30 },
            ],
        };
        const paymentResponse = { ...paymentData, id: 'mock_payment_id' };

        // Mock the request with the expected payload and headers
        mock.onPost('/api/payments', paymentData)
            .reply(config => {
                if (config.headers.Authorization === `Bearer ${token}`) {
                    return [200, paymentResponse];
                }
                return [400, { message: 'Bad Request' }];
            });

        const response = await createPayment(paymentData, token);
        expect(response).toEqual(paymentResponse);
    });


    test('createPaymentIntent failed with error', async () => {
        const token = 'mock_token';
        const products = [
            { name: 'Product 1', price: 20 },
            { name: 'Product 2', price: 30 },
        ];

        mock.onPost('/api/payments/create-payment-intent', products)
            .reply(500, { message: 'Internal Server Error' });

        const response = await createPaymentIntent(products, token);
        expect(response).toBeUndefined();
    });


    test('createPayment failed with error', async () => {
        const token = 'mock_token';
        const paymentData = {
            orderId: '66d252ed245514d47ddb7247',
            amount: 5000,
            status: 'succeeded',
            paymentDate: '2024-08-30T23:18:40.022Z',
            paymentMethod: 'card',
            products: [
                { name: 'Product 1', price: 20 },
                { name: 'Product 2', price: 30 },
            ],
        };

        mock.onPost('/api/payments', paymentData)
            .reply(500, { message: 'Internal Server Error' });

        const response = await createPayment(paymentData, token);
        expect(response).toBeUndefined();
    });
});

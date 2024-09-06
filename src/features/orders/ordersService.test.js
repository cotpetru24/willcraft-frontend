import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ordersService from "./ordersService";

const mock = new MockAdapter(axios);


describe('ordersService', () => {
    afterEach(() => {
        mock.reset();
    });


    test('fetch orders successfully', async () => {
        const token = 'mock_token';
        const orders = [
            {
                _id: '66d252ed245514d47ddb7247',
                createdAt: '2024-08-30T23:17:01.082Z',
                updatedAt: '2024-08-30T23:18:40.276Z',
                status: 'complete',
                completionDate: '2024-08-30T23:18:40.022Z',
                testator: 'test name',
                dob: '1999-01-01T00:00:00.000Z',
                fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                currentStep: 6
            },
        ];

        mock.onGet('/api/orders/', { headers: { Authorization: `Bearer ${token}` } }).reply(200, orders);
        const response = await ordersService.getOrders(token);
        expect(response).toEqual(orders)
    })


    test('delete an order successfully', async () => {
        const token = 'mock_token';
        const orderId = '66d252ed245514d47ddb7247';


        mock.onDelete('/api/orders/' + orderId, { headers: { Authorization: `Bearer ${token}` } }).reply(200, { id: orderId });
        const response = await ordersService.deleteOrder(orderId, token);
        expect(response.id).toEqual(orderId)
    })
})
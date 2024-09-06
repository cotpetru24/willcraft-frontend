import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { getOrders, deleteOrder } from "./ordersSlice";
import ordersService from "./ordersService";


const mockStore = configureMockStore([thunk])
const mock = new MockAdapter(axios)


describe('ordersSlice', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            order: {
                tasks: [],
                isError: false,
                isSuccess: false,
                isLoading: false,
                message: '',
            },
            auth: {
                user: { token: 'mock_token' },
            },
        })
    }),
        afterEach(() => {
            mock.reset();
            store.clearActions();
        })


    test("calls orderService.getOrders to fetch orders", async () => {
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

        const getOrdersSpy = jest.spyOn(ordersService, 'getOrders').mockResolvedValue(orders);
        await store.dispatch(getOrders());
        expect(getOrdersSpy).toHaveBeenCalledWith(token);
    })


    test("calls orderService.deleteOrder to delete an order", async () => {
        const token = 'mock_token';
        const orderId = '66d252ed245514d47ddb7247';

        const deleteOrderSpy = jest.spyOn(ordersService, 'deleteOrder').mockResolvedValue({ id: orderId });
        await store.dispatch(deleteOrder(orderId));
        expect(deleteOrderSpy).toHaveBeenCalledWith(orderId, token);
    });
})


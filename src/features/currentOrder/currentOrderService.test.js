import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getOrder, updateOrder, createOrder } from "./currentOrderService";

const mock = new MockAdapter(axios);


describe('currentOrderService', () => {
    afterEach(() => {
        mock.reset();
    });

    test('fetch the order successfully', async () => {
        const token = 'mock_token';
        const orderId = '66cbdd6aafd8a462bd5854f2';
        const currentOrder = {
            _id: '66cbdd6aafd8a462bd5854f2',
            userId: '6691a1559949d9c888e2e850',
            status: 'complete',
            peopleAndRoles: [
                {
                    personId: {
                        _id: '66c4fb8e693d3653028006ec',
                        title: 'Mr.',
                        fullLegalName: 'John Smith',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                        dob: '1999-11-11T00:00:00.000Z',
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-20T20:24:46.728Z',
                        updatedAt: '2024-08-30T20:56:09.956Z',
                        __v: 0,
                        hasChildrenStatus: '',
                        maritalStatus: 'married'
                    },
                    role: ['testator'],
                    _id: '66c4fb8f693d3653028006f0'
                },
                {
                    personId: {
                        _id: '66c4fba0693d3653028006f3',
                        title: 'Mrs.',
                        fullLegalName: 'Mary Smith',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                        dob: '1999-11-11T00:00:00.000Z',
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-20T20:25:04.487Z',
                        updatedAt: '2024-08-29T21:22:38.367Z',
                        __v: 0
                    },
                    role: ['spouse'],
                    _id: '66c4fba0693d3653028006f9'
                },
            ],
            assetsAndDistribution: [
                {
                    assetId: {
                        _id: '66c4fbe4693d36530280071b',
                        assetType: 'Bank Account',
                        bankName: 'HSBC',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-20T20:26:12.296Z',
                        updatedAt: '2024-08-29T21:24:25.054Z',
                        __v: 0
                    },
                    distribution: [
                        {
                            personId: {
                                _id: '66c4fba0693d3653028006f3',
                                title: 'Mrs.',
                                fullLegalName: 'Mary Smith',
                                fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                                dob: '1999-11-11T00:00:00.000Z',
                                email: '',
                                tel: '',
                                userId: '6691a1559949d9c888e2e850',
                                createdAt: '2024-08-20T20:25:04.487Z',
                                updatedAt: '2024-08-29T21:22:38.367Z',
                                __v: 0
                            },
                            receivingAmount: '50',
                            _id: '66d0e7700e5faa277cb1c098'
                        },
                    ],
                    _id: '66d0e7700e5faa277cb1c097'
                },
            ],
            isError: false,
            isSuccess: true,
            isLoading: false,
            message: ''
        };

        mock.onGet('/api/orders/' + orderId, { headers: { Authorization: `Bearer ${token}` } }).reply(200, currentOrder);
        const response = await getOrder(orderId, token);
        expect(response).toEqual(currentOrder);
    });


    test('update the order successfully', async () => {
        const token = 'mock_token';
        const orderData = {
            orderId: '66cbdd6aafd8a462bd5854f2',
            userId: '6691a1559949d9c888e2e850',
            status: 'complete',
            peopleAndRoles: [
                {
                    personId: {
                        _id: '66c4fb8e693d3653028006ec',
                        title: 'Mr.',
                        fullLegalName: 'John Smith',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                        dob: '1999-11-11T00:00:00.000Z',
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-20T20:24:46.728Z',
                        updatedAt: '2024-08-30T20:56:09.956Z',
                        __v: 0,
                        hasChildrenStatus: '',
                        maritalStatus: 'married'
                    },
                    role: ['testator'],
                    _id: '66c4fb8f693d3653028006f0'
                },
                {
                    personId: {
                        _id: '66c4fba0693d3653028006f3',
                        title: 'Mrs.',
                        fullLegalName: 'Mary Smith',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                        dob: '1999-11-11T00:00:00.000Z',
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-20T20:25:04.487Z',
                        updatedAt: '2024-08-29T21:22:38.367Z',
                        __v: 0
                    },
                    role: ['spouse'],
                    _id: '66c4fba0693d3653028006f9'
                },
            ],
            assetsAndDistribution: [
                {
                    assetId: {
                        _id: '66c4fbe4693d36530280071b',
                        assetType: 'Bank Account',
                        bankName: 'HSBC',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-20T20:26:12.296Z',
                        updatedAt: '2024-08-29T21:24:25.054Z',
                        __v: 0
                    },
                    distribution: [
                        {
                            personId: {
                                _id: '66c4fba0693d3653028006f3',
                                title: 'Mrs.',
                                fullLegalName: 'Mary Smith',
                                fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                                dob: '1999-11-11T00:00:00.000Z',
                                email: '',
                                tel: '',
                                userId: '6691a1559949d9c888e2e850',
                                createdAt: '2024-08-20T20:25:04.487Z',
                                updatedAt: '2024-08-29T21:22:38.367Z',
                                __v: 0
                            },
                            receivingAmount: '50',
                            _id: '66d0e7700e5faa277cb1c098'
                        },
                    ],
                    _id: '66d0e7700e5faa277cb1c097'
                },
            ],
            isError: false,
            isSuccess: true,
            isLoading: false,
            message: ''
        };

        mock.onPut('/api/orders/' + orderData.orderId, orderData).reply(config => {
            if (config.headers.Authorization === `Bearer ${token}`) {
                return [200, orderData];
            }
            return [404];
        });

        const response = await updateOrder(orderData, token);
        expect(response).toEqual(orderData)
    })


    test('create a new order successfully', async () => {
        const token = 'mock_token';
        const newOrderData = {
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
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-20T20:24:46.728Z',
                        updatedAt: '2024-08-30T20:56:09.956Z',
                        __v: 0,
                        hasChildrenStatus: '',
                        maritalStatus: 'married'
                    },
                    role: ['testator'],
                    _id: '66c4fb8f693d3653028006f0'
                },
                {
                    personId: {
                        _id: '66c4fba0693d3653028006f3',
                        title: 'Mrs.',
                        fullLegalName: 'Mary Smith',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                        dob: '1999-11-11T00:00:00.000Z',
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-20T20:25:04.487Z',
                        updatedAt: '2024-08-29T21:22:38.367Z',
                        __v: 0
                    },
                    role: ['spouse'],
                    _id: '66c4fba0693d3653028006f9'
                },
            ],
            assetsAndDistribution: [
                {
                    assetId: {
                        _id: '66c4fbe4693d36530280071b',
                        assetType: 'Bank Account',
                        bankName: 'HSBC',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-20T20:26:12.296Z',
                        updatedAt: '2024-08-29T21:24:25.054Z',
                        __v: 0
                    },
                    distribution: [
                        {
                            personId: {
                                _id: '66c4fba0693d3653028006f3',
                                title: 'Mrs.',
                                fullLegalName: 'Mary Smith',
                                fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                                dob: '1999-11-11T00:00:00.000Z',
                                email: '',
                                tel: '',
                                userId: '6691a1559949d9c888e2e850',
                                createdAt: '2024-08-20T20:25:04.487Z',
                                updatedAt: '2024-08-29T21:22:38.367Z',
                                __v: 0
                            },
                            receivingAmount: '50',
                            _id: '66d0e7700e5faa277cb1c098'
                        },
                    ],
                    _id: '66d0e7700e5faa277cb1c097'
                },
            ],
            isError: false,
            isSuccess: true,
            isLoading: false,
            message: ''
        };

        mock.onPost('/api/orders/', newOrderData).reply(config => {
            if (config.headers.Authorization === `Bearer ${token}`) {
                return [200, newOrderData];
            }
            return [404];
        });

        const response = await createOrder(newOrderData, token);
        expect(response).toEqual(newOrderData)
    })
});




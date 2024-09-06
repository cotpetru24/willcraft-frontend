import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { updateOrderThunk, getOrderThunk, createOrderThunk } from "./currentOrderSlice";
import * as currentOrderService from "./currentOrderService";

const mockStore = configureMockStore([thunk])
const mock = new MockAdapter(axios)


describe('currentOrderSlice', () => {
    let store;
    const mockUserId = '6691a1559949d9c888e2e850';
    const mockToken = 'mock_token';

    beforeEach(() => {
        store = mockStore({
            currentOrder: {
                orderId: '',
                userId: '',
                status: '',
                peopleAndRoles: [],
                assetsAndDistribution: [],
                isError: false,
                isSuccess: true,
                isLoading: false,
                message: ''
            },
            auth: {
                user: {
                    token: mockToken,
                    _id: mockUserId
                },
            },
        })
    }),
        afterEach(() => {
            mock.reset();
            store.clearActions();
        })


    test("calls the currentOrderService.getOrder to fetch the current order", async () => {
        const token = 'mock_token';
        const orderId = '66d252ed245514d47ddb7247';
        const currentOrder = {
            orderId: '66d252ed245514d47ddb7247',
            userId: '6691a1559949d9c888e2e850',
            status: 'complete',
            peopleAndRoles: [
                {
                    personId: {
                        _id: '66d252ec245514d47ddb7244',
                        title: 'Mr.',
                        fullLegalName: 'Demo Petru',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                        dob: '1999-01-01T00:00:00.000Z',
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-30T23:17:00.697Z',
                        updatedAt: '2024-08-30T23:17:33.766Z',
                        __v: 0,
                        hasChildrenStatus: 'yes',
                        maritalStatus: 'married'
                    },
                    role: [
                        'testator'
                    ],
                    _id: '66d252ed245514d47ddb7248'
                },
                {
                    personId: {
                        _id: '66d252fb245514d47ddb724b',
                        title: 'Mr.',
                        fullLegalName: 'Test Spouse',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                        dob: '1999-11-11T00:00:00.000Z',
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-30T23:17:15.043Z',
                        updatedAt: '2024-08-30T23:17:15.043Z',
                        __v: 0
                    },
                    role: [
                        'spouse',
                        'executor'
                    ],
                    _id: '66d252fb245514d47ddb7251'
                },
                {
                    personId: {
                        _id: '66d2530e245514d47ddb725f',
                        title: 'Mr.',
                        fullLegalName: 'Kid 1',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                        dob: '1999-11-11T00:00:00.000Z',
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-30T23:17:34.147Z',
                        updatedAt: '2024-08-30T23:17:34.147Z',
                        __v: 0
                    },
                    role: [
                        'kid',
                        'executor'
                    ],
                    _id: '66d2530e245514d47ddb7267'
                },
                {
                    personId: {
                        _id: '66d25332245514d47ddb7281',
                        title: 'Mr.',
                        fullLegalName: 'additional beneficiary 1',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                        dob: '1990-11-11T00:00:00.000Z',
                        email: '',
                        tel: '',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-30T23:18:10.048Z',
                        updatedAt: '2024-08-30T23:18:10.048Z',
                        __v: 0
                    },
                    role: [
                        'additional beneficiary',
                        'executor'
                    ],
                    _id: '66d25332245514d47ddb728c'
                }
            ],
            assetsAndDistribution: [
                {
                    assetId: {
                        _id: '66d25316245514d47ddb726e',
                        assetType: 'Bank Account',
                        bankName: 'HSBC',
                        userId: '6691a1559949d9c888e2e850',
                        createdAt: '2024-08-30T23:17:42.990Z',
                        updatedAt: '2024-08-30T23:17:42.990Z',
                        __v: 0
                    },
                    distribution: [
                        {
                            personId: {
                                _id: '66d252fb245514d47ddb724b',
                                title: 'Mr.',
                                fullLegalName: 'Test Spouse',
                                fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                                dob: '1999-11-11T00:00:00.000Z',
                                email: '',
                                tel: '',
                                userId: '6691a1559949d9c888e2e850',
                                createdAt: '2024-08-30T23:17:15.043Z',
                                updatedAt: '2024-08-30T23:17:15.043Z',
                                __v: 0
                            },
                            receivingAmount: '50',
                            _id: '66d25332245514d47ddb728e'
                        },
                        {
                            personId: {
                                _id: '66d2530e245514d47ddb725f',
                                title: 'Mr.',
                                fullLegalName: 'Kid 1',
                                fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                                dob: '1999-11-11T00:00:00.000Z',
                                email: '',
                                tel: '',
                                userId: '6691a1559949d9c888e2e850',
                                createdAt: '2024-08-30T23:17:34.147Z',
                                updatedAt: '2024-08-30T23:17:34.147Z',
                                __v: 0
                            },
                            receivingAmount: '40',
                            _id: '66d25332245514d47ddb728f'
                        },
                        {
                            personId: {
                                _id: '66d25332245514d47ddb7281',
                                title: 'Mr.',
                                fullLegalName: 'additional beneficiary 1',
                                fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                                dob: '1990-11-11T00:00:00.000Z',
                                email: '',
                                tel: '',
                                userId: '6691a1559949d9c888e2e850',
                                createdAt: '2024-08-30T23:18:10.048Z',
                                updatedAt: '2024-08-30T23:18:10.048Z',
                                __v: 0
                            },
                            receivingAmount: '10',
                            _id: '66d25332245514d47ddb7290'
                        }
                    ],
                    _id: '66d25332245514d47ddb728d'
                }
            ],
            isError: false,
            isSuccess: true,
            isLoading: false,
            message: ''
        };

        const getOrderSpy = jest.spyOn(currentOrderService, 'getOrder').mockResolvedValue(currentOrder);
        await store.dispatch(getOrderThunk(orderId));
        expect(getOrderSpy).toHaveBeenCalledWith(orderId, token);
    })


    test("calls the currentOrderService.updateOrder to update the order", async () => {
        const token = 'mock_token';
        const updatedOrder = {
            orderId: '66d252ed245514d47ddb7247',
            status: 'in-progress',
            peopleAndRoles: [
                {
                    personId: {
                        _id: '66d252ec245514d47ddb7244',
                        fullLegalName: 'Test Name',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                    },
                    role: ['testator']
                }
            ],
            assetsAndDistribution: [
                {
                    assetId: {
                        _id: '66d25316245514d47ddb726e',
                        assetType: 'Bank Account',
                        bankName: 'HSBC',
                    },
                    distribution: [
                        {
                            personId: {
                                _id: '66d252fb245514d47ddb724b',
                                fullLegalName: 'Test Spouse',
                                fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                            },
                            receivingAmount: '50',
                        }
                    ]
                }
            ]
        };

        const updateOrderSpy = jest.spyOn(currentOrderService, 'updateOrder').mockResolvedValue(updatedOrder);
        await store.dispatch(updateOrderThunk(updatedOrder));
        expect(updateOrderSpy).toHaveBeenCalledWith(updatedOrder, token);
    });


    test("calls the currentOrderService.createOrder to create an order", async () => {
        const token = 'mock_token';
        const newOrderData = {
            status: 'CreatingOrder',
            peopleAndRoles: [
                {
                    personId: {
                        _id: '66d252ec245514d47ddb7244',
                        fullLegalName: 'Test Name',
                        fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                    },
                    role: ['testator']
                }
            ],
            assetsAndDistribution: [
                {
                    assetId: {
                        _id: '66d25316245514d47ddb726e',
                        assetType: 'Bank Account',
                        bankName: 'HSBC',
                    },
                    distribution: [
                        {
                            personId: {
                                _id: '66d252fb245514d47ddb724b',
                                fullLegalName: 'Test Spouse',
                                fullAddress: '123 Buckingham Palace Rd, London SW1W 9SR, UK',
                            },
                            receivingAmount: '50',
                        }
                    ]
                }
            ]
        };

        const createdOrder = { ...newOrderData, orderId: '66d252ed245514d47ddb7247', userId: mockUserId };
        const createOrderSpy = jest.spyOn(currentOrderService, 'createOrder').mockResolvedValue(createdOrder);
        await store.dispatch(createOrderThunk(newOrderData));
        expect(createOrderSpy).toHaveBeenCalledWith({ ...newOrderData, userId: mockUserId }, token);
    });
})


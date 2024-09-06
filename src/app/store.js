import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { loadState, saveState } from '../utils/localStorageUtils';
import authReducer from '../features/auth/authSlice';
import currentOrderReducer from '../features/currentOrder/currentOrderSlice';
import ordersReducer from '../features/orders/ordersSlice';
import testatorReducer from '../features/people/testator/testatorSlice';
import spouseOrPartnerReducer from '../features/people/spouseOrPartner/spouseOrPartnerSlice';
import kidsReducer from '../features/people/kids/kidsSlice';
import assetsReducer from '../features/orderAssets/orderAssetsSlice';
import additionalBeneficiariesReducer from '../features/people/additionalBeneficiaries/additionalBeneficiariesSlice';
import additionalExecutorsReducer from '../features/people/additionalExecutors/additionalExecutorsSlice';
import orderCurrentStepReducer from '../features/orderSteps/orderCurrentStepSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  currentOrder: currentOrderReducer,
  currentOrderStep: orderCurrentStepReducer,
  testator: testatorReducer,
  spouseOrPartner: spouseOrPartnerReducer,
  kids: kidsReducer,
  assets: assetsReducer,
  additionalBeneficiaries: additionalBeneficiariesReducer,
  additionalExecutors: additionalExecutorsReducer,
});


// Load the state from localStorage
const preloadedState = {
  auth: loadState('auth'),
  orders: loadState('orders'),
  currentOrder: loadState('currentOrder'),
  currentOrderStep: loadState('currentOrderStep'),
  testator: loadState('testator'),
  spouseOrPartner: loadState('spouseOrPartner'),
  kids: loadState('kids'),
  additionalBeneficiaries: loadState('additionalBeneficiaries'),
  assets: loadState('assets'),
  additionalExecutors: loadState('additionalExecutors'),
};


export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});


store.subscribe(() => {
  saveState('auth', store.getState().auth);
  saveState('orders', store.getState().orders);
  saveState('currentOrder', store.getState().currentOrder);
  saveState('currentOrderStep', store.getState().currentOrderStep);
  saveState('testator', store.getState().testator);
  saveState('spouseOrPartner', store.getState().spouseOrPartner);
  saveState('kids', store.getState().kids);
  saveState('additionalBeneficiaries', store.getState().additionalBeneficiaries);
  saveState('assets', store.getState().assets);
  saveState('additionalExecutors', store.getState().additionalExecutors);
});


export default store;

import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'
// import { configureStore } from '@reduxjs/toolkit'

import { thunk } from 'redux-thunk'
import authReducer from './auth/reducer'
import categoriesReducer from './categories/reducer'
import categoryReducer from './category/reducer'
import talentsReducer from './talents/reducer'
import talentReducer from './talent/reducer'
import paymentsReducer from './payments/reducer'
import paymentReducer from './payment/reducer'
import eventsReducer from './events/reducer'
import listsReducer from './lists/reducer'
import organizersReducer from './organizers/reducer'
import ordersReducer from './orders/reducer'

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ? createStore() redux
const rootReducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  category: categoryReducer,
  talents: talentsReducer,
  talent: talentReducer,
  payments: paymentsReducer,
  payment: paymentReducer,
  events: eventsReducer,
  lists: listsReducer,
  organizers: organizersReducer,
  orders: ordersReducer,
})

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk)),
)

// ? configureStore() @reduxjs/toolkit
// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     categories: categoriesReducer,
//     category: categoryReducer,
//     talents: talentsReducer,
//     talent: talentReducer,
//     payments: paymentsReducer,
//     payment: paymentReducer,
//     events: eventsReducer,
//     lists: listsReducer,
//     organizers: organizersReducer,
//     orders: ordersReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//   devTools: true,
// })

export default store

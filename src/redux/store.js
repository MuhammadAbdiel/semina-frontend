import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'

import { thunk } from 'redux-thunk'
import authReducer from './auth/reducer'
import categoriesReducer from './categories/reducer'
import categoryReducer from './category/reducer'
import talentsReducer from './talents/reducer'
import talentReducer from './talent/reducer'
import paymentsReducer from './payments/reducer'
import paymentReducer from './payment/reducer'
// import eventsReducer from './events/reducer'
// import listsReducer from './lists/reducer'
// import ordersReducer from './orders/reducer'
// import notifReducer from './notif/reducer'

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  category: categoryReducer,
  talents: talentsReducer,
  talent: talentReducer,
  payments: paymentsReducer,
  payment: paymentReducer,
  // events: eventsReducer,
  // lists: listsReducer,
  // orders: ordersReducer,
  // notif: notifReducer,
})
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk)),
)

export default store

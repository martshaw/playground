import { combineReducers } from 'redux';
import { SELECT_HOTEL, INVALIDATE_HOTEL,  REQUEST_HOTELS, RECEIVE_HOTELS } from '../actions';

function selectedHotel(state = '274255', action) {
  switch (action.type) {
  case SELECT_HOTEL:
    return action.hotel
  default:
    return state
  }
}

function hotels(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_HOTEL:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_HOTELS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false
      })
    case RECEIVE_HOTELS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.hotelDetail,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function hotelsByhotel(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_HOTEL:
    case RECEIVE_HOTELS:
    case REQUEST_HOTELS:
      return Object.assign({}, state, {
        [action.hotel]: hotels(state[action.hotel], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  hotelsByhotel,
  selectedHotel
})

export default rootReducer
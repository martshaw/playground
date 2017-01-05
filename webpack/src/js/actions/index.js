import fetch from 'isomorphic-fetch';
export const INVALIDATE_HOTEL = 'INVALIDATE_HOTEL';
export const REQUEST_HOTELS = 'REQUEST_HOTELS';
export const RECEIVE_HOTELS = 'RECEIVE_HOTELS';
export const SELECT_HOTEL = 'SELECT_HOTEL';

function requestHotels(hotel) {
    return {
        type: REQUEST_HOTELS,
        hotel
    };
}

function receiveHotels(hotel, json) {
    return {
        type: RECEIVE_HOTELS,
        hotel,
        hotelDetail: json,
        receivedAt: Date.now()
    };
}

export function selectHotel(hotel) {
    return {
        type: SELECT_HOTEL,
        hotel
    };
}

export function invalidateHotel(hotel) {
    return {
        type: INVALIDATE_HOTEL,
        hotel
    };
}
function fetchHotels(hotel = '274255') {
    return dispatch => {
        dispatch(requestHotels(hotel));
        return fetch('https://web-static-product-a-dev-100.hrs-innolab.com/data/hotels.json')
         .then(res => res.json())
         .then(json => dispatch(receiveHotels(hotel, json)))
         .catch((error) => {
             console.error('error', error);
         });
    };
}
function shouldfetchHotels(state, hotel) {
    const hotelDetail = state.selectedHotel[hotel];
    if (!hotelDetail) {
        return true
    } else if (hotelDetail.isFetching) {
        return false
    } else {
        return hotelDetail.didInvalidate
    }
}

export function fetchHotelsIfNeeded(hotel = '274255') {
    return (dispatch, getState) => {
        if (shouldfetchHotels(getState(), hotel)) {
            return dispatch(fetchHotels(hotel));
        }
    };
}
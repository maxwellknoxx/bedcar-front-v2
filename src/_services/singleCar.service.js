import { handleResponse, requestOptions } from '@/_helpers';

export const singleCarService = {
    getPaidValues,
    findAll,
    findByPlate,
    checkIn,
    checkOut,
    registerPayment,
    update,
    count
};

function findAll() {
    return fetch(`${config.apiUrl}/api/v1/checkInOut/checksInOut`, requestOptions.get())
        .then(handleResponse);
}

function findByPlate(plate) {
    return fetch(`${config.apiUrl}/api/v1/checkInOut/findByPlate/${plate}`, requestOptions.get())
        .then(handleResponse);
}

function checkIn(checkin) {
    return fetch(`${config.apiUrl}/api/v1/checkInOut/checksIn`, requestOptions.post(checkin))
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function checkOut(checkout) {
    return fetch(`${config.apiUrl}/api/v1/checkInOut/checksOut`, requestOptions.post(checkout))
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function registerPayment(payment) {
    return fetch(`${config.apiUrl}/api/v1/checkInOut/payments`, requestOptions.post(payment))
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function update(checkInOut) {
    return fetch(`${config.apiUrl}/api/v1/checkInOut/checksInOut`, requestOptions.put(checkInOut))
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function count() {
    return fetch(`${config.apiUrl}/api/v1/checkInOut/totalCheckInOut`, requestOptions.get())
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function getPaidValues() {
    return fetch(`${config.apiUrl}/api/v1/checkInOut/paidValues`, requestOptions.get())
    .then(handleResponse)
    .then(response => {
        return response;
    })
}
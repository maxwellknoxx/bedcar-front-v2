import { url } from './config';
import { handleResponse, requestOptions } from '@/_helpers';

export const paymentService = {
    findAll,
    findPaymentByVehiclePlate,
    registerPayment,
    countByPaidValue
};

function registerPayment(payment) {
    return fetch(url + `v1/payment/payments`, requestOptions.post(payment))
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function findPaymentByVehiclePlate(plate) {
    return fetch(url + `v1/payment/findPaymentByVehiclePlate`, requestOptions.post(plate))
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function countByPaidValue(plan) {
    return fetch(url + `v1/payment/totalPayments/${plan}`, requestOptions.get())
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function findAll() {
    return fetch(url + `v1/payment/payments`, requestOptions.get())
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

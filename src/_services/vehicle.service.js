import { url } from './config';
import { requestOptions, handleResponse } from '@/_helpers';

export const vehicleService = {
    findAll,
    countByPlan,
    findVehicleByPlate,
    register,
    findById,
    update,
    deleteById
};

function findAll() {
    return fetch(url + `v1/vehicle/vehicles`, requestOptions.get())
        .then(handleResponse);
}

function countByPlan(plan) {
    return fetch(url + `v1/vehicle/TotalVehiclesByPlan/${plan}`, requestOptions.get())
        .then(handleResponse)
}

function register(entity) {
    return fetch(url + `v1/vehicle/vehicles`, requestOptions.post(entity))
        .then(handleResponse)
        .then(owner => {
            return owner;
        });
}

function findById(id) {
    return fetch(url + `v1/vehicle/vehicles/${id}`, requestOptions.get())
        .then(handleResponse);
}

function findVehicleByPlate(plate) {
    return fetch(url + `v1/vehicle/vehiclesByPlate/${plate}`, requestOptions.get())
        .then(handleResponse);
}

function update(entity) {
    return fetch(url + `v1/vehicle/vehicles`, requestOptions.put(entity))
        .then(handleResponse);
}

function deleteById(id) {
    return fetch(url + `v1/vehicle/vehicles/${id}`, requestOptions.delete())
        .then(handleResponse);
}


import { requestOptions, handleResponse } from '@/_helpers';
import { url } from './config'

export const spaceService = {
    findAll,
    findyByStatus
};

function findAll() {
    return fetch(url + `v1/space/spaces`, requestOptions.get())
        .then(handleResponse);
}

function findyByStatus(status) {
    return fetch(url + `v1/space/spacesBySatus/${status}`, requestOptions.get())
        .then(handleResponse);
}
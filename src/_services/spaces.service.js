import { handleResponse, requestOptions } from '@/_helpers';

export const spaceService = {
    findAll,
    findyByStatus
};

function findAll() {
    return fetch(`${config.apiUrl}/api/v1/space/spaces`, requestOptions.get())
        .then(handleResponse);
}

function findyByStatus(status) {
    return fetch(`${config.apiUrl}/api/v1/space/spacesBySatus/${status}`, requestOptions.get())
        .then(handleResponse);
}
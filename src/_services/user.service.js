import { requestOptions, handleResponse } from '@/_helpers';
import { url } from './config'

export const userService = {
    login,
    logout,
    findAll,
    findById,
    create,
    update,
    deleteUser
};

function login(username, password) {
    return fetch(url + `v1/auth/login`, requestOptions.post({ username, password }))
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.jwt.accessToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.jwt.accessToken));
                localStorage.setItem('userData', JSON.stringify(user.message));
            }

            return user;
        });
}

function create(userInformation) {
    return fetch(url + `v1/auth/signup`, requestOptions.post({ userInformation }))
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function findById(id) {
    return fetch(url + `v1/user/users/${id}`, requestOptions.get())
        .then(handleResponse);
}

function deleteUser(id) {
    return fetch(url + `v1/user/users/${id}`, requestOptions.delete())
        .then(handleResponse);
}

function findAll() {
    return fetch(url + `v1/user/users`, requestOptions.get())
        .then(handleResponse);
}

function update(user) {
    return fetch(url + `v1/user/users/`, requestOptions.put(user))
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('isLogged');

}
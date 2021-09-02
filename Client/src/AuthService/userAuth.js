import axios from './axiosInstance';

const USER_AUTH = {
    set: ({ token, userInfo }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    remove: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
    },
    get: () => ({
        token: localStorage.getItem('token'),
        userInfo: JSON.parse(localStorage.getItem('userInfo')),
    })
};

const login = function (username, password) {
    return axios.post('/users/login', { username, password }).catch(err => { return err; });
}

const validateUser = function (username) {
    return axios.post('/users/validateUser', { username }).catch(err => { return err });
}

const register = function (id, password) {
    return axios.post('/users/register', { id, password }).catch(err => { return err });
}

export default {
    USER_AUTH,
    login,
    validateUser,
    register
};
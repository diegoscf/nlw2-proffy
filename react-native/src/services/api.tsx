import axios from 'axios';

//IP do EXPO
const api = axios.create({
    baseURL: 'http://192.168.1.10:2301'
});

export default api;
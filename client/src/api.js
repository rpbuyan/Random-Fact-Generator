import axios from 'axios';

// We are using axios since it is promise-based and works well with async/await syntax
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

export const factsAPI = {
    getRandomFact: () => api.get('/facts/random'),
    getAllFacts: () => api.get('/facts'),
    getFactsByCategory: (category) => api.get(`/facts/category/${category}`),
    addFact: (fact) => api.post('/facts', factData),
};

export default api;
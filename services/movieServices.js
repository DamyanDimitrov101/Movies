import { request } from "./requestService.js";


const databaseURL = `https://testapp-c8731.firebaseio.com/`;
const api = {
    movies: `${databaseURL}movies.json`
}

export const getAllMovies = async (searchText) => {
    let res = await request(api.movies, 'GET');

    return Object.keys(res).map(key=> ({key, ...res[key]})).filter(x => !searchText || x.title == searchText);
}
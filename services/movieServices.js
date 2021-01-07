import { request } from "./requestService.js";


const databaseURL = `https://testapp-c8731.firebaseio.com/`;
const api = {
    movies: `${databaseURL}movies.json`
}

export const getAllMovies = async (searchText) => {
    let res = await request(api.movies, 'GET');

    return Object.keys(res).map(key=> ({key, ...res[key]})).filter(x => !searchText || x.title == searchText);
}

export const getOneMovie = async (id) => {
    let res = await request(`${databaseURL}movies/${id}.json`, 'GET');
    
    return res;
}

export const likeMovie = async (id, creator) => {
  
    let res = await request(`${databaseURL}/movies/${id}/likes.json`, 'POST', creator);

    return res;
}

export const editMovie = async (id,title,description,imageUrl) => {
  
    let res = await request(`${databaseURL}/movies/${id}.json`, 'PATCH', {title, description, imageUrl});

    return res;
}
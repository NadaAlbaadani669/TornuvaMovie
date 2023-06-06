import axios from 'axios';

const getMovies = async(pageNumber, searchValue, token)=>{
    const movies = await axios.get(`https://apisrv0001.tournamovie.com/movie/search?page=${pageNumber}&search=${searchValue}`,
    {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });

    return movies.data;
};

export default getMovies;
import axios from 'axios';

const getRandomMovie = async(token)=>{
    const movie = await axios.get(`https://apisrv0001.tournamovie.com/movie/random`,
    {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });

    return movie.data;
};

export default getRandomMovie;
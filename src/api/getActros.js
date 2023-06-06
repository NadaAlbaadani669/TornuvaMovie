import axios from 'axios';

const getActros = async(pageNumber, searchValue, token)=>{
    const actros = await axios.get(`https://apisrv0001.tournamovie.com/actor/search?page=${pageNumber}&search=${searchValue}`,
    {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });

    return actros.data;
};

export default getActros;
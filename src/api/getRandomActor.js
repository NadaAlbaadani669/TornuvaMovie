import axios from 'axios';

const getRandomActor = async(token)=>{
    const actor = await axios.get(`https://apisrv0001.tournamovie.com/actor/random`,
    {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });

    return actor.data;
};

export default getRandomActor;
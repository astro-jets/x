import useFetch from './hooks/useFetch';
import SingleSongPlayer from './components/SingleSongPlayer';
import { useParams } from 'react-router-dom';
import Loader from './components/Loader';

const Download = () => {
  const {id,playlist} = useParams();
  const url = playlist != 0 ? `getplaylist/${playlist}/${id}` : `singlesong/${id}`;
  const {data: music,isLoading,error} = useFetch(`https://studiox.onrender.com/api/${url}`);
  
  return(
    <div className="">
      {isLoading ? <Loader/> : music && <SingleSongPlayer music={music} />}
    </div>
  )
};

export default Download;
import useFetch from './hooks/useFetch';
import SingleSongPlayer from './components/SingleSongPlayer';
import { useParams } from 'react-router-dom';

const Download = () => {
  const {id,playlist} = useParams();
  const url = playlist != 0 ? `getplaylist/${playlist}/${id}` : `singlesong/${id}`;
  const {data: music,isLoading,error} = useFetch(`http://localhost:4000/${url}`);
  
  return(
    <div className="">
      {isLoading ? "Loading..." : music && <SingleSongPlayer music={music} />}
    </div>
  )
};

export default Download;
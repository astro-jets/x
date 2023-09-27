import Slider from './components/SmallMusicSlider';
import useFetch from './hooks/useFetch';

import Loader from './components/Loader'
import { useEffect, useRef } from 'react';

const Charts = () => {
  const {data: musicData,isLoading,error} = useFetch('http://localhost:4000/admin/getPlaylist/Rap');
  const audioElement = useRef(null)
  useEffect(()=>{
    audioElement.current =  document.createElement('audio');
    audioElement.current.id =  'mainAudio';
  },[]);
  return ( 
    <section className="col-12 mt-5 py-3">
      <h1 className="text-center">Music Charts</h1>
      {isLoading && <div className='text-primary'>Loading...</div>}
      {error && <p className='text-primary'>{error}</p>}

      {isLoading && audioElement? <Loader/> : (musicData && <Slider music={musicData} audioElement={audioElement} title={"Top 100 Songs"}/>)}
      {isLoading && audioElement ? <Loader/> : (musicData && <Slider music={musicData} audioElement={audioElement} title={"Top Dancehall Songs"}/>)}
    </section>
   );
}
 
export default Charts;
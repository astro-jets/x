import useFetchPost from './hooks/useFetchPost';
import Loader from './components/Loader';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from 'react-router-dom';
import ErrorComponent from './components/Error';

const Results = () => {
    const {search} = useParams();
  
    const {data:results,isLoading,error} = useFetchPost("http://localhost:4000/api/search/",search);
    return ( 
      <section className="col-12">
        <div className="album-details flex ac sa py-4">
          <div className="album-name text-center">
            <h1 className="text-light">Results</h1>
          </div>
        </div>
        <div className="container">
          <ul className="album-tracks col-12 p-0 py-3">
            {
              results.map((r) => (
                <li key={r.song._id} className="bg-secondary my-1 px-2 py-3 text-light text-start">
                  <Link to={`/song/0/${r.song._id}`}>
                    {r.song.title}
                    <span className="text-muted"> {r.artist+" "+r.song.featuring}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        {isLoading && <Loader/>}
        {!isLoading && error && <ErrorComponent error={error}/>}
        {!isLoading && !results.length ? <ErrorComponent err={{title:'Song not found!',message:`Couldnt find the song ${search}`}}/> : ''}
      </section>
    );
}
 
export default Results;
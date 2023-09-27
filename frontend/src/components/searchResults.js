import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SearchResults = ({results}) => {
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
              results.map((r,index) => (
                <li key={index} className="bg-secondary my-1 px-2 py-3 text-light text-start">
                  <Link to={`/song/0/${r.song._id}`}>
                    {r.song.title}
                    <span className="text-muted"> {r.artist+" "+r.song.featuring}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </section>
     );
}
 
export default SearchResults;
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Search = () => {
    const [search,setSearch] = useState("")
    const history = useHistory();

    const searchSong = (e) => {
      e.preventDefault()
      if (search.trim() !== '') {
        setSearch("")
        history.push(`/search/${search}`);
      }

    }
    return (         
      <div className="search-bar">
        <form>
          <input
            type="text"
            placeholder="search"
            name="search"
            className="search"
            id="search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          
          <button type="submit" className="btn off" onClick={searchSong}>
              <FontAwesomeIcon icon={faSearch} />
          </button>
          
        </form>
      </div>
     );
}
 
export default Search;
import { useState, useEffect } from 'react';

const useFetch = (url)=>{    
    const [data, setData] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(() => {
        const abortFetch = new AbortController();
        // Fetch music data from your backend API
        fetch(url, { signal: abortFetch.signal } )
        .then(res=>{if (!res.ok) {
            throw Error('Failed to fetch data');}
            return(res.json());
        })
        .then(data=>{
            setData(data);
            setIsLoading(false)
            setError(null)
        })
        .catch (err => {
            if(err.name === "AbortError"){console.log("Fetch Aborted")}
            else{
                setIsLoading(false);
                setError(err.message);
            }
        })
        return() =>{ abortFetch.abort();}
    }, [url]);

    return{data,isLoading,error};
}

export default(useFetch);
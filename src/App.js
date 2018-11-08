import React, { useState, useEffect } from 'react';
import Movie from './Movie';

const INITIAL_LIST = [
  {
    id: '0',
    title: 'Management Tutorial',
    url:
      'https://www.robinwieruch.de/react-rxjs-state-management-tutorial/',
  },
  {
    id: '1',
    title: 'A complete React with Apollo and GraphQL Tutorial',
    url: 'https://www.robinwieruch.de/react-graphql-apollo-tutorial',
  },
];

function useOffline() {
  const [isOffline, setIsOffline] = useState(false); // flase === online

  function onOffline() {
      alert('offline');
      setIsOffline(true);
  }

  function onOnline() {
      alert('online');
    setIsOffline(false);
  }

  useEffect(() => {
      window.addEventListener('offline', onOffline);
      window.addEventListener('online', onOnline);

      return () => {
          window.removeEventLister('offline', onOffline);
          window.removeEventLister('online', onOnline);
      };
  }, [])

  return isOffline;
}

function App() {
  const [list, setList] = useState(INITIAL_LIST);
  const [movies, setMovies] = useState(null);

  const [isOn, setIsOn] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
      let interval;
    console.log('useEffect runs: ' + isOn);
    if(isOn) {
        interval = setInterval(
            () => setTimer(timer => {console.log(timer); return timer + 1}), 
                1000
        );
    }
      return () => clearInterval(interval);
  }, [isOn] )

  const onReset = () => {
      setIsOn(false);
      setTimer(0);
  }

  /*
  useEffect(() => {
      let interval;
      console.log('effect runs');
      if(isOn) {
          interval = setInterval(() => console.log('tick'), 1000);
      }
      return () => clearInterval(interval);
  }, [isOn]);
  */

  const isOffline = useOffline();
  /*
  if(isOffline) {
      return <div>Sorry, offline</div>
  }
      return <div>online</div>
      */

  function onRemoveItem(id) {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  }

  async function getMovies() {
      const _movies = await callApi();
      console.log('get movies');
      console.log(_movies);
      setMovies(_movies);
  }

  function callApi() {
      console.log('call api');
      return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
      .then(response => response.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err))
  }

  return (
    <ul>
        {isOffline ?  <div>offline</div> : <div>online</div>}

      <div>
          timer count: {timer}
          { !isOn && <button type="button" onClick={() => setIsOn(true)}> Start </button> }
          { isOn && <button type="button" onClick={() => setIsOn(false)}> Stop </button> }
          <button type="button" disabled={timer === 0} onClick={onReset}> Reset </button>
      </div>

      {list.map(item => (
        <li key={item.id}>
          <a href={item.url}>{item.title}</a>
          <button type="button" onClick={() => onRemoveItem(item.id)}>
            Remove
          </button>
        </li>
      ))}
        <div>
          <button type="button" onClick={() => getMovies()}>
            Get
          </button>
       </div>
       {movies && movies.map(item => (
           <Movie 
               title={item.title_english}
               poster={item.medium_cover_image}
               genres={item.genres}
               synopsis={item.synopsis}
               key={item.id}
           />
       ))}

    </ul>
  );
}

export default App;

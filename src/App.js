import './index.scss';
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";
import React, {useState} from 'react';
import axios from 'axios';

function App() {
    const [movies, setMovies] = useState({
        s: "",
        result: [],
        selected: {}
    });
    const apiurl="http://www.omdbapi.com/?apikey=eb369dfa";

    const search = (e) => {
      if (e.key=== "Enter") {
          axios(apiurl + "&s=" +movies.s).then(({data}) => {
            let result= data.Search;

            setMovies(prevMovies =>{
                return {...prevMovies, result: result}
            })
          });
      }
    };

    const handleInput = (e) => {
        let s= e.target.value;
        e.preventDefault();

        setMovies(prevMovies => {
            return {...prevMovies, s: s}
        });
    }

    const openPopup = id => {
        axios(apiurl + "&i=" +id).then(({data}) => {
            let result = data;

            setMovies(prevMovies => {
                return {...prevMovies, selected:result}
            });

        })
    };

    const closePopup = () =>{
        setMovies(prevMovies => {
            return {...prevMovies, selected: {}}
        })
    }

    return (
        <div className="App">
            <header>
                <h1>Movies</h1>
            </header>
            <main>
                <Search handleInput={handleInput} search={search}/>
                <Results results={movies.result} openPopup={openPopup}/>

                {(typeof movies.selected.Title !="undefined") ?
                    <Popup selected={movies.selected} closePopup={closePopup}/> :
                    false
                }
            </main>
        </div>
    );
}

export default App;

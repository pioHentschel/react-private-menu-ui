import './App.css';
import './Nav_Bar.css';
import './Detail_Style.css';

import React, {useEffect, useState, createContext, useContext, ReactNode} from 'react';
import axios from 'axios';

import {BrowserRouter, Link, Outlet, Route, Routes, useNavigate, useLocation} from 'react-router-dom';

import {POPULAR_URL} from "./config";
import LanguageDropdown from './LangSwitcher';
import {translations} from "./locales"; // adding File for first localisation attempts, ending should in the future be changed accordingly, Ending value will be the same as for the fetch URL in order to simplify valiable usage. The endings should be made with the ISO-639:2023-11

// fetching the data with coresponding datatype
// title as string
// poster_path as string
// id as number
// release_date as string
// adult as boolean
// desription as string

interface Movie {
  adult: boolean;
  original_language: string;
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  original_title: string;
}

let lang = "en-US"; // change this value to switch between languages

function Home()
{
  // setting movies as an array of Movies
  const [movies, setMovies] = useState<Movie[]>([]);

  // API Key and Access Token from .env file
  const apikey = process.env.REACT_APP_API_KEY;
  const token = process.env.REACT_APP_ACCESS_TOKEN;

  // Using the imported URL from the language specific file
  const popular = POPULAR_URL;

  // Localised Strings, vars to be used int he code itself, contents found in the corresponding files
  const t = translations[lang];

  //Constant to pass information from Home() to Details()
  const navigate = useNavigate();

  const goToDetails = (items: Movie) => {
    navigate("/details", {
      state: { items }
      }
    );
  };

  // useEffect will run fecthData only once (because of the empty dependency) and give results for the "popular" api; Once the Variable "lang" is cha ges the use Effect notices and will run again updating the fetched files to the selected language
  useEffect(() => { fetchData(); }, [ lang ])

  const fetchData = () => {
    axios
        .get(`${popular}?language=${lang}`, {
          headers : { Authorization : `Bearer ${token}` }
          // Using axios to secure the token from being easily read when traffecing between the browser and the server
        })
        .then((response) => {
          // the "results" consant stores fetched data from the "popular" api, containing the currently, on TMDB, popular movies
          const results = response.data.results;
          setMovies(results);
          console.log(results)
        });
  };

  return (
    <div className="App" style={{ zIndex: 0 }}>
      {movies.map((items) => (  
        <div className="movieContainer" key={items.id}>
          <h2>{items.title}</h2>
          {items.poster_path && (
            <img src={`https://image.tmdb.org/t/p/w300${items.poster_path}`} alt={`${items.title} _Poster`} onClick={() => goToDetails(items)}/>
          )}
          {/* Thanks to the URL providing different Posters froo movies in different laguages, this URL does not need to be edited*/}
          <p>{t.RELEASE} {items.release_date}</p>
          {/* Conditional rendering for +18 warning
          Condition ? (true statement) : (false statement) */}
          {items.adult ? (
            <p>{t.MATURE_CONTENT}</p>
            ) : (
            <p>{t.NON_MATURE_CONTENT}</p>
            )}
          {/* <button onClick={() => goToDetails(items)}>{t.TEST_STRING}
          </button> */}
          <div className="description" onClick={() => goToDetails(items)}><h3>{items.title}</h3><p id="desc">{items.overview}</p></div>
        </div>
      ))}
    </div>
  );
}

function Details() {
  // Localised Strings, vars to be used in the code itself, contents found in the corresponding files
  const t = translations[lang];

  // Using the useLocation hook to get the id of Movies for the display of the details
  const location = useLocation();
  const items = location.state?.items;

  return (
    <>
      <div className="Detail_Content_Left">
        <div className="MoviePoster" key={items.id}>
            <img src={`https://image.tmdb.org/t/p/w342${items.poster_path}`} alt={`${items.title} _Poster`}/>
        </div>
      </div>
      <div className="Detail_Content_Right">
        <div className="Description">
          <h2>{items.title}</h2>
          <p>{items.overview}</p>
        </div>
        <div className="MiscMovieData">
          <p>{t.RELEASE} {items.release_date}</p>
          {items.adult ? (
            <p> {t.MATURE_CONTENT} </p>
            ) : (
            <p>{t.NON_MATURE_CONTENT} </p>
            )}
          <p>{t.O_TON} {items.original_language}</p>
          <p>{t.O_TITLE} {items.original_title}</p>
        </div>
      </div>
    </>
  );
}

function Navigation() {

  // Language Constants
  let [lang, setLang] = useState("en-US"); // change this value to switch between languages
  const [langLabel, setLangLabel] = useState("English 🇺🇸");
  const [message, setMessage] = useState("");
  const de = "de-DE";
  const en = "en-US";
  const sv = "sv-SE";

  // Localised Strings, vars to be used int he code itself, contents found in the corresponding files
  const t = translations[lang];

  const handleLanguageChange = (newLang: string, label: string) => {
    setLang(newLang);
    setLangLabel(label);
  };

  return (
    <header style={{ zIndex: 1 }}>
      <h1>The <span>Movie</span> Data Base</h1>
        <nav>
          <ol className="nav_list">
            {/* <li><a href="#">{t.POPULAR}</a></li>  Temporarily disabled, API calls currently only Popular movies, in future other calls will become avilable
            <li><a href="#">{t.TRENDING}</a></li>
            <li><a href="#">{t.ALL_MOVIES}</a></li> */}
            <li><Link to="/">{`Home`}</Link></li>
            <li><Link to="/details">{`Details Test`}</Link></li>
            <li><p>|</p></li>
            <li><LanguageDropdown onLanguageChange={handleLanguageChange} /></li>
          </ol>
        </nav>
    </header>
  )
}

// first bginnigns of a burger menu to simplefy nacigation overall
// function burgerMenu() {
//   <>
//     <div className="burger-menu">
//       <div className="burger-menu_line"></div>
//       <div className="burger-menu_line"></div>
//       <div className="burger-menu_line"></div>
//     </div>
//   </>
// }

export {Home};
export {Details};
export {Navigation};
// export {burgerMenu};
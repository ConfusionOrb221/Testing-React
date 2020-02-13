import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import { getData } from "../api";
import "./star-wars-characters.css";

export default function StarWarsCharacters() {
  const [url, setUrl] = useState("https://swapi.co/api/people");
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const getCharacters = async () => {
      const characters = await getData(url);
      console.log(characters);
      setNext(characters.next);
      setPrevious(characters.previous);
      setCharacters(characters.results);
      setIsLoading(false);
    };
    getCharacters();
  }, [url]);

  const goToNext = e => {
    e.preventDefault();
    setUrl(next);
  };

  const goToPrevious = e => {
    e.preventDefault();
    setUrl(previous);
  };

  return (
    <div>
      {isLoading ? (
        <Loader
          type="ThreeDots"
          color="#FFC402"
          height={30}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <>
          {characters.map(character => (
            <div key={character.url} data-testid="char">{character.name}</div>
          ))}
        </>
      )}
      <div className="buttons">
        <button onClick={goToPrevious} disabled={!previous} data-testid="prevButton">
          Previous
        </button>
        <button onClick={goToNext} disabled={!next} data-testid="nextButton">
          Next
        </button>
      </div>
    </div>
  );
}

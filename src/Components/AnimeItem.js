import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

function AnimeItem() {
  const { id } = useParams();

  //state
  const [anime, setAnime] = React.useState({});
  const [characters, setCharacters] = React.useState([]);
  const [showMore, setShowMore] = React.useState(false);

  //destructure anime
  const {
    title, synopsis,
    trailer, duration, aired,
    season, images, rank,
    score, scored_by, popularity,
    status, rating, source
  } = anime;

  //get anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
  };

  //get characters
  const getCharacters = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
    const data = await response.json();
    setCharacters(data.data);
    console.log(data.data);
  };

  //initial render
  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, [id]);

  return (
    <AnimeItemStyled>
      <h1>{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt={title} />
          </div>
          <div className="anime-details">
            <p><span>Aired:</span><span>{aired?.string}</span></p>
            <p><span>Rating:</span><span>{rating}</span></p>
            <p><span>Rank:</span><span>{rank}</span></p>
            <p><span>Score:</span><span>{score}</span></p>
            <p><span>Scored By:</span><span>{scored_by}</span></p>
            <p><span>Popularity:</span><span>{popularity}</span></p>
            <p><span>Status:</span><span>{status}</span></p>
            <p><span>Source:</span><span>{source}</span></p>
            <p><span>Season:</span><span>{season}</span></p>
            <p><span>Duration:</span><span>{duration}</span></p>
          </div>
        </div>
        <p className="description">
          {showMore ? synopsis : `${synopsis?.substring(0, 450)}...`}
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Read More'}
          </button>
        </p>
      </div>
      <h3 className="title">Trailer</h3>
      <div className="trailer-con">
        {trailer?.embed_url ?
          <iframe
            src={trailer?.embed_url}
            title="Inline Frame Example"
            width="800"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe> :
          <h3>Trailer not available</h3>
        }
      </div>
      <h3 className="title">Characters</h3>
      <div className="characters">
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <Link to={`/character/${mal_id}`} key={index}>
              <div className="character">
                <img src={images?.jpg.image_url} alt={name} />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </AnimeItemStyled>
  );
}

const AnimeItemStyled = styled.div`
  padding: 3rem 10rem;
  background-color: #021024;
  color: #fff;

  h1 {
    display: inline-block;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #A855F7, #27AE60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: skew(-3deg);
    }
  }

  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff; /* Mengubah warna font menjadi putih */
  }

  .description {
    margin-top: 2rem;
    color: #B0B0B0;
    line-height: 1.6rem;
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1rem;
      color: #27AE60;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;
    iframe {
      outline: none;
      border: 5px solid #e5e7eb;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: transparent;
    }

    h3 {
      color: #fff; /* Mengubah warna font menjadi putih */
      margin: 1rem 0;
    }
  }

  .details {
    background-color: #262626;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #e5e7eb;
    margin-top: 2rem;

    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      img {
        border-radius: 7px;
      }
    }

    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.8rem;

      p {
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
      }

      p span:first-child {
        font-weight: 600;
        color: #9CA3AF;
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 1.5rem;
    background-color: #262626;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #e5e7eb;
    margin-top: 2rem;

    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: #3A3A3A;
      transition: all 0.4s ease-in-out;

      img {
        width: 100%;
        border-radius: 7px;
      }

      h4 {
        padding: 0.5rem 0;
        color: #fff; /* Mengubah warna font menjadi putih */
        font-size: 1rem;
        text-align: center;
      }

      p {
        color: #fff; /* Mengubah warna font menjadi putih */
        font-size: 0.8rem;
        text-align: center;
      }

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

export default AnimeItem;

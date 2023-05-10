import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading'
import s from "./Detail.module.css"
import NavBar from '../NavBar/NavBar';


const Detail = () => {
  let { id } = useParams();
  const [game, setGame] = useState();
  console.log("🚀 ~ file: Detail.jsx:11 ~ Detail ~ game:", game)

  useEffect(() => {
    axios.get(`http://localhost:3001/videogame/${id}`)
      .then(result => setGame(result.data))
  }, [id]);

  return (
    <div className={s.container}>
      <NavBar />
      {
        game ?
          <div className={s.displayContainer}>
            <div className={s.cointainerImg}>
              <img src={game.img} alt="" className={s.imgDescription} />
            </div>
            <div className={s.containerDetail}>
              <h2>{game.name}</h2>
              <p>{game.description?.split("<p>")
                .join("\n")
                .split("<p>")
                .join(" ")
                .split("<br />")
                .join("\n")
                .split("</p>")
                .join(" ").substring(0, 1020)}
              </p>
              <div className={s.containerDetailInfo}>
                <p>Fecha de lanzamiento: <strong>{game.released}</strong></p>
                <p>Puntuacion: <strong>{game.rating}</strong></p>
              </div>
              <div className={s.containerInfo}>
                <p>Plataformas: {game.platforms.map((item,i)=>(<strong key={i}>{item},</strong>))}</p>
                <p>Generos: {game.genres.map((item,i)=>(<strong key={i}>{item},</strong>))}</p>
              </div>
            </div>
          </div> : <Loading />
      }
    </div>
  )

};

export default Detail;
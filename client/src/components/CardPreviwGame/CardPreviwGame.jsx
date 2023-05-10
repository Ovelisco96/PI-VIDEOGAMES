import { useSelector } from 'react-redux';
import s from './Card.module.css';
import { Link } from 'react-router-dom';

const CardPreviewGame = ({ game }) => {

  const { name, released, description, genres, platforms, img, rating, } = game
  return (
    <div className={s.container}>
      <div className={s.card}>
        <img className={s.img} src={img} alt={name} />
        <h2 className={s.name}>{name}</h2>
        <span className={s.rate}>⭐{rating}</span>
        <div className={s.genrebox}>
          {
            genres.length > 7 ?
              genres?.slice(0, 7).map((genre) => (<div><span className={s.genre}>{genre}</span></div>))
              : genres?.map((genre) => (<div><span className={s.genre}>{genre}</span></div>))
          }
        </div> 
      </div>
    </div>

  )
};

export default CardPreviewGame
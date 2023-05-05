import s from "./Home.module.css"
import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames } from "../../redux/actions";
import Card from "../Card/Card";
import { Paginacion } from "../Paginacion/Paginacion";
import Loading from "../Loading/Loading";
import Errors from "../Error/Error";
import Filter from "../Filter/Filter"
import Layout from "../Layout/Layout";

const Home = () => {
  //traer todos los videojuegos y generos
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.sortGames);
  const numPage = useSelector(state => state.numPage);
  const genres = useSelector(state => state.genres)
  const error = useSelector(state => state.error);

  useEffect(() => {
    if (!videogames.length) dispatch(getVideogames());
    if (!genres.length) dispatch(getGenres())
  }, [dispatch, videogames, genres]);

  //filtrado
  const [sort, setSort] = useState(true);

  //paginacion
  const [page, setPage] = useState(1);
  const [input, setInput] = useState(1);
  const [perPage] = useState(15);

  const max = videogames.length / perPage;
  console.log("🚀 ~ file: Home.jsx:35 ~ Home ~ videogames.length:", max)

  return (
    <>
      {
        videogames.length ?
          <>
            {/* {error && <Errors />} */}
            <Layout setInput={setInput} setPage={setPage} setSort={setSort} sort={sort}>
              <div className={s.containerHome}>

                <div className={s.grid}>

                  {
                    error === false ?
                      videogames?.slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                        .map((game, i) => {

                          return (
                            <Card
                              name={game.name}
                              img={game.img}
                              rate={game.rating}
                              genres={game.genres}
                              id={game.id}
                              key={game.id}
                            />
                          )
                        }) : <h2 className={s.error}>{error}</h2>
                  }

                </div>
                  {error === false ?<div className={s.paginado}>
                  <Paginacion input={input} setInput={setInput} page={page} setPage={setPage} max={max} />
                </div>:null}
                
                
              </div>
            </Layout>
          </> : <Loading />
      }
    </>
  )
};

export default Home;
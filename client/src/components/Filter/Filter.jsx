import s from "./Filter.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getByGenre, getDbGames, getVideogames, getVideogamesByAlp, getVideogamesByRate, resetFilters } from "../../redux/actions";

const Filter = ({ sort, setSort, setInput, setPage }) => {
  const dispatch = useDispatch();
  const genr = useSelector(state => state.genres)

  const handleRating = (e) => {
    dispatch(getVideogamesByRate(e.target.value))
    setSort(!sort)
  };

  const handleAlp = (e) => {
    dispatch(getVideogamesByAlp(e.target.value))
    setSort(!sort)
  };


  const handleGenres = (e) => {
    dispatch(getByGenre(e.target.value))
  };

  const handleCreated = (e) => {
    dispatch(getDbGames(e.target.value))
    setInput(1)
    setPage(1)
  };

  const handleReset = async () => {
    await dispatch(getVideogames())
    setInput(1)
    setPage(1)
  }

  return (
    <div className={s.container}>
      <div className={s.filters}>
        <h3 className={s.titl}>FILTERS</h3>
        <div className={s.alpgrid}>
          <h3 className={s.titl}>Name:</h3>
          {/*  <button className={s.button1} value="asc" onClick={handleAlp}>A-Z</button>
                    <button className={s.button2} value="desc"onClick={handleAlp}>Z-A</button> */}
          <select className={s.selectbox} name="Genres" id="Genres" onChange={handleAlp}>
            <option >---</option>
            <option value="asc">Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
        </div>
        <div className={s.alpgrid}>
          <h3 className={s.titl}>Rating:</h3>
          {/* <button  className={s.button1} value="higer" onClick={handleRating}>↑</button>
                    <button className={s.button2} value="lower" onClick={handleRating}>↓</button> */}
          <select className={s.selectbox} name="Genres" id="Genres" onChange={handleRating}>
            <option>---</option>
            <option value="higer">Ascendent</option>
            <option value="lower">Descendent</option>
          </select>
        </div>
        <div className={s.alpgrid}>
          <h3 className={s.titl}>Genres:</h3>
          <select className={s.selectbox} name="Genres" id="Genres" onChange={handleGenres}>
            <option>---</option>
            {genr?.map((gen, i) => <option key={i} value={gen.name}>{gen.name}</option>)}
          </select>
        </div>
        <div className={s.alpgrid}>
          <h3 className={s.titl}>Created vs API:</h3>
          <select className={s.selectbox} name="Genres" id="Genres" onChange={handleCreated}>
            <option>---</option>
             <option  value="api">Api</option>
             <option  value="db">Created</option>
          </select>
        </div>
        <div >
          <button className={s.button} onClick={handleReset}>RESET FILTERS</button>
        </div>
      </div>
    </div>
  )
};

export default Filter;
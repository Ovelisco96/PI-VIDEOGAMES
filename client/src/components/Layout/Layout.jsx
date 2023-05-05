import Filter from "../Filter/Filter"
import NavBar from "../NavBar/NavBar"
import s from "./Layout.module.css"


const Layout = (props) => {
  return (
    <>
      <NavBar setInput={props.setInput} setPage={props.setPage} />
      <div className={s.gridContainer}>
        <div className={s.sidebar}>
            <Filter sort={props.sort} setSort={props.setSort} setInput={props.setInput} setPage={props.setPage} />
        </div>
        {props.children}
      </div>
    </>
  )
}

export default Layout
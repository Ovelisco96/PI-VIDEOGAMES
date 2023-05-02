import s from "./NavBar.module.css"
import { Link } from "react-router-dom";
import Search from "../search/search";
import Logo from '../../assets/gamer.png'
import { BsPlus } from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';
import { getVideogames } from "../../redux/actions"
import { useDispatch } from "react-redux";


const NavBar = ({ setInput, setPage }) => {
    const dispatch = useDispatch();
    const handleHome = async () => {
        await dispatch(getVideogames())
        setInput(1)
        setPage(1)
    }
    return (
        <nav className={s.nav}>
            <div>
                <Link onClick={handleHome} className={s.logocont} style={{ textDecoration: 'none' }} to="/videogames">
                    <img className={s.logo} src={Logo} alt="logo" />
                </Link>
            </div>
            <div>
                <Search setInput={setInput} setPage={setPage} />
            </div>
            <div className={s.button_link}>
                <Link className={s.create} to="/form">
                    <HiHome size={"18px"} style={{ marginRight:"4px" }}/>Home
                </Link>
                <Link className={s.create} to="/form">
                    <BsPlus size={"25px"} style={{ fontWeight: "bold" }} />Add Game
                </Link>
            </div>
        </nav>
    )
};
export default NavBar;
import s from "./Landing.module.css"
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        
            <div className={s.landing}>
                <h2 className={s.title}>find the perfect game for every occasion!</h2>
                <Link to="/home">
                    <button className={s.button}>GET TO GAMES</button>
                </Link>
            </div>
       
    )
};

export default Landing;
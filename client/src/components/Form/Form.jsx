import s from "./Form.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { redirect } from 'react-router-dom'
import { createVideogame, getGenres, getPlatforms, getVideogames } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import CardPreviewGame from "../CardPreviwGame/CardPreviwGame";

const Form = () => {
    const dispatch = useDispatch();

    //trayendo Genres y platforms
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms); 

    useEffect(() => {
        if (!platforms.length) dispatch(getPlatforms())
        if (!genres.length) dispatch(getGenres())
    }, [])

    //formulario y errores
    const [error, setError] = useState({});
    const [game, setGame] = useState({
        name: "",
        released: "",
        description: "",
        genres: [],
        platforms: [],
        img: "",
        rating: 0,
    });

    useEffect(() => {
        console.log("game====", game);
        setError(validate(game))

    }, [game])


    const handleInput = (e) => {
        setGame({
            ...game,
            [e.target.name]: e.target.value,
        })
        setError(validate({
            ...game,
            [e.target.name]: e.target.value,
        }))
    };

    //añadir y eliminar platforms
    const handleSelectPlatform = (e) => {
        if (e.target.value !== "platforms" && !game.platforms.includes(e.target.value)) {
            setGame({
                ...game,
                platforms: [...game.platforms, e.target.value]
            })
        }
    };

    const handleDeletePlatform = (e) => {
        e.preventDefault();
        setGame({
            ...game,
            platforms: game.platforms.filter(plat => plat !== e.target.value)
        })
    }
    //añadir y eliminar genres
    const handleSelectGenre = (e) => {
        if (e.target.value !== "genres" && !game.genres.includes(e.target.value)) {
            setGame({
                ...game,
                genres: [...game.genres, e.target.value]
            });
        }
    };

    const handleDeleteGenre = (e) => {
        e.preventDefault();
        setGame({
            ...game,
            genres: game.genres.filter(genre => genre !== e.target.value)
        });
    };

    const validate = (form) => {
        const errors = {};
        if (form.name.length < 2) { errors.name = "Name must have at least 2 characters" };
        if (form.description.length < 15) { errors.description = "Description must have at least 15 characters" };
        if (form.rating < 0) { errors.rating = "Rating must be greater than 0" }
        if (isNaN(form.rating)) { errors.rating = "Rating must be a number" }
        if (form.genres.length < 1) { errors.genres = "The game must have at least one gender" }
        if (form.platforms.length < 1) { errors.platforms = "the game must have at least one platform" }
        return errors;
    };

    //Logica para postear el game
    const handleCreate = async (e) => {
        e.preventDefault()
        if (Object.values(error).length > 0) {
            return alert("Please verify that all fields are filled in correctly");
        } else {
            /* dispatch(createVideogame(game));
            window.location.reload(); */
            alert("Game Created!");
            /* redirect("/home")  */
        }
    };

    return (
        <div className={s.container}>
            <NavBar />

            <div className={s.formC}>
                <form className={s.form} onSubmit={handleCreate}>
                    <h2 className={s.name}>Create Videogame</h2>
                    <label><span className={s.title}>White the name of your game: </span></label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleInput}
                        autoComplete="off"
                    />
                    {error.name && <span className={s.error}>{error.name}</span>}
                    <label><span className={s.title}>write your game description: </span></label>
                    <input
                        type="text"
                        name="description"
                        onChange={handleInput}
                        autoComplete="off"
                    />
                    {error.description && <span>{error.description}</span>}
                    <label><span className={s.title}>Pick your game launch date: </span></label>
                    <input
                        type="date"
                        name="released"
                        onChange={handleInput}
                        autoComplete="off"
                    />
                    <label><span className={s.title}>Pick your game launch Rating: </span></label>
                    <input
                        type="range"
                        name="rating"
                        onChange={handleInput}
                        autoComplete="off"
                    />
                    {error.rating && <span>{error.rating}</span>}
                    <label><span className={s.title}>Insert your game image url: </span></label>
                    <input
                        type="text"
                        name="img"
                        onChange={handleInput}
                        autoComplete="off"
                    />
                    <label><span className={s.title}>Pick your game Platforms: </span></label>

                    <select name="platforms" onChange={handleSelectPlatform}>
                        <option value="platforms">Platforms</option>
                        {platforms?.map((pla, i) => { return (<option key={i}>{pla}</option>) })}
                    </select>
                    {error.platforms && <span>{error.platforms}</span>}
                    <div>
                        {
                            game.platforms?.map((plat, index) => {
                                return (
                                    <span key={index} >{plat}<button value={plat} onClick={handleDeletePlatform} >X</button></span>
                                )
                            })
                        }
                    </div>
                    <label><span className={s.title}>Pick your game genres: </span></label>

                    <select name="genres" onChange={handleSelectGenre}>
                        <option value="genres">genres</option>
                        {genres?.map((genre, i) => { return (<option key={i}>{genre.name}</option>) })}
                    </select>
                    {error.genres && <span>{error.genres}</span>}
                    <div>
                        {
                            game.genres?.map((genre, index) => {
                                return (
                                    <span key={index} >{genre}<button value={genre} onClick={handleDeleteGenre} >X</button></span>
                                )
                            })
                        }
                    </div>
                    <button className={s.buttonD} type="submit">CREATE</button>
                </form>
                <div className={s.preView_card}>
                    <CardPreviewGame game={game} />
                </div>
            </div>
        </div>
    )
};

export default Form;
import {
    GET_VIDEOGAMES,
    SEARCH,
    ERROR,
    CLOSE_ERROR,
    GET_BY_RATING,
    GET_BY_ALP,
    GET_GENRES,
    GET_BY_GENRE,
    GET_BY_DB,
    RESET_FILTERS,
    GET_PLATFORMS,
    CREATE_GAME,
    PREV_PAGE,
    NEXT_PAGE
    /*  GET_BY_RATE_P */
} from "./actions";

const initialState = {
    videoGames: [],
    sortGames: [],
    genres: [],
    platforms: [],
    error: false,
    errormsg: {},
    numPage: 1,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            const g = [...action.payload]
            return {
                ...state,
                videoGames: action.payload,
                sortGames: g
            };
        case GET_BY_RATING:
            const gamesSorted = action.payload === "higer"
                ? state.sortGames.sort((a, b) => b.rating - a.rating)
                : action.payload === "lower"
                    ? state.sortGames.sort((a, b) => a.rating - b.rating)
                    : [...state.sortGames];
            return {
                ...state,
                sortGames: gamesSorted
            };
        case GET_BY_ALP:
            const sortByAlp = action.payload === "asc"
                ? state.sortGames.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
                : action.payload === "desc"
                    ? state.sortGames.sort((a, b) => {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        return 0;
                    })
                    : [...state.sortGames];
            return {
                ...state,
                sortGames: sortByAlp
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS:
            let plat = []
            action.payload.map((item) => {
                item.platforms.map((item) => {
                    if (!plat.includes(item)) {
                        plat.push(item)
                    }

                })
            })
            return {
                ...state,
                platforms: plat
            };
        case GET_BY_GENRE:
            if (action.payload === "---") {
                return {
                    ...state,
                    sortGames: state.videoGames,
                    error: false
                }
            }
            let gamesFilt = state.sortGames.filter(game => game.genres.includes(action.payload));
            let err = !gamesFilt.length
            if (err) {
                return {
                    ...state,
                    sortGames: state.videoGames,
                    error: `no se encontro ningun juego con el genero ${action.payload}`
                }
            }
            return {
                ...state,
                sortGames: gamesFilt,
                error: false
            }
        case GET_BY_DB:
            const dbOApi = action.payload === "db"
                ? state.videoGames.filter(game => game.id.toString().includes("-"))
                : action.payload === "api"
                    ? state.videoGames.filter(game => !game.id.toString().includes("-"))
                    : [...state.videoGames];
            return {
                ...state,
                sortGames: dbOApi
            };
        case CREATE_GAME:
            if (action.payload.status === 200) {
                return {
                    ...state,
                    errormsg: {}
                }
            } else {
                return {
                    ...state,
                    errormsg: action.payload
                }
            }
        case SEARCH:
            return {
                ...state,
                sortGames: action.payload,
            };
        case RESET_FILTERS:
            const reset = state.videoGames;
            return {
                ...state,
                videoGames: state.videoGames,
                sortGames: reset
            };
        case CLOSE_ERROR:
            return {
                ...state,
                error: state.error === false ? false : false,
            }
        case ERROR:
            return {
                ...state,
                error: true,
            }
        case NEXT_PAGE:
            return {
                ...state,
                numPage: state.numPage + 1,
            };
        case PREV_PAGE:
            return {
                ...state,
                numPage: state.numPage - 1,
            };
        default:
            return {
                ...state,
            };
    };
};

export default rootReducer;
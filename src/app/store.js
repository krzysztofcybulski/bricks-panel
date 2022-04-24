import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const gameReducer = (state = {
    lobbies: null,
    game: null,
    pings: {},
    bots: []
}, action) => {
    switch (action.type) {
        case 'LOBBIES_LOADED':
            return {
                ...state,
                lobbies: action.lobbies
            };
        case 'LOADING_GAME':
            return {
                ...state,
                game: null
            };
        case 'GAME_LOADED':
            return {
                ...state,
                game: action.game
            };
        case 'BOTS_LOADED':
            return {
                ...state,
                bots: action.bots
            };
        case 'UPDATE_PINGS':
            return {
                ...state,
                pings: action.pings
            }
        default:
            return state;
    }
};

export const store = createStore(gameReducer, applyMiddleware(thunk));


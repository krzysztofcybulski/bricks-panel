import { NotificationManager } from 'react-notifications';
import { address } from './api';

export const loadLobbies = () => async (dispatch) => {
    const response = await fetch(`${address}/lobbies`);
    const lobbies = await response.json();
    await dispatch({
        type: 'LOBBIES_LOADED',
        lobbies: lobbies.map(lobby => ({
            ...lobby
        }))
    });
};

export const loadBotNames = () => async (dispatch) => {
    const response = await fetch(`${address}/bots`);
    const bots = await response.json();
    await dispatch({
        type: 'BOTS_LOADED',
        bots
    });
};

export const startTournament = ({ lobby, sizes, initTime, moveTime }) => async (dispatch) => {
    await fetch(`${address}/lobbies/${lobby}/tournaments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ sizes, initTime, moveTime })
    });
};

export const createNewLobby = () => async (dispatch) => {
    await fetch(`${address}/lobbies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const addBot = ({ lobby, name }) => async (dispatch) => {
    await fetch(`${address}/lobbies/${lobby}/bots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            name
        })
    });
};

export const loadGame = ({ id }) => async (dispatch) => {
    await dispatch({
        type: 'LOADING_GAME'
    });

    const response = await fetch(`${address}/games/${id}/events`);
    const events = await response.json();

    const {
        players: { first: { name: firstPlayer }, second: { name: secondPlayer } },
        size,
        initialBlocks
    } = events
        .find(e => e.type === 'GameStartedEvent')
        .rawPayload;

    const moves = events
        .filter(e => e.type === 'PlayerMovedEvent')
        .map(e => e.rawPayload)
        .map(e => ({
            player: e.player.name,
            blocks: e.brick.blocks
        }));

    const { result: { player: { name: winner } } } = events
        .find(e => e.type === 'GameEndedEvent')
        .rawPayload;

    await dispatch({
        type: 'GAME_LOADED',
        game: {
            id,
            firstPlayer,
            secondPlayer,
            size,
            initialBlocks,
            moves,
            winner
        }
    });
};

export const reportPings = ({ pings: { players } }) => {
    return ({
        type: 'UPDATE_PINGS',
        pings: players
    });
};

export const onMessage = ({ type, ...message }) => async (dispatch) => {
    if(type === 'GAME_ENDED') {
        await dispatch(loadLobbies());
        NotificationManager.info(`${message.gameId} game ended`);
    } if(type === 'PLAYER_JOINED') {
        await dispatch(loadLobbies());
        NotificationManager.info(`${message.player} joined`);
    } else if(type === 'PLAYER_LEFT') {
        await dispatch(loadLobbies());
        NotificationManager.info(`${message.player} left`);
    } else if(type === 'LOBBY_ADDED') {
        await dispatch(loadLobbies());
        NotificationManager.info(`${message.lobby} lobby added`);
    } else if(type === 'TOURNAMENT_STARTED') {
        await dispatch(loadLobbies());
        NotificationManager.info(`New tournament started`);
    } else if(type === 'TOURNAMENT_ENDED') {
        await dispatch(loadLobbies());
        NotificationManager.info(`Tournament ended`);
    }
    else if(type === 'REPORT_PING') {
        await dispatch(reportPings({ pings: message }));
    }
};

export const generateApiKey = async () => {
    const response = await fetch(`${address}/keys`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const { raw } = await response.json();
    NotificationManager.info("Generated new api key");
    return raw;
};

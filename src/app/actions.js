import { NotificationManager } from 'react-notifications';

const api = process.env.API || 'http://bricks-api.kcybulski.me';

export const loadLobbies = () => async (dispatch) => {
    const response = await fetch(api);
    const lobbies = await response.json();
    await dispatch({
        type: 'LOBBIES_LOADED',
        lobbies: lobbies.map(lobby => ({
            ...lobby
        }))
    });
};

export const loadBotNames = () => async (dispatch) => {
    const response = await fetch(`${api}/bots`);
    const bots = await response.json();
    await dispatch({
        type: 'BOTS_LOADED',
        bots
    });
};

export const startTournament = ({ lobby }) => async (dispatch) => {
    await fetch(`${api}/${lobby}/start`, {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sizes: [5, 10, 20],
            initTime: 1000,
            moveTime: 100
        })
    });
    await dispatch(loadLobbies());
    NotificationManager.info('New tournament started');
};

export const createNewLobby = () => async (dispatch) => {
    await fetch(api, { method: 'POST' });
    await dispatch(loadLobbies());
    NotificationManager.info('New lobby added');
};

export const addBot = ({ lobby, name }) => async (dispatch) => {
    await fetch(`${api}/${lobby}/bots`, {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    });
    await dispatch(loadLobbies());
    NotificationManager.info('Bot added to lobby');
};

export const loadGame = ({ id }) => async (dispatch) => {
    await dispatch({
        type: 'LOADING_GAME'
    });

    const response = await fetch(`${api}/games/${id}/events`);
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

    const { result: { player: { name: winner }}} = events
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

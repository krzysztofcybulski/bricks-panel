// const api = 'https://bricks-game.herokuapp.com';
const api = 'http://localhost:5050';

export const loadLobbies = () => async (dispatch) => {
    const response = await fetch(api);
    const lobbies = await response.json();
    await dispatch({
        type: 'LOBBIES_LOADED',
        lobbies
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
    dispatch(loadLobbies());
};

export const createNewLobby = () => async (dispatch) => {
    await fetch(api, { method: 'POST' });
    dispatch(loadLobbies());
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

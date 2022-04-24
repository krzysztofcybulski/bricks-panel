const address = `https://${process.env.REACT_APP_API}` || 'https://bricks-game.herokuapp.com';
const wsAddress = `wss://${process.env.REACT_APP_API}` || 'wss://bricks-game.herokuapp.com';

export { address, wsAddress };

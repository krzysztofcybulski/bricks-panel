const address = process.env.REACT_APP_API ? `https://${process.env.REACT_APP_API}` : 'http://localhost:5070';
const wsAddress = process.env.REACT_APP_API ? `wss://${process.env.REACT_APP_API}` : 'ws://localhost:5070';

export { address, wsAddress };

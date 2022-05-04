const address = process.env.REACT_APP_API ? `https://${process.env.REACT_APP_API}` : 'http://localhost:5050';
const wsAddress = process.env.REACT_APP_API ? `wss://${process.env.REACT_APP_API}` : 'ws://localhost:5050';

export { address, wsAddress };

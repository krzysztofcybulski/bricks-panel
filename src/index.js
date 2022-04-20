import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-notifications/lib/notifications.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Grommet } from 'grommet';
import App from './App';
import LobbiesView from './app/views/lobby/LobbiesView';
import GameView from './app/views/games/GameView';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Grommet plain>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App/>}>
                            <Route path="/" element={<LobbiesView/>}/>
                            <Route path="/games/:gameId" element={<GameView/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Grommet>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

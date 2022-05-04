import BackgroundView from './app/views/BackgroundView';
import { Outlet } from 'react-router-dom';
import MessageDispatcher from './app/views/MessageDispatcher';
import { Auth0Provider } from "@auth0/auth0-react";

const App = () =>
    <Auth0Provider
        domain="bricks-game.eu.auth0.com"
        clientId="Q7rI3YVzRN6MW7D3xGmLFufNxxXCUIkn"
        audience="https://bricks.kcybulski.me/"
        redirectUri={window.location.origin}
    >
        <BackgroundView>
            <MessageDispatcher>
                <Outlet/>
            </MessageDispatcher>
        </BackgroundView>
    </Auth0Provider>;

export default App;

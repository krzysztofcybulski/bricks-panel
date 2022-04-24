import BackgroundView from './app/views/BackgroundView';
import { Outlet } from 'react-router-dom';
import MessageDispatcher from './app/views/MessageDispatcher';

const App = () => <BackgroundView>
    <MessageDispatcher>
        <Outlet/>
    </MessageDispatcher>
</BackgroundView>;

export default App;

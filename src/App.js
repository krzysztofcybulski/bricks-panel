import BackgroundView from './app/views/BackgroundView';
import { Outlet } from 'react-router-dom';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';

const App = () => <BackgroundView>
    <NotificationContainer />
    <Outlet/>
</BackgroundView>;

export default App;

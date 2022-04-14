import BackgroundView from './app/views/BackgroundView';
import { Outlet } from 'react-router-dom';

const App = () => <BackgroundView>
    <Outlet/>
</BackgroundView>;

export default App;

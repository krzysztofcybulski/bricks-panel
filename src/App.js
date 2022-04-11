import BackgroundView from './app/views/BackgroundView';
import { Outlet } from 'react-router-dom';
import { Box } from 'grommet';

const App = () => <BackgroundView>
    <Outlet/>
</BackgroundView>;

export default App;

import { Box, Spinner } from 'grommet';
import LobbyCard from './LobbyCard';
import { useEffect } from 'react';
import { loadLobbies } from '../../actions';
import { connect } from 'react-redux';
import NewLobbyCard from './NewLobbyCard';


const LobbiesView = ({ loading, lobbies, loadLobbies }) => {

    useEffect(() => {
        const interval = setInterval(() => loadLobbies(), 1500);
        return () => clearInterval(interval);
    }, [loadLobbies]);

    if (loading) {
        return <Spinner alignSelf='center'/>;
    }

    return <Box direction="row" alignContent="center" wrap fill={true} pad="xlarge">
        {lobbies.map(lobby =>
            <Box key={lobby.name} width="30%" margin="1.66%" flex="shrink">
                <LobbyCard lobby={lobby}/>
            </Box>
        )}
        <Box margin="1%" width="30%" fill={false} flex="shrink">
            <NewLobbyCard/>
        </Box>
    </Box>;
};

export default connect(
    (state) => ({
        loading: !state.lobbies,
        lobbies: state.lobbies
    }),
    dispatch => ({
        loadLobbies: () => dispatch(loadLobbies())
    }))
(LobbiesView);

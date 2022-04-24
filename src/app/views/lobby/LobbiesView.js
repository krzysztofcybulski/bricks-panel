import { Box, Spinner } from 'grommet';
import LobbyCard from './LobbyCard';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NewLobbyCard from './NewLobbyCard';
import useWindowDimensions from '../useWindowDimensions';

const LobbiesView = ({ loading, lobbies }) => {

    const { width } = useWindowDimensions();
    const [columnWidth, setColumnWidth] = useState('30%');

    useEffect(() => {
        if (width < 1400) {
            setColumnWidth('50%');
        } else {
            setColumnWidth('33.33%');
        }
    }, [width]);

    if (loading) {
        return <Spinner alignSelf="center"/>;
    }

    return <Box direction="row" alignContent="center" wrap fill={true} pad="xlarge">
        {lobbies.map(lobby =>
            <Box key={lobby.name} width={columnWidth} pad="small" flex="shrink">
                <LobbyCard lobby={lobby}/>
            </Box>
        )}
        <Box pad="small" width={columnWidth} fill={false} flex="shrink">
            <NewLobbyCard/>
        </Box>
    </Box>;
};

export default connect(
    (state) => ({
        loading: !state.lobbies,
        lobbies: state.lobbies
    }))
(LobbiesView);

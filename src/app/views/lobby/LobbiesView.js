import { Box, Spinner } from 'grommet';
import LobbyCard from './LobbyCard';
import { useEffect, useState } from 'react';
import { loadBotNames, loadLobbies, reportPings } from '../../actions';
import { connect } from 'react-redux';
import NewLobbyCard from './NewLobbyCard';
import useWindowDimensions from '../useWindowDimensions';
import { wsAddress } from '../../api';

const ws = new WebSocket(`${wsAddress}/lobbies/updates`);

const LobbiesView = ({ loading, lobbies, loadLobbies, loadBots, reportPings }) => {

    const { width } = useWindowDimensions();
    const [columnWidth, setColumnWidth] = useState('30%');

    useEffect(() => {
        if(width < 1400) {
            setColumnWidth('50%');
        } else {
            setColumnWidth('33.33%');
        }
    }, [width]);

    useEffect(() => {
        const interval = setInterval(() => loadLobbies(), 3000);
        return () => clearInterval(interval);
    }, [loadLobbies]);

    useEffect(() => {
        loadBots();
    }, [loadBots]);

    useEffect(() => {
        ws.onmessage = event => {
            reportPings({ pings: JSON.parse(event.data) });
        };
        return () => ws.close();
    }, [reportPings]);

    if (loading) {
        return <Spinner alignSelf='center'/>;
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
    }),
    dispatch => ({
        loadLobbies: () => dispatch(loadLobbies()),
        loadBots: () => dispatch(loadBotNames()),
        reportPings: ({ pings }) => dispatch(reportPings({ pings }))
    }))
(LobbiesView);

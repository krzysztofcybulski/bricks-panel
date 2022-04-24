import { connect } from 'react-redux';
import { loadBotNames, loadLobbies, onMessage } from '../actions';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import { useEffect } from 'react';
import { wsAddress } from '../api';

const ws = new WebSocket(`${wsAddress}/lobbies/updates`);

const MessageDispatcher = ({ loadLobbies, loadBots, onMessage, children }) => {


    useEffect(() => {
        loadLobbies();
    }, [loadLobbies]);

    useEffect(() => {
        loadBots();
    }, [loadBots]);

    useEffect(() => {
        ws.onmessage = event => {
            onMessage(JSON.parse(event.data));
        };
        return () => ws.close();
    }, [onMessage]);

    return <>
        <NotificationContainer/>
        {children}
    </>;
};


export default connect(
    null,
    dispatch => ({
        loadLobbies: () => dispatch(loadLobbies()),
        loadBots: () => dispatch(loadBotNames()),
        onMessage: (message) => dispatch(onMessage(message))
    }))
(MessageDispatcher);

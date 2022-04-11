import { Accordion, AccordionPanel, Avatar, Box, Button, Card, CardBody, Paragraph, Spinner } from 'grommet';
import { Copy, Lock, Trophy } from 'grommet-icons';
import { connect } from 'react-redux';
import { loadLobbies, startTournament } from '../../actions';
import { useNavigate } from 'react-router-dom';

const PlayersList = ({ playerNames, winner }) => <Accordion animate>
    <AccordionPanel label="Players">
        {playerNames.map(player =>
            <Box key={player} align="center" justify="between" direction="row" gap="small">
                <Avatar align="center"
                        flex={false}
                        justify="center"
                        overflow="hidden"
                        round="full"
                        src={`https://identicon-api.herokuapp.com/${player}/64?format=png`}/>
                <Box align="center" justify="center" direction="row" gap="small">
                    <Paragraph>{player}</Paragraph>
                    {winner === player ? <Trophy/> : <></>}
                </Box>
            </Box>
        )}
    </AccordionPanel>
</Accordion>;

const GamesList = ({ games, goToGame }) => {
    const navigate = useNavigate();
    return <Accordion animate>
        <AccordionPanel label="Games">
            {games.map(({ id, players }) =>
                <Box key={id} align="center" justify="between" direction="row" gap="small">
                    <Paragraph>{players[0]} vs {players[1]}</Paragraph>
                    <Button label="Show" onClick={() => navigate(`games/${id}`)} plain/>
                </Box>
            )}
        </AccordionPanel>
    </Accordion>;
}

const LobbyCard = ({ lobby: { name, status, games, playerNames }, winner, startTournament }) =>
    <Card background={{ 'color': 'white' }} fill='horizontal' pad="medium" width="medium" align="stretch">
        <Box align="end" justify="center">
            {status !== 'OPEN' && <Lock/>}
        </Box>
        <CardBody pad="small" direction="column" align="stretch" gap="small">
            <Box align="center" justify="center">
                <Avatar align="center" flex={false} justify="center" overflow="hidden" round="full"
                        src={`https://identicon-api.herokuapp.com/${name}/64?format=png`}/>
            </Box>
            <Box align="center" justify="center" direction="row" gap="small">
                <Paragraph>{name}</Paragraph>
                <Copy onClick={() => navigator.clipboard.writeText(name)} cursor='pointer' />
            </Box>
            {playerNames.length > 0 && <PlayersList playerNames={playerNames} winner={winner} /> }
            {status === 'ENDED' && <GamesList games={games} /> }
            {status === 'IN_GAME' && <Spinner alignSelf='center' /> }
            {
                status === 'OPEN' &&
                playerNames.length >= 2 &&
                <Button label="Start" onClick={() => startTournament({ lobby: name })}/>
            }
            {
                status === 'OPEN' &&
                playerNames.length < 2 &&
                <Paragraph textAlign='center'>Waiting for players...</Paragraph>
            }
        </CardBody>
    </Card>;


export default connect(
    (state, props) => ({
        ...props
    }),
    dispatch => ({
        loadLobbies: () => dispatch(loadLobbies()),
        startTournament: ({ lobby }) => dispatch(startTournament({ lobby }))
    }))
(LobbyCard);

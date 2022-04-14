import {
    Accordion,
    AccordionPanel,
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    Paragraph,
    Select,
    Spinner,
    TextInput
} from 'grommet';
import { Copy, Lock, Trophy } from 'grommet-icons';
import { connect } from 'react-redux';
import { loadLobbies, startTournament } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PlayersList = ({ playerNames, points }) => <Accordion animate>
    <AccordionPanel label="Players">
        {playerNames.map(player =>
            <Box key={player} align="center" justify="between" direction="row" gap="small">
                <Avatar align="center"
                        flex={false}
                        justify="center"
                        overflow="hidden"
                        round="full"
                        src={`https://identicon-api.herokuapp.com/${player}/64?format=png`}/>
                <Box align="center" justify="between" direction="row" gap="small">
                    <Paragraph>{player}</Paragraph>
                    <Paragraph>{points[player]}</Paragraph>
                </Box>
            </Box>
        )}
    </AccordionPanel>
</Accordion>;

const GamesList = ({ games, goToGame }) => {
    const navigate = useNavigate();
    const [filteredGames, setFilteredGames] = useState(games);
    const [filter, setFilter] = useState('All players');
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if(filter === 'All players') {
            setFilteredGames(games);
        } else {
            setFilteredGames(games.filter(({ players }) => players.indexOf(filter) >= 0));
        }
    }, [filter, games]);

    useEffect(() => {
        setPlayers(['All players', ...new Set(games.flatMap(({ players }) => players))]);
    }, [games]);

    return <Accordion animate>
        <AccordionPanel label="Games">
            <Select
                options={players}
                value={filter}
                onChange={({ option }) => setFilter(option)}
            />
            <Box style={{ height: '320px', overflowY: 'scroll' }} pad='small'>
                {filteredGames.map(({ id, size, players, winner }) =>
                    <Box key={id} align="center" justify="between" direction="row" gap="small" style={{ minHeight: '45px'}} border={{ side: 'bottom' }}>
                        <Paragraph>
                            {winner === players[0] ? <b>{players[0]}</b> : players[0]}
                            &nbsp;vs&nbsp;
                            {winner === players[1] ? <b>{players[1]}</b> : players[1]} ({size}x{size})
                        </Paragraph>
                        <Button label="Show" onClick={() => navigate(`games/${id}`)} plain/>
                    </Box>
                )}
            </Box>
        </AccordionPanel>
    </Accordion>;
};

const LobbyCard = ({ lobby: { name, status, games, points, playerNames }, startTournament }) =>
    <Card background={{ 'color': 'white' }} fill="horizontal" pad="medium" width="medium" align="stretch">
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
                <Copy onClick={() => navigator.clipboard.writeText(name)} cursor="pointer"/>
            </Box>
            {playerNames.length > 0 && <PlayersList playerNames={playerNames} points={points}/>}
            {games.length > 0 && <GamesList games={games}/>}
            {status === 'IN_GAME' && <Spinner alignSelf="center"/>}
            {
                status === 'OPEN' &&
                playerNames.length >= 2 &&
                <Button label="Start" onClick={() => startTournament({ lobby: name })}/>
            }
            {
                status === 'OPEN' &&
                playerNames.length < 2 &&
                <Paragraph textAlign="center">Waiting for players...</Paragraph>
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

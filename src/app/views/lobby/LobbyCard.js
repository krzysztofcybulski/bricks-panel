import { Accordion, AccordionPanel, Avatar, Box, Button, Card, CardBody, Paragraph, Select, Spinner } from 'grommet';
import { Lock, Trophy } from 'grommet-icons';
import { connect } from 'react-redux';
import { loadLobbies, startTournament } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BotSelector from './BotSelector';
import textToColor from '../../textToColor';
import Copy from '../Copy';

const PlayersList = ({ playerNames, points, openPlayer }) => <Accordion animate>
    <AccordionPanel label="Players">
        {playerNames
            .sort((a, b) => points[b] - points[a])
            .map(player =>
                <Box key={player}
                     onClick={() => openPlayer(player)}
                     style={{ cursor: 'pointer' }}
                     align="center"
                     justify="between"
                     direction="row"
                     gap="small"
                     pad="small">
                    <Box direction="row" gap="small" align="center">
                        <Avatar align="center"
                                flex={false}
                                justify="center"
                                overflow="hidden"
                                round="full"
                                src={`https://identicon-api.herokuapp.com/${player.replaceAll(' ', '-')}/64?format=png`}/>
                        <Paragraph color={textToColor(player)}>{player}</Paragraph>
                    </Box>
                    <Paragraph>
                        {points[player] ? points[player] + ' points' : '⌛'}
                    </Paragraph>
                </Box>
            )}
    </AccordionPanel>
</Accordion>;

const PlayerInGame = ({ name, winner }) =>
    <Paragraph size="small" margin="none" style={{ whiteSpace: 'nowrap' }}>
        {winner === name ? <><b>{name}</b> <Trophy size="small"/></> : name}
    </Paragraph>;

const GamesList = ({ games, filter, setFilter }) => {
    const navigate = useNavigate();
    const [filteredGames, setFilteredGames] = useState(games);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if (filter === 'All players') {
            setFilteredGames(games);
        } else {
            setFilteredGames(games.filter(({ players }) => players.indexOf(filter) >= 0));
        }
    }, [filter, games]);

    useEffect(() => {
        setPlayers(['All players', ...new Set(games.flatMap(({ players }) => players))]);
    }, [games]);

    return <Accordion animate>
        <AccordionPanel label="Games" >
            <Select
                options={players}
                value={filter}
                onChange={({ option }) => setFilter(option)}
                margin={{ 'bottom': 'small' }}
            />
            <Box style={{ height: '320px', overflowY: 'scroll' }}>
                {filteredGames.map(({ id, size, players, winner }) =>
                    <Box key={id} align="center"
                         justify="between"
                         direction="row"
                         pad="small"
                         gap="small"
                         style={{ minHeight: '60px' }}
                         border={{ side: 'bottom' }}>
                        <Box direction="column">
                            <PlayerInGame name={players[0]} winner={winner}/>
                            <PlayerInGame name={players[1]} winner={winner}/>
                        </Box>
                        <Box direction="row" gap="small">
                            <Paragraph size="small" color="#d1d1d1">{size}x{size}</Paragraph>
                            <Button label="Show" onClick={() => navigate(`games/${id}`)} plain/>
                        </Box>
                    </Box>
                )}
            </Box>
        </AccordionPanel>
    </Accordion>;
};

const LobbyCard = ({ bots, lobby: { name, status, games, points, playerNames }, startTournament }) => {
    const [filter, setFilter] = useState('All players');
    return <Card background={{ 'color': 'white' }} fill="horizontal" pad="medium" width="medium" align="stretch">
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
                <Copy text={name} />
            </Box>
            {status === 'OPEN' && <BotSelector lobby={name}/>}
            {playerNames.length > 0 && <PlayersList playerNames={playerNames} points={points} openPlayer={setFilter}/>}
            {games.length > 0 && <GamesList games={games} filter={filter} setFilter={setFilter}/>}
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
};


export default connect(
    ({ bots }, props) => ({
        bots,
        ...props
    }),
    dispatch => ({
        loadLobbies: () => dispatch(loadLobbies()),
        startTournament: ({ lobby }) => dispatch(startTournament({ lobby }))
    }))
(LobbyCard);

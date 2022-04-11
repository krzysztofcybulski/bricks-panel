import { Avatar, Box, Card, CardHeader, Paragraph, RangeInput, Spinner } from 'grommet';
import { connect } from 'react-redux';
import { loadGame } from '../../actions';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CaretNext, CaretPrevious, Copy, PauseFill, PlayFill, Previous, Stop, Trophy } from 'grommet-icons';
import GameCanvas from './GameCanvas';
import textToColor from '../../textToColor';

const Player = ({ name, winner }) =>
    <Box align="center" justify="between" direction="column" gap="small">
        <Avatar align="center" flex={false} justify="center" overflow="hidden" round="full"
                src={`https://identicon-api.herokuapp.com/${name}/64?format=png`}/>
        <Box align="center" justify="center" direction="row" gap="small">
            <Paragraph color={textToColor(name)}>{name}</Paragraph>
            {winner === name && <Trophy/>}
        </Box>
    </Box>;

const GameView = ({ game, loading, loadGame }) => {

    const { gameId } = useParams();
    const navigate = useNavigate();
    const [time, setTime] = useState(0);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if(playing) {
                setTime(t => t + 1);
            }
        }, 100);
        return () => {
          clearInterval(interval);
        };
    }, [playing]);

    useEffect(() => {
        loadGame({ id: gameId });
    }, [gameId, loadGame]);

    if (loading) {
        return <Spinner alignSelf="center"/>;
    }

    return <Box justify="center" alignContent="center" height="100%">
        <Card background={{ 'color': 'white' }} pad="medium" width="medium" alignSelf="center">
            <CardHeader align="stretch" direction="column" flex={false} justify="between" gap="medium" pad="small">
                <Previous cursor="pointer" onClick={() => navigate('/')}/>
                <Box align="center" justify="between" direction="row">
                    <Paragraph size="small">{game.id}</Paragraph>
                    <Copy cursor="pointer" onClick={() => navigator.clipboard.writeText(game.id)}/>
                </Box>
                <Box direction="row" justify="between">
                    <Player name={game.firstPlayer} winner={game.winner}/>
                    <Player name={game.secondPlayer} winner={game.winner}/>
                </Box>
                <Box alignSelf="center">
                    <GameCanvas time={time}/>
                </Box>
                <RangeInput
                    value={time}
                    min={0}
                    max={game.moves.length}
                    onChange={event => {
                        setPlaying(false);
                        setTime(parseInt(event.target.value));
                    }}
                />
                <Box direction="row" justify="center">
                    <CaretPrevious cursor="pointer" onClick={() => setTime(time - 1)}/>
                    <Stop cursor="pointer" onClick={() => {
                        setTime(0);
                        setPlaying(false);
                    }}/>
                    {!playing && <PlayFill cursor="pointer" onClick={() => setPlaying(true)}/>}
                    {playing && <PauseFill cursor="pointer" onClick={() => setPlaying(false)}/>}
                    <CaretNext cursor="pointer" onClick={() => setTime(time + 1)}/>
                </Box>
            </CardHeader>
        </Card>
    </Box>;
};

export default connect(
    ({ game }) => ({
        game,
        loading: !game
    }),
    (dispatch, props) => ({
        loadGame: ({ id }) => dispatch(loadGame({ id }))
    }))
(GameView);

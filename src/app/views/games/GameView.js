import { Avatar, Box, Card, CardHeader, Paragraph, RangeInput, Spinner } from 'grommet';
import { connect } from 'react-redux';
import { loadGame } from '../../actions';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CaretNext, CaretPrevious, PauseFill, PlayFill, Previous, Stop, Trophy } from 'grommet-icons';
import GameCanvas from './GameCanvas';
import textToColor from '../../textToColor';
import GameExplainer from './GameExplainer';
import Copy from '../Copy';

const Player = ({ name, winner }) =>
    <Box align="center" direction="column" gap="small">
        <Avatar align="center"
                flex={false}
                justify="center"
                overflow="hidden"
                round="full"
                size="large"
                src={`https://identicon-api.herokuapp.com/${name.replaceAll(' ', '-')}/128?format=png`}/>
        <Box align="center" justify="start" >
            <Paragraph color={textToColor(name)} style={{ fontWeight: 600 }}>{name}</Paragraph>
            {winner === name && <Trophy/>}
        </Box>
    </Box>;

const GameView = ({ game, loading, loadGame }) => {

    const { gameId } = useParams();
    const navigate = useNavigate();
    const [time, setTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [currentBlock, setCurrentBlock] = useState();

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
        <Card background={{ 'color': 'white' }} pad="medium" width="large" alignSelf="center">
            <CardHeader align="stretch" direction="column" flex={false} justify="between" gap="medium" pad="small">
                <Box align="center" justify="between" direction="row">
                    <Previous cursor="pointer" onClick={() => navigate('/')}/>
                    <Paragraph size="small">{game.id}</Paragraph>
                    <Copy />
                </Box>
                <Box direction="row" justify="between">
                    <Player name={game.firstPlayer} winner={game.winner}/>
                    <Player name={game.secondPlayer} winner={game.winner}/>
                </Box>
                <Box alignSelf="center" align="center">
                    <GameCanvas time={time} onHover={setCurrentBlock} currentBlock={currentBlock}/>
                    <GameExplainer time={time} currentBlock={currentBlock} />
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

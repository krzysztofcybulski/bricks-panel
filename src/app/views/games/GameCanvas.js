import { connect } from 'react-redux';
import { Layer, Rect, Stage } from 'react-konva';
import textToColor from '../../textToColor';


const GameView = ({ blocks, size }) => {
    return <Stage width={size * 10} height={size * 10} backgroundColor="black">
        <Layer>
            <Rect x={0} y={0} height={size * 10} width={size * 10} fill="#ededed"/>
            {blocks.map(({ x, y, player }) => <Rect key={`${x}x${y}_${player}`}
                                                    x={x * 10}
                                                    y={y * 10}
                                                    height={10}
                                                    width={10}
                                                    stroke="grey"
                                                    strokeWidth={1}
                                                    fill={textToColor(player)}/>)}
        </Layer>
    </Stage>;
};

export default connect(
    ({ game: { size, initialBlocks, moves } }, { time }) => ({
        blocks: [
            ...initialBlocks
                .map(b => ({ ...b, player: '' })),
            ...moves
                .slice(0, time)
                .flatMap(m => m.blocks.map(b => ({ ...b, player: m.player })))
        ],
        size
    })
)
(GameView);

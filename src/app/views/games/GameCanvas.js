import { connect } from 'react-redux';
import { Layer, Rect, Stage } from 'react-konva';
import textToColor from '../../textToColor';


const GameCanvas = ({ blocks, size, onHover, currentBlock }) => {
    const tileSize = Math.min(500 / size, 28);
    return <Stage width={size * tileSize} height={size * tileSize} backgroundColor="black">
        <Layer>
            <Rect x={0} y={0} height={size * tileSize} width={size * tileSize} fill="#f2f2f2"/>
            {blocks.map(({ x, y, move, player }, i) =>
                <Rect key={`${x}x${y}_${i}_${player}`}
                      onMouseMove={e => {
                          const container = e.target.getStage().container();
                          container.style.cursor = "pointer";
                          onHover({ x, y, move, player });
                      }}
                      onMouseOut={e => {
                          const container = e.target.getStage().container();
                          container.style.cursor = "default";
                          onHover(null);
                      }}
                      x={x * tileSize}
                      y={y * tileSize}
                      height={tileSize}
                      width={tileSize}
                      stroke={(currentBlock && currentBlock.move === move) ? 'black' : '#c4c4c4'}
                      zIndex={(currentBlock && currentBlock.move === move) ? 1000 : 100}
                      strokeWidth={1}
                      fill={textToColor(player)}/>)}
        </Layer>
    </Stage>;
};

export default connect(
    ({ game: { size, initialBlocks, moves } }, { time, currentBlock }) => ({
        blocks: [
            ...initialBlocks
                .map(b => ({ ...b, move: 0, player: '' })),
            ...moves
                .slice(0, time)
                .flatMap((m, i) => m.blocks.map(b => ({ ...b, move: i + 1, player: m.player })))
        ],
        size,
        currentBlock
    })
)
(GameCanvas);

import { Paragraph } from 'grommet';

const infoToText = ({ currentBlock }) => {
    if (!currentBlock) return '🏗';
    if (currentBlock.move === 0) return 'Initial block';
    if (currentBlock.move > 0) return `Placed by ${currentBlock.player} in move ${currentBlock.move} 
    (x=${currentBlock.x}, y=${currentBlock.y})`;
};

const GameExplainer = ({ currentBlock }) =>
    <Paragraph size="medium" color="#4a4a4a">
        {infoToText({ currentBlock })}
    </Paragraph>;

export default GameExplainer;


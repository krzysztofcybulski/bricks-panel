import { Accordion, AccordionPanel, Box, Button, CheckBox, Paragraph, RangeInput, Select } from 'grommet';
import { connect } from 'react-redux';
import { startTournament } from '../../actions';
import { useState } from 'react';

const availableSizes = [5, 9, 12, 20, 32, 64];

const StartNewGame = ({ startTournament }) => {
    const [sizes, setSizes] = useState([5, 9, 12]);
    const [initTime, setInitTime] = useState(1000);
    const [moveTime, setMoveTime] = useState(300);

    return <Box gap="medium">
        <Accordion animate>
            <AccordionPanel label="Settings">
                <Box pad={{ left: 'small', right: 'small', bottom: 'small' }}>
                    <Select options={['Deathmatch']} value="Deathmatch"/>
                    <Paragraph>Map sizes</Paragraph>
                    <Box direction="row" wrap>
                        {availableSizes.map(size =>
                            <Box width="50%" margin={{ bottom: 'small' }} key={size}>
                                <CheckBox
                                    checked={sizes.indexOf(size) >= 0}
                                    label={`${size} x ${size}`}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            setSizes(sizes => [...sizes, size]);
                                        } else {
                                            setSizes(sizes => sizes.filter(s => s !== size));
                                        }
                                    }}
                                />
                            </Box>)}
                    </Box>
                    <Box direction="row" justify="between">
                        <Paragraph>Init time</Paragraph>
                        <Paragraph>{initTime}ms</Paragraph>
                    </Box>
                    <RangeInput
                        value={initTime} min={100} max={5000} step={100}
                        onChange={event => setInitTime(event.target.value)}
                    />
                    <Box direction="row" justify="between">
                        <Paragraph>Move time</Paragraph>
                        <Paragraph>{moveTime}ms</Paragraph>
                    </Box>
                    <RangeInput
                        value={moveTime} min={100} max={5000} step={100}
                        onChange={event => setMoveTime(event.target.value)}
                    />
                </Box>
            </AccordionPanel>
        </Accordion>
        <Button label="Start" onClick={() => startTournament({ sizes, initTime, moveTime })}/>
    </Box>;
};

export default connect(
    null,
    (dispatch, { lobby }) => ({
        startTournament: ({ sizes, initTime, moveTime }) =>
            dispatch(startTournament({ lobby, sizes, initTime, moveTime }))
    }))
(StartNewGame);

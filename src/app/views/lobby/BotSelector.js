import { Box, Button, Select } from 'grommet';
import { connect } from 'react-redux';
import { addBot } from '../../actions';
import { useEffect, useState } from 'react';

const BotSelector = ({ botNames, addBot }) => {
    const [bot, setBot] = useState();

    useEffect(() => {
        setBot(botNames[0]);
    }, [botNames]);

    return <Box direction="row" gap="medium">
        <Box flex={{ grow: 1, shrink: 1}}>
            <Select
                options={botNames}
                value={bot}
                onChange={({ option }) => setBot(option)}
            />
        </Box>
        <Box justify="center" flex="grow">
            <Button label="Add" onClick={() => addBot({ name: bot })} plain/>
        </Box>
    </Box>;
};

export default connect(
    ({ bots }) => ({
        botNames: bots.map(b => b.name)
    }),
    (dispatch, { lobby }) => ({
        addBot: ({ name }) => dispatch(addBot({ name, lobby }))
    }))
(BotSelector);

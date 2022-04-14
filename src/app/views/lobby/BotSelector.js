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
        <Select
            options={botNames}
            value={bot}
            onChange={({ option }) => setBot(option)}
        />
        <Button label="Add" onClick={() => addBot({ name: bot })} plain/>
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

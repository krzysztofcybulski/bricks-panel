import React from 'react';
import { Box } from 'grommet';
import LoginBar from "./LoginBar";

const BackgroundView = ({ children }) =>
    <Box
        background={{ 'image': 'url(\'https://blog.hdwallsource.com/wp-content/uploads/2014/11/gradient-26052-26737-hd-wallpapers.jpg.png\')' }}
        direction="column"
        flex={false}
        style={{ minHeight: '100vh' }}>
        < LoginBar/>
        <Box
            gap="medium"
            justify='center'>
            {children}
        </Box>
    </Box>;

export default BackgroundView;

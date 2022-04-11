import React from 'react';
import { Box } from 'grommet';

const BackgroundView = ({ children }) =>
    <Box
        background={{ 'image': 'url(\'https://blog.hdwallsource.com/wp-content/uploads/2014/11/gradient-26052-26737-hd-wallpapers.jpg.png\')' }}
        direction="column"
        flex={false}
        gap="medium"
        justify='center'
        style={{ minHeight: '100vh' }}>
        {children}
    </Box>;

export default BackgroundView;

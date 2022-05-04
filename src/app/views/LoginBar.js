import React, { useEffect, useState } from 'react';
import { Box, Button, Paragraph } from 'grommet';
import { useAuth0 } from "@auth0/auth0-react";
import { generateApiKey } from "../actions";
import Copy from "./Copy";
import { Close } from "grommet-icons";

const LoginBar = () => {
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [apiKey, setApiKey] = useState();

    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently({
                audience: 'https://bricks.kcybulski.me/',
            }).then(token => localStorage.setItem('token', token));
        } else {
            localStorage.removeItem('token');
        }

    }, [isAuthenticated, getAccessTokenSilently]);

    return <Box width='100%'
                pad="medium"
                background="white"
    >
        <Box
            direction="row"
            justify="between">
            <Box>
                {isAuthenticated && <Paragraph style={{ lineHeight: 0 }}>Hello {user.name}</Paragraph>}
                {!isAuthenticated && <Paragraph style={{ lineHeight: 0 }}/>}
            </Box>
            <Box>
                {!isAuthenticated && <Button primary onClick={loginWithRedirect} label="Login"/>}
                {isAuthenticated &&
                    <Box direction="row" gap="medium">
                        <Button primary onClick={() => generateApiKey().then(setApiKey)} label="Generate API key"/>
                        <Button onClick={logout} label="Logout"/>
                    </Box>
                }
            </Box>
        </Box>
        {apiKey &&
            <Box direction="row" justify="between" pad="medium" align="center">
                <Box/>
                <Box align="center">
                    <Box direction="row" align="center" gap="medium" pad="small"
                         border={{ side: "bottom", color: "grey", size: "1px" }}>
                        <Paragraph margin="none">{apiKey}</Paragraph>
                        <Copy text={apiKey}/>
                    </Box>
                    <Paragraph margin="none" textAlign="center" size="small" style={{ whiteSpace: "nowrap" }}>
                        Use API key to connect your algorithm with WebSocket
                    </Paragraph>
                </Box>
                <Close cursor="pointer" onClick={() => setApiKey(null)}/>
            </Box>
        }
    </Box>;
};

export default LoginBar;
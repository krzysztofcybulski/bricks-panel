import { Button, Card, CardBody } from 'grommet';
import { connect } from 'react-redux';
import { createNewLobby } from '../../actions';

const NewLobbyCard = ({ createNewLobby }) =>
    <Card background={{ 'color': 'white' }} fill="horizontal" pad="medium" width="medium" align="stretch">
        <CardBody pad="small" direction="column" align="stretch" gap="small">
            <Button label="Add new lobby" onClick={createNewLobby}/>
        </CardBody>
    </Card>;


export default connect(
    null,
    dispatch => ({
        createNewLobby: () => dispatch(createNewLobby())
    }))
(NewLobbyCard);

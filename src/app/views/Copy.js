import { NotificationManager } from 'react-notifications';
import { Copy } from 'grommet-icons';

const CopyComponent = ({ text }) =>
    <Copy cursor="pointer" onClick={() => {
        navigator.clipboard.writeText(text);
        NotificationManager.info('Copied successfully');
    }}/>;

export default CopyComponent;

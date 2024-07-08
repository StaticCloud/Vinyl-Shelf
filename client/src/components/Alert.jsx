import { AlertWrapper, AlertContent } from './styled-alert';

const Alert = ({ text }) => {
    return (
        <AlertWrapper>
            <AlertContent>
                <p>{text}</p>
            </AlertContent>
        </AlertWrapper>
    );
}

export default Alert;
import { AlertWrapper, AlertContent } from './styled-alert';

export const Alert = ({ text }) => {
    return (
        <AlertWrapper>
            <AlertContent>
                <p>{text}</p>
            </AlertContent>
        </AlertWrapper>
    );
}
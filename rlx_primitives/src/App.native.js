import styled from 'styled-components';
import { Platform, KeyboardAvoidingView } from 'react-native';

export default styled(KeyboardAvoidingView).attrs({
    name: 'App',
    behavior: Platform.OS === 'ios' ? 'padding' : 'height'
})`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.95);
    color: white;
    height: 100%;
    flex-direction: column;
    align-items: ${props => (props.theme.mobile ? 'stretch' : 'flex-start')};
    font-family: Arial;
`;

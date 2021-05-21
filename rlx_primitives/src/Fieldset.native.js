import styled from 'styled-components';
import { ScrollView } from 'react-native';
// export default styled.View.attrs({ name: 'fieldset', overflow: 'scroll' })`
//     padding: 6px;
//     margin: 4px 8px 4px 8px;
//     border-radius: 2px;
//     border: none;
//     background-color: rgba(255, 255, 255, 0.05);
//     flex-grow: 1;
// `;

export default styled(ScrollView).attrs({ name: 'fieldset' })`
    padding: 6px;
    margin: 4px 8px 4px 8px;
    border-radius: 2px;
    border: none;
    background-color: rgba(255, 255, 255, 0.05);
    /* flex-grow: 1; */
`;

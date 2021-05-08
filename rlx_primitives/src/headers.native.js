import styled from 'styled-components';
import Text from './Text';
/*
h1 is   32px   (2em)
h2 is   24px (1.5em)
h3 is 20.8px (1.3em)
h4 is   16px   (1em)
h5 is 12.8px (0.8em)
h6 is 11.2px (0.7em)
*/

export const h1 = styled(Text).attrs({ name: 'h1' })`
    font-size: 32px;
`;
export const h2 = styled(Text).attrs({ name: 'h2' })`
    font-size: 24px;
`;
export const h3 = styled(Text).attrs({ name: 'h3' })`
    font-size: 20.8px;
`;
export const h4 = styled(Text).attrs({ name: 'h4' })`
    font-size: 16px;
`;
export const h5 = styled(Text).attrs({ name: 'h5' })`
    font-size: 12.8px;
`;
export const h6 = styled(Text).attrs({ name: 'h6' })`
    font-size: 11.2px;
`;

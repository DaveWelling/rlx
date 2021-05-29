import styled, { ThemeContext } from 'styled-components';
import { createElement, useContext } from 'react';
import useActiveRecord from '../../hooks/useActiveRecord';
import { View } from 'rlx_primitives';
import StyledSummaryDetail from './StyledSummaryDetail';

// TODO: Extract this as part of theming.
const MOBILE_BREAKPOINT = 479;

const rc = createElement;
// TODO: Handle small screen sizes - how to measure consistently
// between RN and web?

const DetailOnly = styled(View).attrs({ name: 'DetailOnly' })`
    background-color: ${({ theme }) => theme.backgroundColor};
    display: flex;
    margin: 8px;
    flex-direction: row;
    flex-grow: 1;
    border: none;
`;

const SummaryOnly = styled(View).attrs({ name: 'SummaryOnly' })`
    background-color: ${({ theme }) => theme.backgroundColor};
    display: flex;
    margin: 8px;
    flex-direction: row;
    flex-grow: 1;
    min-width: 300px;
    border: none;
`;

export default function SummaryDetail({ children }) {
    if (children.length !== 2) {
        throw new Error(
            'SummaryDetail component requires exactly two children.  The first should be a grid (summary) or similar and the second should be a form (detail) or similar.'
        );
    }
    const activeRecord = useActiveRecord();
    const theme = useContext(ThemeContext);
    if (activeRecord.record == null) {
        return rc(SummaryOnly, { name: 'summary-only' }, children[0]);
    }

    if (theme.mobile) {
        return rc(DetailOnly, null, children[1]);
    } else {
        return rc(
            StyledSummaryDetail,
            { name: 'summary-detail', gutterSize: 5, sizes: [25, 75] },
            children
        );
    }
}

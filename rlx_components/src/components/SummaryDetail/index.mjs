import styled from 'styled-components';
import { createElement } from 'react';
import useActiveRecord from '../../hooks/useActiveRecord.mjs';
import useWindowDimensions from '../../utilities/useWindowDimensions.mjs';
import { View } from '../primitives.mjs';
import StyledSummaryDetail from './StyledSummaryDetail.mjs';

// TODO: Extract this as part of theming.
const MOBILE_BREAKPOINT = 479;

const rc = createElement;
// TODO: Handle small screen sizes - how to measure consistently
// between RN and web?

const DetailOnly = styled(View).attrs({ name: 'DetailOnly' })`
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    margin: 8px;
    flex-direction: row;
    flex-grow: 1;
    border: 4px solid rgba(255, 255, 255, 0.075);
`;

const SummaryOnly = styled(View).attrs({ name: 'SummaryOnly' })`
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    margin: 8px;
    flex-direction: row;
    flex-grow: 1;
    min-width: 300px;
    border: 4px solid rgba(255, 255, 255, 0.075);
`;

export default function SummaryDetail({ children }) {
    if (children.length !== 2) {
        throw new Error(
            'SummaryDetail component requires exactly two children.  The first should be a grid (summary) or similar and the second should be a form (detail) or similar.'
        );
    }
    const activeRecord = useActiveRecord();
    const dimensions = useWindowDimensions();
    if (activeRecord.record == null) {
        return rc(SummaryOnly, { name: 'summary-only' }, children[0]);
    }

    if (dimensions.width < MOBILE_BREAKPOINT || dimensions.height < MOBILE_BREAKPOINT) {
        return rc(DetailOnly, null, children[1]);
    } else {
        return rc(
            StyledSummaryDetail,
            { name: 'summary-detail', gutterSize: 5, sizes: [25, 75] },
            children
        );
    }
}

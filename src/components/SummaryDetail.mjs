import Split from 'react-split';
import styled from 'styled-components';
import { createElement, useContext } from 'react';
import EventBoundary from '../contexts/EventBoundary.mjs';

const rc = createElement;

const SummaryDetail = styled(Split)`
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: row;
    .gutter {
        background-color: rgba(255, 255, 255, 0.2);
        border-style: solid;
        border-width: thin;
        border-color: black;
        border-top: none;
        border-bottom: none;
        cursor: ew-resize;
    }
`;
export default ({ children, recordType }) => {
    // prettier-ignore
    return rc(EventBoundary.Provider, {recordType},
        rc(SummaryDetail, { gutterSize: 5, sizes: [25, 75] }, children)
    );
};

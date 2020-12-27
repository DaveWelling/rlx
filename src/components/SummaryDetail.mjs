import Split from 'react-split';
import styled from 'styled-components';
import { createElement } from 'react';
import useActiveRecord from '../hooks/useActiveRecord.mjs';

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

const SummaryOnly = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: row;
`;

export default ({ children }) => {
    if (children.length !== 2) {
        throw new Error(
            'SummaryDetail component requires exactly two children.  The first should be a grid (summary) or similar and the second should be a form (detail) or similar.'
        );
    }
    const activeRecord = useActiveRecord();
    if (activeRecord.initialRecord == null) {
        return rc(SummaryOnly, null, children[0]);
    }
    return rc(SummaryDetail, { gutterSize: 5, sizes: [25, 75] }, children);
};

import Split from 'react-split';
import styled from 'styled-components';
import { createElement } from 'react';
import useActiveRecord from '../hooks/useActiveRecord.mjs';
import { View } from './primitives.mjs';

const rc = createElement;
// TODO: Handle small screen sizes - how to measure consistently
// between RN and web?

// TODO:  This Split is not going to work in React Native
// There is also not a good replacement.  We aren't
// really using RN for tablet stuff though, so maybe not
// a big deal.
const StyledSummaryDetail = styled(Split)`
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    margin: 8px;
    flex-direction: row;
    flex-grow: 1;

    .gutter.gutter-vertical {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
        cursor: ns-resize;
    }

    .gutter.gutter-horizontal {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
        cursor: ew-resize;
    }
    .gutter {
        background-repeat: no-repeat;
        background-position: 50%;
        background-color: rgba(255, 255, 255, 0.2);
        border-style: solid;
        border-width: thin;
        border-color: black;
        border-top: none;
        border-bottom: none;
    }
    border: 4px solid rgba(255, 255, 255, 0.075);
`;

const SummaryOnly = styled(View)`
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
    if (activeRecord.record == null) {
        return rc(SummaryOnly, { name: 'summary-only' }, children[0]);
    }
    return rc(
        StyledSummaryDetail,
        { name: 'summary-detail', gutterSize: 5, sizes: [25, 75] },
        children
    );
}

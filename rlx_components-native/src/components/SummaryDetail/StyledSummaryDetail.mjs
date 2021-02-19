import Split from 'react-split';
import styled from 'styled-components';

// TODO:  This Split is not going to work in React Native
// There is also not a good replacement.  We aren't
// really using RN for tablet stuff though, so maybe not
// a big deal.
export default styled(Split).attrs({ name: 'StyledSummaryDetail' })`
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

import React from 'react';
import styled from 'styled-components';
const rc = React.createElement;

const Grid = styled.div`
    background-color: black;
    padding-top: 2px;
    padding-bottom: 2px;
    border: solid thin rgba(255, 255, 255, 0.1);
`;
const Row = styled.p`
    margin: 2px;
    border: solid thin black;
    padding: 2px;
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    cursor: pointer;
`;

// prettier-ignore
export default ({ data, onClick }) =>
    rc(Grid, null,
        data.map((w) =>rc(Row, { id: w._id, onClick }, w.title)
    )
);

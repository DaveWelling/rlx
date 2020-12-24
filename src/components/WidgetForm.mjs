import styled from 'styled-components';
import React from 'react';
const rc = React.createElement;

const Form = styled.form`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 4px;
    border-radius: 2px;
    height: 100%;
`;

// prettier-ignore
export default ()=>rc(Form, null,
    rc('div', null, 'Widget Form'),
    rc('label', null,
        rc('input', { type: 'textbox' })
    )
);

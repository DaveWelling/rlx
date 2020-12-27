import { createElement, createContext } from 'react';
import useFormMachine from '../hooks/useFormMachine.mjs';
import styled from 'styled-components';
const rc = createElement;

export const FormContext = createContext();

const Form = styled.form`
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

const FormBody = styled.fieldset`
    padding: 6px;
    margin: 3px;
    border-radius: 2px;
    border: none;
    background-color: rgba(255, 255, 255, 0.05);
    flex-grow: 1;
`;

const Title = styled.h3`
    padding: 6px;
`;

export default ({ children, title, actionButtons }) => {
    const context = useFormMachine();
    // prettier-ignore
    return rc(FormContext.Provider, { value: context },
        rc(Form, null,
            rc(Title, null, title),
            rc(FormBody, null, children),
            rc('div', null,
                actionButtons
            )
        )
    );
};

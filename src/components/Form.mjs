import { createElement, createContext } from 'react';
import useActiveRecord from '../hooks/useActiveRecord.mjs';
import styled from 'styled-components';
const rc = createElement;

export const FormContext = createContext();

const Form = styled.form`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 4px;
    border-radius: 2px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const FormBody = styled.fieldset`
    padding: 6px;
    border-radius: 2px;
    border: thin solid rgba(255, 255, 255, 0.1);
    flex-grow: 1;
`;

export default ({ children, title, actionButtons }) => {
    const activeRecord = useActiveRecord();
    const context = {
        disabled: false,
        activeRecord,
    };
    // prettier-ignore
    return rc(FormContext.Provider, { value: context },
        rc(Form, null,
            rc('h3', null, title),
            rc(FormBody, null, children),
            rc('div', null,
                actionButtons
            )
        )
    );
};

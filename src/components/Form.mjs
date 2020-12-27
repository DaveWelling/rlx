import { createElement, createContext } from 'react';
import useFormMachine from '../hooks/useFormMachine.mjs';
import styled from 'styled-components';
import ActionButton from './ActionButton.mjs';
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

export default ({ children, title }) => {
    const context = useFormMachine();
    const { isDirty } = context;
    // prettier-ignore
    return rc(FormContext.Provider, { value: context },
        rc(Form, null,
            rc(Title, null, title),
            rc(FormBody, null, children),
            rc('div', null,
                rc(ActionButton, { key: 'widget-form-cancel', title: 'Cancel', actionType: 'cancel'}),
                rc(ActionButton, { disabled: !isDirty, key: 'widget-form-submit', title: 'Save', actionType: 'submit'})
            )
        )
    );
};

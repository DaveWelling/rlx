import { createElement, createContext } from 'react';
import useFormMachine from '../hooks/useFormMachine.mjs';
import styled from 'styled-components';
import ActionButton from './ActionButton.mjs';
const rc = createElement;

export const FormContext = createContext();

const StyledForm = styled.form`
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

const FormBody = styled.fieldset`
    padding: 6px;
    margin: 4px 8px 4px 8px;
    border-radius: 2px;
    border: none;
    background-color: rgba(255, 255, 255, 0.05);
    flex-grow: 1;
`;

const Title = styled.h3`
    padding: 6px;
`;

const FormFooter = styled.footer`
    display: flex;
    justify-content: flex-end;
`;

export default function Form({ children, title }) {
    const context = useFormMachine();
    const { isDirty } = context;
    // prettier-ignore
    return rc(FormContext.Provider, { value: context },
        rc(StyledForm, {name: 'form'},
            rc(Title, {name: 'form-title'}, title),
            rc(FormBody, {name: 'form-body'}, children),
            rc(FormFooter, {name: 'form-footer'},
                rc(ActionButton, { key: 'widget-form-cancel', title: 'Cancel', actionType: 'cancel'}),
                rc(ActionButton, { disabled: !isDirty, key: 'widget-form-submit', title: 'Save', actionType: 'submit'})
            )
        )
    );
}

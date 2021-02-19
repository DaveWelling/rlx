import { createElement, createContext } from 'react';
import useFormMachine from '../hooks/useFormMachine.mjs';
import styled from 'styled-components';
import ActionButton from './ActionButton.mjs';
import * as primitives from './primitives.mjs';
const { Form: PrimitiveForm, Fieldset, h3, View } = primitives;

const rc = createElement;

export const FormContext = createContext();

const StyledForm = styled(PrimitiveForm).attrs({ name: 'StyledForm' })`
    background-color: rgba(0, 0, 0, 0.1);
    flex-grow: 1;
`;

const Title = styled(h3)`
    padding: 6px;
`;

const FormFooter = styled(View)`
    justify-content: flex-end;
`;

export default function Form({ children, title }) {
    const context = useFormMachine();
    const { isDirty } = context;
    // prettier-ignore
    return rc(FormContext.Provider, { value: context },
        rc(StyledForm, null,
            rc(Title, {name: 'form-title'}, title),
            rc(Fieldset, null, children),
            rc(FormFooter, {name: 'form-footer'},
                rc(ActionButton, { key: 'widget-form-cancel', title: 'Cancel', actionType: 'cancel'}),
                rc(ActionButton, { disabled: !isDirty, key: 'widget-form-submit', title: 'Save', actionType: 'submit'})
            )
        )
    );
}

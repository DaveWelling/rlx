import { createElement } from 'react';
import { View, h3, Button, fromTheme } from 'rlx_primitives';
import useFormControl from '../../../hooks/useFormControl';
import EditableListRow from './EditableListRow';
import styled from 'styled-components';

const rc = createElement;
const StyledEditableList = styled(View)`
    background-color: ${fromTheme('backgroundColor')};
    flex-direction: column;
    padding: ${fromTheme('viewPadding')};
`;
const Header = styled(View).attrs({ name: 'header' })`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;
export default function EditableList(props) {
    const { childrenHNodes, propertyName } = props;
    const { title, value, setValue, disabled } = useFormControl(props);

    function add() {
        setValue(prev => [{ reverseSequence: prev.length }, ...prev]);
    }

    function remove(index) {
        setValue(prev => {
            const newArray = [...prev];
            newArray.splice(index, 1);
            return newArray;
        });
    }

    // prettier-ignore
    return rc(StyledEditableList, null,
        rc(Header, null,
            rc(h3, null, title),
            rc(Button, { icon: 'add', buttonStyle: 'round', onClick: add, disabled })
        ),
        value.map((entry, index)=>rc(EditableListRow, { propertyName, entry, index, childrenHNodes, remove, key:entry.reverseSequence }))
    );
}

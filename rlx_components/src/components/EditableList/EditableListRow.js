import { createElement } from 'react';
import { View, Button, fromTheme } from 'rlx_primitives';
import styled from 'styled-components';

const ListRow = styled(View).attrs({ name: 'list-row' })`
    background-color: ${fromTheme('backgroundColor')};
    padding: ${fromTheme('viewPadding')};
    flex-direction: column;
    align-items: flex-end;
`;
const ListSubForm = styled(View).attrs({ displayName: 'list-subform' })`
    display: flex;
    flex-direction: column;
`;

const rc = createElement;

export default function EditableListRow(props) {
    const { childrenHNodes, entry, remove, index, propertyName } = props;
    const propertyPath = `${propertyName}[${index}]`;

    function subFormRemove() {
        remove(index);
    }

    // prettier-ignore
    return rc(ListRow, null,
        rc(ListSubForm, null,
            childrenHNodes.map((hNode, index) =>{
                return rc(hNode.type, {...hNode, propertyPath, key: index}, entry[hNode.propertyName])
            }),
        ),
        rc(Button, {icon: 'clear', buttonStyle: 'round', color: 'error', onClick: subFormRemove})
    );
}

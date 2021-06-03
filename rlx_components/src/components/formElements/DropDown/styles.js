import styled from 'styled-components';
import {
    View,
    TextInput,
    Label,
    List,
    Text,
    webOnlyProperties,
    webOnlyStyles,
    Pressable,
    fromTheme
} from 'rlx_primitives';

export const RowDetailStyle = styled(Text).attrs({
    name: 'row-detail'
})`
    line-height: ${fromTheme('listLineHeight')};
    text-align: center;
`;

export const Menu = styled(View).attrs({ name: 'Menu', block: true })`
    height: ${props => {
        if (props?.style?.visibility === 'collapse') return 0;
        if (props?.theme.mobile) return '100%';
        return props.itemCount < 5 ? props.itemCount * 42 + 'px' : '200px';
    }};
    width: 100%;
    flex-grow: ${props => (props?.style?.visibility === 'collapse' ? 0 : 1)};
`;

export const DropdownList = styled(List)`
    min-height: ${fromTheme('form', 'dropdownMinHeight')};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: ${fromTheme('borderRadius')};
    border-bottom-right-radius: ${fromTheme('borderRadius')};
`;

export const ListItem = styled(Pressable).attrs({ name: 'list-item', block: true })(
    {
        position: 'relative',
        lineHeight: fromTheme('listLineHeight'),
        textAlign: 'center',
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: 'gray',
        background: fromTheme('backgroundColor'),
        ...webOnlyProperties({
            overflowX: 'hidden',
            cursor: 'pointer'
        })
    },
    ({ isActive, isSelected }) => {
        const styles = [];
        if (isActive) {
            styles.push({
                background: 'rgba(0,0,0,.03)'
            });
        }
        if (isSelected) {
            styles.push({
                fontWeight: '700',
                background: 'rgba(255,255,255,.03)'
            });
        }
        return styles;
    }
);

const PreControllerButton = styled(Pressable)`
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    padding: 9px 6px 9px 6px;
    margin: 0;
    flex-grow: 0;
    flex-shrink: 0;
    min-width: 24px;
`;

export const ControllerButton = webOnlyStyles(PreControllerButton)`
    cursor: pointer;
    outline-width: 0;
`;

export const InputAndButton = styled(View).attrs({ name: 'InputAndButton' })`
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    background-color: ${({ theme }) => theme.backgroundColor};
    border-top-left-radius: ${fromTheme('borderRadius')};
    border-top-right-radius: ${fromTheme('borderRadius')};
    border-bottom-left-radius: ${props =>
        props.isOpen ? '0' : props.theme.borderRadius + 'px'};
    border-bottom-right-radius: ${props =>
        props.isOpen ? '0' : props.theme.borderRadius + 'px'};
`;

const PreInput = styled(TextInput)`
    background-color: transparent;
    flex-grow: 1;
    padding: 0;
`;
export const Input = webOnlyStyles(PreInput)`
    outline-width: 0;
`;

export const FlexLabel = styled(Label).attrs({
    name: 'flex-label',
    displayName: 'flex-label'
})`
    flex: 1;
    display: 'flex';
    flex-direction: 'row';
    flex-wrap: 'wrap';
    margin-top: ${fromTheme('textMargin')};
    margin-bottom: ${fromTheme('textMargin')};
`;

export const SansLabel = styled(View).attrs({ name: 'SansLabel', block: true })`
    margin-left: ${fromTheme('textMargin')};
    flex-grow: 1;
`;

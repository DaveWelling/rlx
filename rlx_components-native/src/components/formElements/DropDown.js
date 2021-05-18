import { useCombobox } from 'downshift';
import { createElement, useState } from 'react';
import styled from 'styled-components';
import useLokiView from '../../hooks/useLokiView';
import useFormControl from '../../hooks/useFormControl';
import { View, Svg, Path, TextInput, Label, List, Text } from 'rlx_primitives';

// Width of input and dropdown menu
const SELECT_WIDTH = 300;
const MAX_LEXICAL_VALUE = '\uffff';

const rc = createElement;

const itemToString = item => (item == null ? '' : item.title);
const RowDetail = item => rc(Text, null, itemToString(item));
//const RowDetail = ({ item }) => itemToString(item);
const Menu = styled(View).attrs({ name: 'Menu', block: true })({
    width: SELECT_WIDTH,
    height: props => (props.itemCount < 5 ? props.itemCount * 42 + 'px' : '200px')
});
const Item = styled(View).attrs({ name: 'Item', block: true })(
    {
        position: 'relative',
        cursor: 'pointer',
        lineHeight: '32px',
        background: '#ffffff10',
        padding: '0 6px 0 6px',
        overflowX: 'hidden'
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

const ControllerButton = styled(View)`
    background-color: transparent;
    border: none;
    /* These do not work in react native */
    cursor: pointer;
    outline-width: 0;
    /*************************************/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 0;
    padding: 9px 6px 9px 6px;
    margin: 0;
`;

function ArrowIcon({ isOpen }) {
    return rc(
        Svg,
        {
            viewBox: '0 0 20 20',
            preserveAspectRatio: 'none',
            width: 16,
            fill: 'transparent',
            stroke: '#979797',
            strokeWidth: '1.1px',
            /* These do not work in react native */
            transform: isOpen ? 'rotate(180)' : undefined
            /*************************************/
        },
        rc(Path, { d: 'M1,6 L10,15 L19,6' })
    );
}

const InputAndButton = styled(View).attrs({ name: 'InputAndButton' })`
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: ${props => (props.isOpen ? '3px 3px 0 0' : '0')};
    width: SELECT_WIDTH;
`;

const Input = styled(TextInput)({
    flexGrow: 1,
    background: 'transparent',
    /* These do not work in react native */
    outlineWidth: 0
    /*************************************/
});

const FlexLabel = styled(Label).attrs({ name: 'FlexLabel' })({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
});

const SansLabel = styled(View).attrs({ name: 'SansLabel', block: true })({
    marginLeft: 6
});

export default function DropDown(props) {
    const { title, value, setValue, disabled, _id } = useFormControl(props);
    const { defaultValue, otherRecordType } = props || {};
    const [criteria, setCriteria] = useState({ sort: 'title' });
    const [items, itemCount] = useLokiView(
        otherRecordType,
        `${otherRecordType}_${_id}`,
        criteria
    );

    const {
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        selectedItem,
        getComboboxProps,
        getToggleButtonProps,
        isOpen,
        openMenu
    } = useCombobox({
        defaultIsOpen: false,
        itemToString,
        items,
        initialSelectedItem: value,
        onInputValueChange: ({ inputValue, selectedItem }) => {
            const searchText = selectedItem?.title === inputValue ? '' : inputValue;
            setCriteria({
                sort: 'title',
                find: {
                    title: {
                        $between: [searchText, searchText + MAX_LEXICAL_VALUE]
                    }
                }
            });
        },
        onSelectedItemChange: ({ selectedItem }) => {
            setCriteria({ sort: 'title' });
            setValue(selectedItem);
        }
    });
    const inputProps = getInputProps({ type: 'text' });
    // Open the menu if the input gets focus.
    inputProps.onFocus = () => !isOpen && openMenu();
    inputProps.onBlur = () => {};
    // downshift expect the dom event format
    const tempOnChange = inputProps.onChange;
    inputProps.onChange = value => tempOnChange({ target: { value } });
    // prettier-ignore
    return rc(FlexLabel, getLabelProps(),
        'Choose an element:',
        rc(SansLabel, null,
            rc(InputAndButton, {
                    ...getComboboxProps(),
                    isOpen
                },
                rc(Input, inputProps),
                rc(ControllerButton, {type:'button', ...getToggleButtonProps()},
                    rc(ArrowIcon, {isOpen})
                )
            ),
            rc(Menu, { itemCount, ...getMenuProps({ style: isOpen ? {} : {visibility: 'collapse'} })},
                isOpen && rc(List, {
                        itemCount,
                        data: items,
                        Row: Item,
                        highlightedIndex,
                        selectedItem,
                        getItemProps,
                        style: {
                            // This will not work in react-native
                            minHeight: '300px'
                        }
                    },
                    RowDetail
                )
            )
        )
    );
}

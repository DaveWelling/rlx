import { useCombobox } from 'downshift';
import { createElement, useState, useRef } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';
import useLokiView from '../../hooks/useLokiView.mjs';
import useFormControl from '../../hooks/useFormControl.mjs';
const MAX_LEXICAL_VALUE = '\uffff';

const rc = createElement;

const itemToString = item => (item == null ? '' : item.title);

const Menu = styled('ul')({
    width: 300
});
const Item = styled('li')(
    {
        position: 'relative',
        cursor: 'pointer',
        display: 'block',
        border: 'none',
        //height: 'auto',
        textAlign: 'left',
        borderTop: 'none',
        lineHeight: '32px',
        //color: 'rgba(0,0,0,.87)',
        //fontSize: '1rem',
        textTransform: 'none',
        //fontWeight: '400',
        boxShadow: 'none',
        //padding: '.8rem 1.1rem',
        whiteSpace: 'normal',
        wordWrap: 'normal',
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
                fontWeight: '700'
            });
        }
        return styles;
    }
);

const ControllerButton = styled('button')({
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    width: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    height: '1.5em',
    outlineWidth: 0
});

function ArrowIcon({ isOpen }) {
    return rc(
        'svg',
        {
            viewBox: '0 0 20 20',
            preserveAspectRatio: 'none',
            width: 16,
            fill: 'transparent',
            stroke: '#979797',
            strokeWidth: '1.1px',
            transform: isOpen ? 'rotate(180)' : undefined
        },
        rc('path', { d: 'M1,6 L10,15 L19,6' })
    );
}

const InputAndButton = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    background: 'white',
    borderRadius: 3,
    width: 300
});

const Input = styled('input')({
    padding: 3,
    flexGrow: 1,
    background: 'transparent',
    border: 'none',
    outlineWidth: 0
});

const Label = styled('label')({
    display: 'flex',
    flexDirection: 'row'
});

const SansLabel = styled('div')({
    marginLeft: 6
});

function ItemRenderer({ data, index, style }) {
    const { items, getItemProps, highlightedIndex, selectedItem } = data;
    const item = items[index];
    return rc(
        Item,
        {
            ...getItemProps({
                style: style,
                item,
                index: index,
                isActive: highlightedIndex === index,
                isSelected: selectedItem === item
            })
        },
        itemToString(item)
    );
}

export default function DropDown(props) {
    const { title, value, setValue, disabled } = useFormControl(props);
    const { defaultValue, otherRecordType } = props || {};
    const [criteria, setCriteria] = useState({ sort: 'title' });
    const [items, itemCount] = useLokiView(
        otherRecordType,
        `${otherRecordType}_default`,
        criteria
    );
    const listRef = useRef();

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
        },
        scrollIntoView: () => {
            // Need index of current value to do this.
            // Not sure it is worth it.
            //listRef.current.scrollToItem(200);
        }
    });
    const inputProps = getInputProps({ type: 'text' });
    // Open the menu if the input gets focus.
    inputProps.onFocus = () => !isOpen && openMenu();
    inputProps.onBlur = () => {};
    // prettier-ignore
    return rc(Label, getLabelProps(),
        'Choose an element:',
        rc(SansLabel, null,
            rc(InputAndButton, {
                ...getComboboxProps(),
                style: isOpen ? { borderRadius: '3px 3px 0 0'} : {}
            },
                rc(Input, inputProps),
                rc(ControllerButton, {type:'button', ...getToggleButtonProps()},
                    rc(ArrowIcon, {isOpen})
                )
            ),
            rc(Menu, getMenuProps({ style: isOpen ? {} : {visibility: 'collapse'} }),
                isOpen && rc(FixedSizeList, {
                            ref:listRef,
                            width:300,
                            height:itemCount < 5 ? itemCount * 42 : 200,
                            itemCount,
                            itemSize: 32,
                            style: {overflowX: 'hidden'},
                            itemData: {
                                items,
                                getItemProps,
                                highlightedIndex,
                                selectedItem
                            }
                        },
                        ItemRenderer

                )
            )
        )
    );
}

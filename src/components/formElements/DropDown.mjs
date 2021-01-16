import { useCombobox } from 'downshift';
import { createElement, useState, useRef, useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import styled from 'styled-components';

const rc = createElement;

const items = [
    { id: 0, title: 'Neptunium' },
    { id: 1, title: 'Plutonium' },
    { id: 2, title: 'Americium' },
    { id: 3, title: 'Curium' },
    { id: 4, title: 'Berkelium' },
    { id: 50, title: 'Californium' },
    { id: 60, title: 'Einsteinium' },
    { id: 70, title: 'Fermium' },
    { id: 80, title: 'Mendelevium' },
    { id: 90, title: 'Nobelium' },
    { id: 100, title: 'Lawrencium' },
    { id: 110, title: 'Rutherfordium' },
    { id: 120, title: 'Dubnium' },
    { id: 130, title: 'Seaborgium' },
    { id: 140, title: 'Bohrium' },
    { id: 150, title: 'Hassium' },
    { id: 160, title: 'Meitnerium' },
    { id: 170, title: 'Darmstadtium' },
    { id: 180, title: 'Roentgenium' },
    { id: 190, title: 'Copernicium' },
    { id: 200, title: 'Nihonium' },
    { id: 210, title: 'Flerovium' },
    { id: 220, title: 'Moscovium' },
    { id: 240, title: 'Livermorium' },
    { id: 250, title: 'Tennessine' },
    { id: 260, title: 'Oganesson' }
];

const itemToString = item => (item == null ? '' : item.title);
const getItems = search => items.filter(n => n.title.toLowerCase().includes(search));

const Menu = styled('ul')({
    width: 297
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

export default function DropDown() {
    const [items, setItems] = useState(getItems(''));

    const listRef = useRef();

    // const rowVirtualizer = useVirtual({
    //     size: items.length,
    //     parentRef: listRef,
    //     estimateSize: useCallback(() => 20, []),
    //     overscan: 2
    // });

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
        items,
        itemToString,
        onInputValueChange: ({ inputValue, selectedItem }) => {
            const searchText = selectedItem.title === inputValue ? '' : inputValue.toLowerCase();
            setItems(getItems(searchText));
        },
        onSelectedItemChange: ({ selectedItem }) => {
            setItems(getItems(''));
        },
        scrollIntoView: () => {}
    });
    const inputProps = getInputProps({ type: 'text' });
    // Open the menu if the input gets focus.
    inputProps.onFocus = () => !isOpen && openMenu();
    inputProps.onBlur = () => {};
    // prettier-ignore
    return rc(Label, getLabelProps(),
        'Choose an element:',
        rc(SansLabel, null,
            rc(InputAndButton, getComboboxProps(),
                rc(Input, inputProps),
                rc(ControllerButton, {type:'button', ...getToggleButtonProps()},
                    rc(ArrowIcon, {isOpen})
                )
            ),
            rc(Menu, getMenuProps({ style: isOpen ? {} : {visibility: 'collapse'} }),
                isOpen && rc(FixedSizeList, {
                        ref:listRef,
                        width:297,
                        height:items.length < 5 ? items.length * 42 : 200,
                        itemCount:items.length,
                        itemSize: 32,
                        style: {overflowX: 'hidden'},
                        itemData: {
                            items,
                            getItemProps,
                            highlightedIndex,
                            selectedItem
                        }
                    }, ItemRenderer
                )
            )
        )
    );
}

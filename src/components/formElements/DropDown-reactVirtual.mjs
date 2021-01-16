import { useCombobox } from 'downshift';
import { createElement, useState, useRef, useCallback } from 'react';
import { useVirtual } from 'react-virtual';
const rc = createElement;

const menuStyles = {
    maxHeight: 80,
    maxWidth: 300,
    overflowY: 'scroll',
    backgroundColor: '#ffffff10',
    padding: 6,
    listStyle: 'none',
    position: 'relative'
};

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

function getItems(search) {
    return items.filter(n => n.title.toLowerCase().includes(search));
}

export default function DropDown() {
    const [items, setItems] = useState(getItems(''));

    const listRef = useRef();

    const rowVirtualizer = useVirtual({
        size: items.length,
        parentRef: listRef,
        estimateSize: useCallback(() => 20, []),
        overscan: 2
    });

    const {
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        selectedItem,
        getComboboxProps,
        isOpen,
        openMenu
    } = useCombobox({
        defaultIsOpen: false,
        items,
        itemToString: item => (item == null ? '' : item.title),
        onInputValueChange: ({ inputValue }) => setItems(getItems(inputValue.toLowerCase())),
        onSelectedItemChange: ({ selectedItem }) => {
            setItems(getItems(''));
        },
        stateReducer: (state, actionChanges) => {
            const { type, changes } = actionChanges;
            // if (type === useCombobox.stateChangeTypes.cli)
            console.log(type);
            return changes;
        },
        scrollIntoView: () => {},
        onHighlightedIndexChange: ({ highlightedIndex }) => rowVirtualizer.scrollToIndex(highlightedIndex)
    });
    const inputProps = getInputProps({ type: 'text' });
    // Open the menu if the input gets focus.
    inputProps.onFocus = () => !isOpen && openMenu();
    inputProps.onBlur = () => {};
    // prettier-ignore
    return rc('div', null,
        rc('div', null,
            rc('label', { ...getLabelProps() }, 'Choose an element:'),
            rc('div', { ...getComboboxProps() }, rc('input', inputProps))
        ),
        rc('ul', { ...getMenuProps({ ref: listRef, style: isOpen ? menuStyles : {visibility: 'collapse'} }) },
            isOpen && [
                rc('li', { key: 'total-size', style: { height: rowVirtualizer.totalSize } }),
                ...rowVirtualizer.virtualItems.map(virtualRow =>
                    rc('li', {
                            key: items[virtualRow.index].id,
                            ...getItemProps({
                                index: virtualRow.index,
                                item: items[virtualRow.index],
                                style: {
                                    backgroundColor: highlightedIndex === virtualRow.index ? 'lightgray' : 'inherit',
                                    fontWeight:
                                        selectedItem && selectedItem.id === items[virtualRow.index].id
                                            ? 'bold'
                                            : 'normal',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: virtualRow.size,
                                    transform: `translateY(${virtualRow.start}px)`
                                }
                            })
                        },
                        items[virtualRow.index].title
                    )
                )
            ]
        )
    );
}

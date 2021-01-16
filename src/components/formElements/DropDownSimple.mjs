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
    { id: 260, title: 'Oganesson}' }
];

function getItems(search) {
    return items.filter(n => n.title.toLowerCase().includes(search));
}

export default function DropDown() {
    const [items, setItems] = useState(getItems(''));

    const listRef = useRef();

    const {
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        selectedItem,
        getComboboxProps,
        isOpen
    } = useCombobox({
        items,
        itemToString: item => (item == null ? '' : item.title),
        onInputValueChange: ({ inputValue }) => {
            setItems(items.filter(item => item.title.toLowerCase().startsWith(inputValue.toLowerCase())));
        }
    });
    const inputProps = getInputProps({ type: 'text' });
    console.log(inputProps);
    // prettier-ignore
    return rc('div', null,
        rc('div', null,
            rc('label', { ...getLabelProps() }, 'Choose an element:'),
            rc('div', { ...getComboboxProps() }, rc('input', inputProps))
        ),
        rc('ul', { ...getMenuProps({ ref: listRef, style: menuStyles }) },
            isOpen && [
                //rc('li', { key: 'total-size', style: { height: '400px' } }),
                items.map((item,i) =>
                    rc('li', {
                            style: highlightedIndex === i ? {backgroundColor: '#bde4ff'} : {},
                            key: item.id,
                            ...getItemProps({
                                index: i,
                                item
                            })
                        },
                        item.title
                    )
                )
            ]
        )
    );
}

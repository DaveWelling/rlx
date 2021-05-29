import { useCombobox } from 'downshift';
import { createElement, useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import useLokiView from '../../hooks/useLokiView';
import useFormControl from '../../hooks/useFormControl';
import {
    View,
    Svg,
    Path,
    TextInput,
    Label,
    List,
    Text,
    webOnlyProperties,
    webOnlyStyles,
    nativeOnlyProperties,
    ErrorBoundary,
    Modal,
    Pressable,
    fromTheme
} from 'rlx_primitives';

// TODO: Move this to config?
const MAX_LEXICAL_VALUE = '\uffff';

const rc = createElement;

const itemToString = item => (item == null ? '' : item.title);

const RowDetailStyle = styled(Text).attrs({
    name: 'row-detail'
})`
    line-height: ${fromTheme('listLineHeight')};
    text-align: center;
`;

const RowDetail = ({ item, theme }) => {
    return rc(RowDetailStyle, { theme }, itemToString(item));
};

const Menu = styled(View).attrs({ name: 'Menu', block: true })`
    height: ${props => {
        if (props?.style?.visibility === 'collapse') return 0;
        if (props?.theme.mobile) return '100%';
        return props.itemCount < 5 ? props.itemCount * 42 + 'px' : '200px';
    }};
    width: 100%;
    flex-grow: ${props => (props?.style?.visibility === 'collapse' ? 0 : 1)};
`;

const DropdownList = styled(List)`
    min-height: ${fromTheme('form', 'dropdownMinHeight')};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: ${fromTheme('borderRadius')};
    border-bottom-right-radius: ${fromTheme('borderRadius')};
`;

const Item = styled(Pressable).attrs({ name: 'Item', block: true })(
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

let ControllerButton = styled(Pressable)`
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

ControllerButton = webOnlyStyles(ControllerButton)`
    cursor: pointer;
    outline-width: 0;
`;

function ArrowIcon({ isOpen }) {
    return rc(
        Svg,
        {
            name: 'arrow-icon',
            viewBox: '0 0 20 20',
            preserveAspectRatio: 'none',
            width: 16,
            height: 16,
            fill: 'transparent',
            stroke: '#979797',
            strokeWidth: '1.1',
            ...webOnlyProperties({
                transform: isOpen ? 'rotate(90)' : undefined
            }),
            ...nativeOnlyProperties({
                transform: isOpen ? [{ rotate: '90deg' }] : undefined
            })
        },
        rc(Path, { d: 'M1,6 L10,15 L19,6' })
    );
}

let InputAndButton = styled(View).attrs({ name: 'InputAndButton' })`
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

let Input = styled(TextInput)`
    background-color: transparent;
    flex-grow: 1;
    padding: 0;
`;
Input = webOnlyStyles(Input)`
    outline-width: 0;
`;

const FlexLabel = styled(Label).attrs({ name: 'FlexLabel' })({
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
});

const SansLabel = styled(View).attrs({ name: 'SansLabel', block: true })`
    margin: ${fromTheme('textMargin')};
    flex-grow: 1;
`;

export default function DropDown(props) {
    const theme = useContext(ThemeContext);
    const { mobile } = theme;
    const { title, value, setValue, disabled, _id } = useFormControl(props);
    const { defaultValue, otherRecordType, placeholder } = props || {};
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
        scrollIntoView: () => {
            /* let list component do scrolling (if bother at all) */
        },
        // TODO: Maybe (or maybe not) inform list component when need to scroll because selected index changed
        // onHighlightedIndexChange: event=>{
        //     const {highlightedIndex} = event;
        //     Maybe need to use a ref to list or something here and call a method on the list.
        // },
        onSelectedItemChange: ({ selectedItem }) => {
            setCriteria({ sort: 'title' });
            setValue(selectedItem);
        }
    });
    const inputProps = getInputProps({ type: 'text', placeholder });
    // Open the menu if the input gets focus.
    inputProps.onFocus = () => !isOpen && openMenu();
    inputProps.onBlur = () => {};
    // downshift expects the dom/native event formats
    const tempOnChange = inputProps.onChange;
    inputProps.onChange = value =>
        tempOnChange({
            ...webOnlyProperties({ target: { value } }),
            ...nativeOnlyProperties({ nativeEvent: { text: value } })
        });

    let comboboxProps = getComboboxProps();
    let { ref } = comboboxProps;
    if (mobile && isOpen) {
        // prettier-ignore
        return rc(ErrorBoundary, null,
            rc(Modal, {visible: true, ...comboboxProps, ref},
                rc(Input, {
                    ...inputProps,
                    ...nativeOnlyProperties({
                        onKeyPress: inputProps.onKeyDown,
                        onKeyDown: undefined,
                        'aria-autocomplete': undefined,
                        'aria-controls': undefined,
                        'aria-labellby': undefined,
                        autoComplete: undefined
                    }),
                    style: { flexGrow: 0 }
                }),
                rc(Menu, { itemCount, ...getMenuProps(), mobile},
                    rc(DropdownList, {
                            itemCount,
                            data: items,
                            Row: Item,
                            RowDetail,
                            highlightedIndex,
                            selectedItem,
                            getItemProps,
                            itemHeightPixels: theme.listLineHeight
                        }
                    )
                )
            )
        );
    }
    // prettier-ignore
    return rc(ErrorBoundary, null,
        rc(FlexLabel, getLabelProps(),
            title,
            rc(SansLabel, null,
                rc(InputAndButton, {
                        ...comboboxProps,
                        ref,
                        isOpen
                    },
                    rc(Input, {
                        ...inputProps,
                        ...nativeOnlyProperties({
                            onKeyPress: inputProps.onKeyDown,
                            onKeyDown: undefined,
                            'aria-autocomplete': undefined,
                            'aria-controls': undefined,
                            'aria-labellby': undefined,
                            autoComplete: undefined
                        })
                    }),
                    rc(ControllerButton, {type:'button', ...getToggleButtonProps()},
                        rc(ArrowIcon, {isOpen})
                    )
                ),
                rc(Menu, { itemCount, ...getMenuProps({ style: isOpen ? {} : {visibility: 'collapse'} })},
                    isOpen && rc(DropdownList, {
                            itemCount,
                            data: items,
                            Row: Item,
                            RowDetail,
                            highlightedIndex,
                            selectedItem,
                            getItemProps
                        }
                    )
                )
            )
        )
    );
}

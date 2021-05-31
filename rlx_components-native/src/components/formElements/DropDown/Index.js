import { useCombobox } from 'downshift';
import { createElement, useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import useLokiView from '../../../hooks/useLokiView';
import useFormControl from '../../../hooks/useFormControl';
import {
    webOnlyProperties,
    nativeOnlyProperties,
    ErrorBoundary,
    Modal
} from 'rlx_primitives';
import ArrowIcon from './ArrowIcon';
import {
    RowDetailStyle,
    Menu,
    DropdownList,
    ListItem,
    ControllerButton,
    InputAndButton,
    Input,
    FlexLabel,
    SansLabel
} from './styles';

// TODO: Move this to config?
const MAX_LEXICAL_VALUE = '\uffff';

const rc = createElement;

const itemToString = item => (item == null ? '' : item.title);

const RowDetail = ({ item, theme }) => {
    return rc(RowDetailStyle, { theme }, itemToString(item));
};

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

    const comboboxProps = getComboboxProps();
    const { ref } = comboboxProps;

    // If this is mobile and the menu is opened, then display a whole screen
    // dialog so it is easier for the user to see and touch the choices
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
                            Row: ListItem,
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

    // for Desktop or closed menu, display the normal dropdown
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
                            Row: ListItem,
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

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
    Modal
} from 'rlx_primitives';

// TODO: Extract this as part of theming.
const MOBILE_BREAKPOINT = 479;
// Width of input and dropdown menu
const SELECT_WIDTH = '300px';
const MAX_LEXICAL_VALUE = '\uffff';

const rc = createElement;

const itemToString = item => (item == null ? '' : item.title);
const RowDetail = item => rc(Text, null, itemToString(item));

const Menu = styled(View).attrs({ name: 'Menu', block: true })({
    width: props => (props.theme.mobile ? '100%' : SELECT_WIDTH),
    height: props => {
        if (props?.style?.visibility === 'collapse') return 0;
        if (props?.theme.mobile) return '100%';
        return props.itemCount < 5 ? props.itemCount * 42 + 'px' : '200px';
    }
});
const Item = styled(View).attrs({ name: 'Item', block: true })(
    {
        position: 'relative',
        lineHeight: props => (props.theme.mobile ? '67px' : '32px'),
        textAlign: 'center',
        background: '#ffffff10',
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

let ControllerButton = styled(View)`
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 0;
    padding: 9px 6px 9px 6px;
    margin: 0;
`;

ControllerButton = webOnlyStyles(ControllerButton)`
    cursor: pointer;
    outline-width: 0;
`;

function ArrowIcon({ isOpen }) {
    return rc(
        Svg,
        {
            viewBox: '0 0 20 20',
            preserveAspectRatio: 'none',
            width: 16,
            fill: 'transparent',
            // stroke: '#979797',
            stroke: '#fff',
            strokeWidth: '1.1px',
            /* These do not work in react native */
            ...webOnlyProperties({
                transform: isOpen ? 'rotate(90)' : undefined
            }),
            ...nativeOnlyProperties({
                transform: isOpen ? [{ rotate: '90deg' }] : undefined
            })
            /*************************************/
        },
        rc(Path, { d: 'M1,6 L10,15 L19,6' })
    );
}

let InputAndButton = styled(View).attrs({ name: 'InputAndButton' })`
    display: flex;
    flex-direction: row;
    background-color: rgba(255, 255, 255, 0.1);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: ${props => (props.isOpen ? '0' : '3px')};
    border-bottom-right-radius: ${props => (props.isOpen ? '0' : '3px')};
    width: ${SELECT_WIDTH};
`;

let Input = styled(TextInput)`
    background-color: transparent;
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
    margin-left: 6px;
    min-width: 300px;
`;

export default function DropDown(props) {
    const { mobile } = useContext(ThemeContext);
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
                    })
                }),
                rc(Menu, { itemCount, ...getMenuProps(), mobile},
                    rc(List, {
                            itemCount,
                            data: items,
                            Row: Item,
                            highlightedIndex,
                            selectedItem,
                            getItemProps,
                            itemHeightPixels: mobile ? 70 : 35,
                            style: {
                                ...webOnlyProperties({
                                    minHeight: mobile ? '100%' : '200px'
                                }),
                                ...nativeOnlyProperties({
                                    minHeight: mobile ? '100%' : 200
                                })
                            }
                        },
                        RowDetail
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
                    isOpen && rc(List, {
                            itemCount,
                            data: items,
                            Row: Item,
                            highlightedIndex,
                            selectedItem,
                            getItemProps,
                            style: {
                                ...webOnlyProperties({
                                    minHeight: '200px'
                                }),
                                ...nativeOnlyProperties({
                                    minHeight: 200
                                })
                            }
                        },
                        RowDetail
                    )
                )
            )
        )
    );
}
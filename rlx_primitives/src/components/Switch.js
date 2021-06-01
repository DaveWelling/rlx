import React, { useState, createElement, useContext } from 'react';
import styled from 'styled-components';
import fromTheme from '../fromTheme';

const rc = createElement;

const Label = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ disabled, theme, value }) =>
        disabled || !value ? theme.disabledColor : theme.button.primaryHighlight};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 31px;
    &:before {
        position: absolute;
        content: '';
        height: 23px;
        width: 23px;
        left: 1px;
        bottom: 1px;
        background-color: ${fromTheme('button', 'primary')};
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
    }
`;

const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    &:checked {
        background-color: #2196f3;
    }
    &:focus {
        box-shadow: 0 0 1px #2196f3;
    }
    &:checked + ${Slider}:before {
        transform: translateX(25px);
    }
`;

export default function Switch(props) {
    const { value, onClick } = props;
    const onChange = e => onClick(e.target.checked);
    // prettier-ignore
    return rc(Label, null,
        rc(Input, { type: 'checkbox', checked: value, onChange }),
        rc(Slider)
    );
}

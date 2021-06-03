import styled, { ThemeContext } from 'styled-components';
import react from 'react';
import fromTheme from '../fromTheme';
const { createElement: rc, useContext, forwardRef } = react;

const StyledButton = styled.button.attrs(props => {
    const { onClick } = props;
    return {
        name: 'button',
        type: 'button',
        onClick: e => {
            createRipple(e);
            setTimeout(() => {
                onClick(e);
            }, 300);
        }
    };
})`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: background 300ms;
    max-width: ${fromTheme('button', 'maxWidth')};
    margin: ${fromTheme('textMargin')};
    border-radius: ${fromTheme('borderRadius')};
    border: none;
    padding: ${fromTheme('button', 'padding')};
    flex-grow: 0;
    flex-basis: auto;
    background-color: ${({ theme, color }) => theme.button[color]};
    &:hover {
        background-color: ${({ theme, color }) => theme.button[color + 'Hover']};
    }
    color: ${props =>
        props.disabled ? props.theme.disabledFontColor : props.theme.button.fontColor};
`;
const RoundButton = styled(StyledButton).attrs({ name: 'round-button' })`
    width: ${fromTheme('button', 'roundDiameter')};
    height: ${fromTheme('button', 'roundDiameter')};
    border-radius: 50%;
`;

const Icon = styled('i').attrs(props => ({ className: props.theme.iconFont }))`
    font-size: ${fromTheme('iconSize')};
`;
export default forwardRef(function Button(props, ref) {
    const {
        children = [],
        icon,
        hoverText,
        alt,
        buttonStyle,
        value,
        color = 'primary',
        ...otherProps
    } = props;
    const theme = useContext(ThemeContext);
    let adjustedChildren = [];
    if (icon) {
        adjustedChildren = [
            // prettier-ignore
            rc(Icon, { key: '0', title: hoverText, alt }, icon),
            rc('span', { key: '1' }, value)
        ];
    } else {
        adjustedChildren = [value];
    }
    if (children) {
        Array.isArray(children)
            ? (adjustedChildren = [...adjustedChildren, ...children])
            : (adjustedChildren = [...adjustedChildren, children]);
    }
    if (buttonStyle === 'round') {
        return rc(RoundButton, { ref, color, ...otherProps }, adjustedChildren);
    }
    return rc(StyledButton, { ref, color, ...otherProps }, adjustedChildren);
});

function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    // circle.style.left = `${event.clientX - radius}px`;
    // circle.style.top = `${event.clientY - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
    setTimeout(() => {
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
    }, 300);
}

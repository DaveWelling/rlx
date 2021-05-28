import styled from 'styled-components';
export default styled.button.attrs(props => {
    const { onClick } = props;
    return {
        name: 'button',
        type: 'button',
        onClick: e => {
            createRipple(e);
            setTimeout(() => {
                onClick(e);
            }, 300);
        },
        children: props.value
    };
})`
    position: relative;
    display: inline-block;
    overflow: hidden;
    transition: background 300ms;
    max-width: ${({ theme }) => theme.button.maxWidth};
    margin: ${({ theme }) => theme.defaultMargin};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: thin solid black;
    padding: ${({ theme }) => theme.button.padding};
    flex-grow: 0;
    flex-basis: auto;
    justify-content: center;
    background-color: ${({ theme }) => theme.button.primary};
    &:hover {
        background-color: ${({ theme }) => theme.button.primaryHover};
    }
    color: ${props =>
        props.disabled ? props.theme.disabledFontColor : props.theme.defaultFontColor};
`;

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
}

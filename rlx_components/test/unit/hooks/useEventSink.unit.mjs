import React, { useEffect, useState } from 'react';
import rtl from '@testing-library/react';
import EventBoundary from '../../../src/components/EventBoundary.mjs';
import useEventSink from '../../../src/hooks/useEventSink.mjs';
import expect from 'expect';
import 'jsdom-global/register.js';

const { render, fireEvent } = rtl;

const rc = React.createElement;

function Publisher() {
    const [, publish] = useEventSink();
    return rc('input', { type: 'button', value: 'click me', onClick: () => publish('hello', 'world') });
}

function Subscriber() {
    const [subscribe] = useEventSink();
    const [display, setDisplay] = useState('nobody');
    useEffect(() => subscribe('hello', setDisplay), []);
    return rc('div', null, display);
}

function Harness() {
    return rc(EventBoundary, null, rc(Publisher), rc(Subscriber));
}

it('Simple subscribe/publish', () => {
    const { getByText } = render(rc(Harness));
    const display = getByText('nobody');
    const button = getByText(/click me/i);
    fireEvent.click(button);
    expect(display.innerHTML).toInclude('world');
});

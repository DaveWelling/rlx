import { createElement } from 'react';
import { View, Text, Switch, fromTheme } from 'rlx_primitives';
import styled from 'styled-components';
const rc = createElement;

const SwitchLayout = styled(View).attrs({ displayName: 'switch-layout' })`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${fromTheme('textPadding')};
`;

export default function ActionSwitch(props) {
    const { falseLabel = 'No', trueLabel = 'Yes', value = false, onClick } = props;
    // prettier-ignore
    return rc(SwitchLayout, null,
        rc(Text, null, falseLabel),
        rc(Switch, {value, onClick}),
        rc(Text, null, trueLabel)
    );
}

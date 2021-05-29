import react from 'react';

export default function Path(props) {
    return react.createElement('path', props, props.children);
}

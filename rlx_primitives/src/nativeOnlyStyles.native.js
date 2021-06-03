import styled from 'styled-components';

export default existingStyle => {
    // Create our own tagged template function (just like styled() does),
    // Then append the new template string onto the existing style
    // Similar to this: https://styled-components.com/docs/basics#extending-styles
    // but passes the RESULTING string array of a template literal to the existing styled
    // component rather than attaching the template literal.
    // This works because styled() creates a tag function as described here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
    /**
     * returns styled
     */
    return function tagged(...args) {
        return styled(existingStyle)(...args);
    };
};

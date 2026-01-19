import React, { Component } from 'react';

class DefaultPropsExample extends Component {
    render() {
        const { text, onclick} = this.props;
        return (
            <div>
                <p>{text}</p>
                <button onClick={onclick}>Click Me</button>
            </div>
        );
    }
}
DefaultPropsExample.defaultProps = {
    text: "This is default text",
    onclick: () => console.log("Default onclick executed"),
};

export default DefaultPropsExample;
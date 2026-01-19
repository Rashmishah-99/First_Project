// create a class based component named display123, create previous and next button to navigate through a list of items and display the current item.

import React, { Component } from "react";
class Display123 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ["Text1", "Text2", "Text3", "Text4", "Text5", "Text6", "Text7", "Text8", "Text9", "Text10", "Text11", "Text12", "Text13", "Text14", "Text15", "Text16", "Text17", "Text18", "Text19", "Text20"],
            currentIndex: 0
        };
    }
    render() {
        const { items } = this.props;
        const { currentIndex } = this.state;
        return (
            <div>
                <button onClick={() => this.setState({ currentIndex: currentIndex - 1 })}>Previous</button>
                <p>{items[currentIndex]}</p>
                <button onClick={() => this.setState({ currentIndex: currentIndex + 1 })}>Next</button>
            </div>
        );
    }
}
export default Display123;

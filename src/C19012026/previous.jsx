import React, { Component } from "react";
class Display123 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
            currentIndex: 0
        };
    }

    handlePrevious = () => {
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex > 0 ? prevState.currentIndex - 1 : prevState.currentIndex
        }));
    };

    handleNext = () => {
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex < prevState.items.length - 1 ? prevState.currentIndex + 1 : prevState.currentIndex
        }));
    };

    render() {
        const { items, currentIndex } = this.state;
        return (
            <div>
                <button onClick={this.handlePrevious}>Previous</button>
                <p>{items[currentIndex]}</p>
                <button onClick={this.handleNext}>Next</button>
            </div>
        );
    }
}

export default Display123;

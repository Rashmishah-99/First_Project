import React, { Component } from 'react';
import './propstest.css';

class PropsClassExample extends Component {
    render() {
        return (
            <>
            <div className="user-card">
                <img src={this.props.img_url}/>
                <button>{this.props.button_txt}</button>
                <h3>{this.props.data}.</h3>
            </div>

            </>
        );
    }
}
export default PropsClassExample;
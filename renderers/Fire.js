import React, { PureComponent } from "react";
import { Sprite } from "../components/Sprite";

export class Fire extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sprite
                source={require('../assets/images/fire.png')}
                width={this.props.dimensions[0]}
                height={this.props.dimensions[1]}
                x={this.props.position[0]}
                y={this.props.position[1]}
                frameWidth={50}
                frameHeight={80}
                row={0}
                column={this.props.frame} />
        );
    }
}
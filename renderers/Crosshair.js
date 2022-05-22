import React, { PureComponent } from "react";
import { Sprite } from "../components/Sprite";

export class Crosshair extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sprite
                source={require('../assets/images/crosshair.png')}
                width={this.props.dimensions[0]}
                height={this.props.dimensions[1]}
                x={this.props.position[0]}
                y={this.props.position[1]} />

        );
    }
}
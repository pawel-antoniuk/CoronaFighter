import React, { PureComponent } from "react";
import { Sprite } from "../components/Sprite";

export class Virus extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        var img;

        if (this.props.hit)
            img = require('../assets/images/explosion.png');
        else
            img = require('../assets/images/virus.png');

        return (
            <Sprite
                source={img}
                width={this.props.dimensions[0]}
                height={this.props.dimensions[1]}
                x={this.props.position[0]}
                y={this.props.position[1]}
                style={{opacity: 1 - this.props.deadDuration / 400}} />
        );
    }
}

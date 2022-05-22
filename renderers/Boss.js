import React, { PureComponent } from "react";
import { Sprite } from "../components/Sprite";

export class Boss extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.visible) {
            return null;
        }

        var img, widthScale = 1, heightScale = 1, rotY;
        if (this.props.life <= 0) {
            img = require('../assets/images/explosion.png');
            widthScale = this.props.dimensions[1] / this.props.dimensions[0];
        }
        else if (this.props.mutationState >= 3) {
            img = require('../assets/images/boss2.png');
            widthScale = this.props.dimensionsMutatedScale[0];
            heightScale = this.props.dimensionsMutatedScale[1];
            rotY = -40;
        } else {
            img = require('../assets/images/boss.png');
            rotY = -20;
        }

        return (
            <Sprite
                source={img}
                width={this.props.dimensions[0] * widthScale}
                height={this.props.dimensions[1] * heightScale}
                x={this.props.position[0]}
                y={this.props.position[1]}
                rotation={this.props.rotation}
                rotX={0}
                rotY={rotY}
                style={{ opacity: 1 - this.props.deadDuration / 400 }} />
        );
    }
}

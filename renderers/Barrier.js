import React, { PureComponent } from "react";
import { View } from "react-native";
import { Sprite } from "../components/Sprite";

const ArmorOpacityMap = { 3: 1, 2: 0.66, 1: 0.33, 0: 0 };

export class Barrier extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.armor <= 0) {
            return <View />
        }
        return (
            <Sprite
                source={require('../assets/images/barrier.png')}
                width={this.props.dimensions[0]}
                height={this.props.dimensions[1]}
                x={this.props.position[0]}
                y={this.props.position[1]}
                style={{ opacity: ArmorOpacityMap[this.props.armor] }} />
        );
    }
}
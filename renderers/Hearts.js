import React, { PureComponent } from "react";
import { View } from "react-native";
import { Sprite } from "../components/Sprite";

export class Hearts extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const hearts = Array.from(Array(this.props.count).keys());

        return (
            <View
                style={{
                    position: "absolute"
                }}>
                {hearts.map(heart => {
                    return (
                        <Sprite
                            key={heart}
                            source={require('../assets/images/heart.png')}
                            width={this.props.dimensions[0]}
                            height={this.props.dimensions[1]}
                            x={this.props.position[0] + (this.props.dimensions[0] + this.props.offset ) * heart}
                            y={this.props.position[1]}
                            frameWidth={27}
                            frameHeight={27}
                            row={0}
                            column={this.props.current <= heart} />
                    );
                })}
            </View>
        );
    }
}
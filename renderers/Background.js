import React, { PureComponent } from "react";
import { View, Image } from "react-native";
import { Dimensions } from "react-native";

windowWidth = Math.round(Dimensions.get('window').width);
windowHeight = Math.round(Dimensions.get('window').height);
backgroundHeight = 256 * 3;

export class Background extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    top: this.props.positionY,
                    left: 0,
                    position: 'absolute'
                }}
            >
                <Image
                    style={{
                        width: windowWidth,
                        height: backgroundHeight * windowWidth / 256,
                    }}
                    source={this.props.source}
                    resizeMode={"stretch"} />
            </View>
        );
    }
}
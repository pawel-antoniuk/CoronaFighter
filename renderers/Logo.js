import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export class Logo extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View
                style={{
                    position: "absolute",
                    left: this.props.position[0],
                    top: this.props.position[1],
                    height: this.props.dimensions[1],
                    width: this.props.dimensions[0],
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text style={{ fontSize: this.props.size, color: '#649d66' }}>☣</Text>
            </View>
        );
    }
}
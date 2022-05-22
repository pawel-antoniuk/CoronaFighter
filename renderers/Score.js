import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export class Score extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    right: 0,
                    marginRight: 20
                }}>
                <Text style={{
                    fontSize: 18,
                    alignSelf: 'flex-end',
                    color: 'white',
                    fontFamily: 'monospace'
                }}>
                    {`SCORE ${this.props.score}`}
                </Text>
                <Text style={{
                    fontSize: 18,
                    alignSelf: 'flex-end',
                    color: 'white',
                    fontFamily: 'monospace'
                }}>
                    {`LEVEL ${this.props.level}`}
                </Text>
            </View>
        );
    }
}
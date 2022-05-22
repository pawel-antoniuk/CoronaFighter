import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export class GameAlert extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.messageOpacity <= 0) {
            return null;
        }

        return (
            <View
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    alignContent: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                <Text style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    color: '#dd3',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    opacity: this.props.messageOpacity,
                    textAlign: 'center'
                }}>
                    {this.props.message}
                </Text>
            </View>
        );
    }
}
import React, { PureComponent } from "react";
import { View } from "react-native";

export class BossHealthBar extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.healthBar <= 0) {
            return null;
        }

        const color1 = '#333';
        const color2 = '#e11';
        const width = 100;
        const height = 10;
        const padding = 2;

        return (
            <View
                style={{
                    width: width + padding * 2,
                    height: height + padding * 2,
                    padding: padding,
                    left: this.props.position[0] - (width + padding * 2) / 2,
                    top: this.props.position[1],
                    backgroundColor: color1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    borderRadius: 5,
                    position: 'absolute'
                }}>
                <View style={{
                    backgroundColor: color2,
                    borderRadius: 5,
                    width: width * this.props.healthBar,
                    height: height
                }}></View>
            </View>
        );
    }
}
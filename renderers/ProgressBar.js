import React, { PureComponent } from "react";
import { View } from "react-native";
import { windowDimensionsProvider } from "../helpers/WindowManager";

export class ProgressBar extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const color1 = '#333';
        const color2 = '#e11';
        const padding = 2;
        const width = 10;
        const height = 400;

        return (
            <View
                style={{
                    width: width + padding * 2,
                    height: height + padding * 2,
                    padding: padding,
                    left: 10,
                    top: windowDimensionsProvider.getHeight() / 2 - height / 2,
                    backgroundColor: color1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    borderRadius: 5
                }}>
                <View style={{
                    backgroundColor: color1,
                    borderRadius: 100,
                    width: width * 3 + padding * 2,
                    left: -10 - padding / 2,
                    bottom: -padding,
                    height: width * 3 + padding
                }}>
                    <View style={{
                        backgroundColor: color2,
                        borderRadius: 100,
                        width: width * 3,
                        left: padding,
                        bottom: -padding / 2,
                        height: width * 3,
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                    }}>
                        <View style={{
                            backgroundColor: color2,
                            borderRadius: 5,
                            width: width,
                            left: width - padding / 2,
                            height: height * this.props.progress
                        }}>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
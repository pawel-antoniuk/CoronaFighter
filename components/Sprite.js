import React, { Component } from "react";
import { View, Image } from "react-native";

export class Sprite extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let transofrm = [];
        let frameWidth = this.props.frameWidth ?? this.props.width;
        let frameHeight = this.props.frameHeight ?? this.props.height;
        let row = this.props.row ?? 0;
        let column = this.props.column ?? 0;

        transofrm.push({ translateX: this.props.x });
        transofrm.push({ translateY: this.props.y });
        transofrm.push({ translateX: -frameWidth / 2 });
        transofrm.push({ translateY: -frameHeight / 2 });

        if (this.props.rotation) {
            if (typeof this.props.rotX !== 'undefined') {
                transofrm.push({ translateX: -this.props.rotX });
                transofrm.push({ translateY: -this.props.rotY });
                transofrm.push({ rotateZ: `${this.props.rotation}rad` });
                transofrm.push({ translateX: this.props.rotX });
                transofrm.push({ translateY: this.props.rotY });
            } else {
                transofrm.push({ rotateZ: `${this.props.rotation}rad` });
            }
        }

        transofrm.push({ scaleX: this.props.width / frameWidth });
        transofrm.push({ scaleY: this.props.height / frameHeight });

        let imageStyle = {
            transform: [
                { translateX: -Math.floor(column) * frameWidth },
                { translateY: -Math.floor(row) * frameHeight },
            ],
        }

        if (!this.props.frameWidth) {
            imageStyle.width = frameWidth;
        }
        if (!this.props.frameHeight) {
            imageStyle.height = frameHeight;
        }

        return (
            <View
                style={{
                    overflow: "hidden",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: frameWidth,
                    height: frameHeight,
                    transform: transofrm,
                    ...this.props.style
                }} >

                <Image
                    source={this.props.source}
                    style={imageStyle}
                />

            </View>
        );
    }
}
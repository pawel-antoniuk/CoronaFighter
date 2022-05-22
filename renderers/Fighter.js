import React, { PureComponent } from "react";
import { Sprite } from "../components/Sprite";

export class Fighter extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sprite
                source={require('../assets/images/fighter.png')}
                width={this.props.dimensions[0]}
                height={this.props.dimensions[1]}
                x={this.props.position[0]}
                y={this.props.position[1]}
                frameWidth={128}
                frameHeight={192}
                row={0}
                column={this.props.frame} />
        );
    }
}
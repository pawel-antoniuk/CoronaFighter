import {
    accelerometer,
    setUpdateIntervalForType,
    SensorTypes
} from "react-native-sensors";
import { Vector2 } from "./Vector2";
import { Vector3 } from "./Vector3";

export let Accelerometer = {
    gravityVector: new Vector3(),

    start() {
        setUpdateIntervalForType(SensorTypes.accelerometer, 20);
        this.subscription = accelerometer.subscribe(
            ({ x, y, z }) => {
                this.gravityVector.x = x;
                this.gravityVector.y = y;
                this.gravityVector.z = z;

                this.callback?.(this);
            },
            () => {
                console.log("The sensor is not available");
            }
        );
    },

    stop() {
        this.subscription.unsubscribe();
    },

    getDirectionVector() {
        const gv = this.gravityVector.normalized();
        return new Vector2(-gv.x, gv.y);
    }
}
import { Accelerometer } from "../Accelerometer";
import { Dimensions } from "react-native";
import { gameEntityManager } from "../helpers/GameEntityManager";
import { windowDimensionsProvider } from "../helpers/WindowManager";

gameEntityManager.registerEntitySubsystem('fighter', (entityId, entity) => {
    entity.frame = Math.floor(gameEntityManager.getTimeCurrent() / 50) % 8;

    const newPosition = [entity.position[0], entity.position[1]];
    const vec = Accelerometer.getDirectionVector();

    if (!isNaN(vec.x) && !isNaN(vec.y)) {
        newPosition[0] += vec.x * gameEntityManager.getTimeDelta() / 2;
    }

    gameEntityManager.getTouches('move').forEach(t => {
        newPosition[0] += t.delta.pageX;
        newPosition[1] += t.delta.pageY;
    });

    if (newPosition[0] < windowDimensionsProvider.getWidth()
        && newPosition[0] > 0) {
        entity.position = [newPosition[0], entity.position[1]];
    }

    if (newPosition[1] < windowDimensionsProvider.getHeight()
        && newPosition[1] > 0) {
        entity.position = [entity.position[0], newPosition[1]];
    }
});
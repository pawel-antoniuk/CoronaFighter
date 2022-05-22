import { Accelerometer } from "../Accelerometer";
import { Dimensions } from "react-native";
import { gameEntityManager } from "../helpers/GameEntityManager";

windowWidth = Math.round(Dimensions.get('window').width);
windowHeight = Math.round(Dimensions.get('window').height);

gameEntityManager.registerEntitySubsystem('barrier', (entityId, entity) => {
    const [_, fighter] = gameEntityManager.getEntityByType('fighter');

    if (entity.armor <= 0) {
        fighter.barrier = false;
        fighter.collisionBox = null;
        return;
    }

    entity.position = [fighter.position[0], fighter.position[1] - 8];

    fighter.barrier = true;
    fighter.collisionBox = [fighter.position, entity.dimensions];
});
import { gameEntityManager } from "../helpers/GameEntityManager";

gameEntityManager.registerEntitySubsystem('fire', (entityId, entity) => {
    if (entity.frame < 2) {
        entity.frame += gameEntityManager.getTimeDelta() / 20;
    } else {
        gameEntityManager.deleteEntity(entityId);
    }
});
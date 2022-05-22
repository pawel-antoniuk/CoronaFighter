import { GameState } from "../gamestate";
import { gameEntityManager } from "../helpers/GameEntityManager";
import { windowDimensionsProvider } from "../helpers/WindowManager";

gameEntityManager.registerEntitySubsystem('bullet', (entityId, entity) => {
    if (windowDimensionsProvider.isEntityOutside(entity)) {
        gameEntityManager.deleteEntity(entityId);
    }
});
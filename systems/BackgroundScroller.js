import { gameEntityManager } from "../helpers/GameEntityManager";
import { homeEntityManager } from "../helpers/HomeEntityManager";
import { windowDimensionsProvider } from "../helpers/WindowManager";
import { GameState } from "../gamestate";

const backgroundHeight = 1 * 256 * windowDimensionsProvider.getWidth() / 256;

gameEntityManager.registerEntitySubsystem('background', (entityId, entity) => {
    backgroundScroller(gameEntityManager, entityId, entity);
});

homeEntityManager.registerEntitySubsystem('background', (entityId, entity) => {
    backgroundScroller(homeEntityManager, entityId, entity);
});

function backgroundScroller(entityManager, entityId, entity) {
    if (entity.positionY >= 0) {
        entity.positionY = -backgroundHeight;
    }
    entity.positionY += entity.speed * entityManager.getTimeDelta() / 1000
        + GameState.getDifficultyCoefficient() / 10;
}


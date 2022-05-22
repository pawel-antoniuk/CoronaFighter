import { GameState } from "../gamestate";
import { gameEntityManager } from "../helpers/GameEntityManager";

gameEntityManager.registerEntitySubsystem('progressBar', (entityId, entity) => {
    GameState.increaseProgress(gameEntityManager.getTimeDelta());
    entity.progress = GameState.getProgressRatio();
});

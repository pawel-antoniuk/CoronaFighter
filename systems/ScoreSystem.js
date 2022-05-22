import { GameState } from "../gamestate";
import { gameEntityManager } from "../helpers/GameEntityManager";

gameEntityManager.registerEntitySubsystem('score', (entityId, entity) => {
    entity.score = GameState.score;
    entity.level = GameState.level;
});

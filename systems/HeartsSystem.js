import { GameState } from "../gamestate";
import { gameEntityManager } from "../helpers/GameEntityManager";

gameEntityManager.registerEntitySubsystem('hearts', (entityId, entity) => {
    entity.current = GameState.life;
});
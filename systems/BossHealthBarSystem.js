import { GameState } from "../gamestate";
import { gameEntityManager } from "../helpers/GameEntityManager";

gameEntityManager.registerEntitySubsystem('bossHealthBar', (entityId, entity) => {
    const [_, boss] = gameEntityManager.getEntityByType('boss');

    if (boss.bossPhaseCounter <= 300) {
        entity.healthBar = 0;
        return;
    }

    if (boss.mutationState >= 3) {
        entity.position = [boss.position[0], boss.position[1] - 115];
    } else {
        entity.position = [boss.position[0], boss.position[1] - 100];
    }
    entity.healthBar = boss.life / GameState.getBossMaxHealthPoints();
});

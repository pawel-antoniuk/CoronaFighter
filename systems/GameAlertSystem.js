import { GameState } from "../gamestate";
import { gameEntityManager } from "../helpers/GameEntityManager";

gameEntityManager.registerEntitySubsystem('alert', (entityId, entity) => {
    if(entity.messageOpacity <= 0) {
        return;
    }

    entity.messageOpacity -= gameEntityManager.getTimeDelta() / 2000;
});

export function showGameAlert(message) {
    const [_, alert] = gameEntityManager.getEntityByType('alert');
    alert.messageOpacity = 1;
    alert.message = message;
}
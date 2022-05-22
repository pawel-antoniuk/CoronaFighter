import { GameState } from "../gamestate";
import { Dimensions } from "react-native";
import { gameEntityManager } from "../helpers/GameEntityManager";

gameEntityManager.registerEntitySubsystem('bullet', (entityId, entity) => {
    entity.position = [
        entity.position[0] - entity.direction[0] * gameEntityManager.getTimeDelta() / 2,
        entity.position[1] - entity.direction[1] * gameEntityManager.getTimeDelta() / 2
    ];

    if (entity.target == 'virus' || entity.target == 'boss') {
        gameEntityManager.forEntities('virus', (entity2Id, entity2) => {
            if (entity2.hit == 1) {
                return;
            }

            if (gameEntityManager.isCircleCircleCollision(entity, entity2)) {
                gameEntityManager.deleteEntity(entityId)
                entity2.hit = 1;
                GameState.increaseScore(5);
            }
        });
        gameEntityManager.forEntities('boss', (entity2Id, entity2) => {
            if (entity2.life == 0) {
                return;
            }

            if (entity2.mutationState == 0
                || entity2.mutationState == 2
                || entity2.mutationState == 3) {
                return;
            }

            if (gameEntityManager.isCircleCircleCollision(entity, entity2)) {
                gameEntityManager.deleteEntity(entityId)
                entity2.life -= 1;
                GameState.increaseScore(5);
            }
        });
    } else if (entity.target == 'player') {
        const [_, fighter] = gameEntityManager.getEntityByType('fighter');
        if (gameEntityManager.isPointCircleCollision(entity.position[0], entity.position[1],
            fighter)) {
            gameEntityManager.deleteEntity(entityId);
            if (!fighter.barrier) {
                GameState.decreaseLife(1);
            } else {
                const [_, barrier] = gameEntityManager.getEntityByType('barrier');
                barrier.armor -= 1;
            }
        }
    }
});

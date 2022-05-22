import { Dimensions } from 'react-native';
import { GameState } from "../gamestate";
import { gameEntityManager } from "../helpers/GameEntityManager";
import { windowDimensionsProvider } from "../helpers/WindowManager";
import { EntityManager } from '../helpers/EntityManager';

gameEntityManager.registerEntitySubsystem('vaccine', (entityId, entity) => {
    const [_, fighter] = gameEntityManager.getEntityByType('fighter');

    if (gameEntityManager.randomEvent(0.01 * (2 - GameState.getDifficultyCoefficient()))
        && GameState.getProgressRatio() < 1
        && windowDimensionsProvider.isEntityOutside(entity)) {
        entity.position = [
            (windowDimensionsProvider.getWidth() - entity.dimensions[0]) * Math.random(),
            -windowDimensionsProvider.getWidth()
        ];
        entity.hit = 0;
        return;
    }

    entity.position = [
        entity.position[0],
        entity.position[1] + gameEntityManager.getTimeDelta() / 5
    ];

    entity.rotation += gameEntityManager.getTimeDelta() / 1000;
    if (gameEntityManager.isCircleCircleCollision(fighter, entity)) {
        entity.position[1] += 1000;
        GameState.increaseScore(10);
        const [_, barrier] = gameEntityManager.getEntityByType('barrier');
        barrier.armor = 3;
    }
});


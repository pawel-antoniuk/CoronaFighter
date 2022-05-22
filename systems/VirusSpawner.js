import { Dimensions } from 'react-native';
import { GameState } from "../gamestate";
import { VirusBullet } from "../renderers/VirusBullet";
import { gameEntityManager } from "../helpers/GameEntityManager";
import { Virus } from "../renderers/Virus";
import { windowDimensionsProvider } from "../helpers/WindowManager";

gameEntityManager.registerEntitySubsystem('virus', (entityId, entity) => {
    if (windowDimensionsProvider.isEntityOutside(entity)) {
        gameEntityManager.deleteEntity(entityId);
        return;
    }

    // przesuń wirusa
    entity.position = [
        entity.position[0],
        entity.position[1] + entity.speed * gameEntityManager.getTimeDelta()
        // 200,200
    ];

    // break if hit
    if (entity.hit == 1) {
        entity.deadDuration += gameEntityManager.getTimeDelta();
        if (entity.deadDuration > 400) {
            gameEntityManager.deleteEntity(entityId);
        }
        return;
    }

    const [_, fighter] = gameEntityManager.getEntityByType('fighter');

    if (gameEntityManager.randomEvent(0.8 * GameState.getDifficultyCoefficient())) {
        gameEntityManager.spawnEntity('bullet', VirusBullet, createVirusBullet(entity, fighter));
    }

    if (gameEntityManager.isCircleCircleCollision(fighter, entity)) {
        entity.hit = 1;
        if (!fighter.barrier) {
            GameState.decreaseLife(1);
        } else {
            const [_, barrier] = gameEntityManager.getEntityByType('barrier');
            barrier.armor -= 1;
        }
    }
});

gameEntityManager.registerGenericSubsystem(() => {
    if (gameEntityManager.randomEvent(0.8 * GameState.getDifficultyCoefficient())
        && GameState.getProgressRatio() < 1) {
        gameEntityManager.spawnEntity('virus', Virus, createVirus());
    }
});

function createVirus() {
    const r = 40 + Math.random() * 40;
    return {
        position: [(windowDimensionsProvider.getWidth() - r) * Math.random(), -r],
        dimensions: [r, r],
        speed: 0.1 + 0.1 * Math.random(),
        hit: 0,
        deadDuration: 0
    }
}

function createVirusBullet(virus, fighter) {
    const bulletW = 100;
    const bulletH = 80;
    const bulletX = virus.position[0];
    const bulletY = virus.position[1];
    const fighterX = fighter.position[0];
    const fighterY = fighter.position[1];
    const dx = bulletX - fighterX;
    const dy = bulletY - fighterY;
    const len = Math.sqrt(dx * dx + dy * dy);

    return {
        target: 'player',
        position: [bulletX, bulletY],
        // direction: [x - fighterX, y - fighterY],
        dimensions: [bulletW, bulletH],
        frame: 0,
        direction: [dx / len, dy / len],
    };
}
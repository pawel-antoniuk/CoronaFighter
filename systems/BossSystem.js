import { Dimensions } from 'react-native';
import { GameState } from "../gamestate";
import { VirusBullet } from "../renderers/VirusBullet";
import { gameEntityManager } from "../helpers/GameEntityManager";
import { Virus } from "../renderers/Virus";
import { windowDimensionsProvider } from "../helpers/WindowManager";
import { showGameAlert } from './GameAlertSystem';

gameEntityManager.registerEntitySubsystem('boss', (entityId, entity) => {
    if (GameState.getProgressRatio() < 1) {
        resetBoss(entity);
        return;
    }

    entity.visible = true;
    if (entity.mutationState == 0 || entity.mutationState == 1 || entity.mutationState == 4) {
        entity.bossPhaseCounter += gameEntityManager.getTimeDelta() / 15;
    }

    if (entity.bossPhaseCounter <= 500) {
        preBossPhaseEncounter(entity);
    } else {
        if (entity.mutationState == 0) {
            entity.mutationState = 1;
        }
        bossPhaseEncounter(entity);
    }
});

function resetBoss(entity) {
    entity.life = GameState.getBossMaxHealthPoints();
    entity.deadDuration = 0;
    entity.bossPhaseCounter = 0;
    entity.hitTImer = 0;
    entity.mutationState = 0;
    entity.mutationPhaseCounter = 0;
}

function preBossPhaseEncounter(entity) {
    entity.position = [
        windowDimensionsProvider.getWidth() / 2,
        entity.bossPhaseCounter - entity.dimensions[1] - 200
    ];

    if (entity.bossPhaseCounter <= 200) {
        showGameAlert('Beware mortals!');
    } else {
        showGameAlert('Coroned coronavirus\nis coming!');
    }
}

function bossPhaseEncounter(entity) {
    if (entity.life <= 0) {
        entity.deadDuration += gameEntityManager.getTimeDelta();
        if (entity.deadDuration > 400) {
            entity.visible = false;
            entity.bossPhaseCounter = 0;
            GameState.nextLevel();
        }
        return;
    }


    if (entity.life > GameState.getBossMaxHealthPoints() / 2 || entity.mutationState >= 4) {
        movingSideways(entity);
    } else {
        mutationPhaseEncounter(entity);
    }

    bulletShooting(entity);
    checkHit(entity);
}

function bulletShooting(entity) {
    let bulletRangeBegin, bulletRangeEnd, bulletRangeDivider, randomEventValue;

    if (entity.mutationState == 1) {
        bulletRangeBegin = 9;
        bulletRangeEnd = 14;
        bulletRangeDivider = 15;
        randomEventValue = gameEntityManager.randomEvent(0.8 * GameState.getDifficultyCoefficient());
    } else if (entity.mutationState == 3) {
        bulletRangeBegin = 0;
        bulletRangeEnd = 9;
        bulletRangeDivider = 10;
        randomEventValue = gameEntityManager.randomEvent(1.5 * GameState.getDifficultyCoefficient());
    } else if (entity.mutationState == 4) {
        bulletRangeBegin = 9;
        bulletRangeEnd = 14;
        bulletRangeDivider = 15;
        randomEventValue = gameEntityManager.randomEvent(1.0 * GameState.getDifficultyCoefficient());
    }

    const bulletOffset = (2 * Math.random() - 1) * Math.PI / 8;

    if (randomEventValue) {
        let position;
        if (entity.mutationState >= 2) {
            position = [entity.position[0], entity.position[1] + 40];
        } else {
            position = [entity.position[0], entity.position[1] + 20];
        }

        for (let i = bulletRangeBegin; i <= bulletRangeEnd; ++i) {
            gameEntityManager.spawnEntity('bullet',
                VirusBullet, createVirusBullet(position, [
                    Math.cos((1 + i / bulletRangeDivider) * 2 * Math.PI + bulletOffset),
                    Math.sin((1 + i / bulletRangeDivider) * 2 * Math.PI + bulletOffset)
                ]));
        }
    }
}

function movingSideways(entity) {
    entity.position = [
        windowDimensionsProvider.getWidth() / 2
        + Math.sin((entity.bossPhaseCounter - 500) / 100) * 100,
        300 - entity.dimensions[1]
    ];
    entity.rotation = 0;
}

function mutationPhaseEncounter(entity) {
    entity.mutationState = 2;
    entity.rotation += gameEntityManager.getTimeDelta() / 100;

    if (entity.rotation > 2 * Math.PI * 20) {
        entity.mutationState = 4;
        entity.rotation = 0;
    } else if (entity.rotation > 2 * Math.PI * 10) {
        entity.mutationState = 3;
    } else if (entity.rotation > Math.PI * 10) {
        showGameAlert('It seems to be more coroned than before!');
    } else {
        showGameAlert('The virus is mutating!');
    }
}

function createVirusBullet(position, direction) {
    const bulletW = 100;
    const bulletH = 80;
    const bulletX = position[0];
    const bulletY = position[1];

    return {
        target: 'player',
        position: [bulletX, bulletY],
        dimensions: [bulletW, bulletH],
        frame: 0,
        direction: direction,
    };
}

function checkHit(entity) {
    const [_, fighter] = gameEntityManager.getEntityByType('fighter');
    if (gameEntityManager.isCircleCircleCollision(fighter, entity)) {
        if (!fighter.barrier) {
            GameState.decreaseLife(1);
        } else {
            const [_, barrier] = gameEntityManager.getEntityByType('barrier');
            barrier.armor -= 1;
        }
    }
}
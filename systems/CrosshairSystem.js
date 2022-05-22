import { Fire } from "../renderers/Fire";
import { PlayerBullet } from "../renderers/PlayerBullet";
import { gameEntityManager } from "../helpers/GameEntityManager";

gameEntityManager.registerEntitySubsystem('crosshair', (entityId, entity) => {
    gameEntityManager.getTouches('press').forEach(event => {
        if (gameEntityManager.isPointCircleCollision(
            event['event'].pageX, event['event'].pageY, entity)) {

            const [_, fighter] = gameEntityManager.getEntityByType('fighter');

            gameEntityManager.spawnEntity('fire', Fire, createFire(fighter.position[0] - 20,
                fighter.position[1] - 65));
            gameEntityManager.spawnEntity('fire', Fire, createFire(fighter.position[0] + 20,
                fighter.position[1] - 65));
            gameEntityManager.spawnEntity('bullet', PlayerBullet, createBullet(fighter.position[0] - 20,
                fighter.position[1] - 65));
            gameEntityManager.spawnEntity('bullet', PlayerBullet, createBullet(fighter.position[0] + 20,
                fighter.position[1] - 65));
        }
    });
});

function createFire(x, y) {
    return {
        position: [x, y],
        dimensions: [150, 80],
        frame: 0,
    };
}

function createBullet(x, y) {
    return {
        target: 'virus',
        position: [x, y],
        dimensions: [50, 80],
        frame: 0,
        direction: [0, 1],
    };
}

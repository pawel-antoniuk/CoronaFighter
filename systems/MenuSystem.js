import { Fire } from "../renderers/Fire";
import { PlayerBullet } from "../renderers/PlayerBullet";
import { homeEntityManager } from "../helpers/HomeEntityManager";


homeEntityManager.registerEntitySubsystem('logo', (entityId, entity) => {
    entity.size = Math.sin(homeEntityManager.getTimeCurrent() / 500) * 20 + 250;
});

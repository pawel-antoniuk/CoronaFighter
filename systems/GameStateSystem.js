import { GameState } from "../gamestate";
import { gameEntityManager } from "../helpers/GameEntityManager";
import { showGameAlert } from "./GameAlertSystem";

gameEntityManager.registerGenericSubsystem(() => {
    if (GameState.life <= 0) {
        gameEntityManager.dispatch({ type: 'stop' });
    }
    if (GameState.progress <= 3000) {
        if (GameState.level == 1) {
            showGameAlert('Level 1');
        } else {
            showGameAlert(`It\'s not over yet...\nLevel ${GameState.level}`);
        }
    }
});
import { Alert } from "react-native";
import { gameDataService } from "./GameDataService";
import { GameState } from "./gamestate";
import { LevelStyleMap } from "./LevelStyleMap";
import { leadboard } from "./Leadboard";

export class GameOverDialog {
    onSavedCallback = null;

    show() {
        const msg = GameState.life == 0 ? 'You have been infected!' : 'You left the game';

        Alert.alert(msg, `Score: ${GameState.score}
Level: ${GameState.level}
Difficulty: ${LevelStyleMap[GameState.difficulty].name}`, [
            { text: "Cancel", style: "cancel", onPress: () => this.onCancel() },
            { text: "Save", onPress: () => this.onSave() },
            { text: "Save & publish", onPress: () => this.onPublish() },
        ], { cancelable: false });
    }

    onCancel() {
        GameState.reset();
    }

    onSave() {
        gameDataService.saveGameState(() => {
            if (this.onSavedCallback) {
                this.onSavedCallback();
                GameState.reset();
            }
        });
    }

    onPublish() {
        gameDataService.saveGameState(() => {
            if (this.onSavedCallback) {
                this.onSavedCallback();
            }
            
            gameDataService.getUsername(username => {
                leadboard.publishCurrentGameState(username);
                GameState.reset();
            });
        });
    }
}
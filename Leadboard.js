import { GameState } from "./gamestate";

const API_URL = 'http://localhost:3000/leadboard';

class Leadboard {
    getEntries(callback) {
        fetch(API_URL).then(r => r.json()).then(json => {
            callback(json);
        }).catch(err => console.log(err));
    }

    publishCurrentGameState(username) {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                score: GameState.score,
                level: GameState.level,
                difficulty: GameState.difficulty
            })
        }).catch(err => console.log(err));
    }
}

export let leadboard = new Leadboard();
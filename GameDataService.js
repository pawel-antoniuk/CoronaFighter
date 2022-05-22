import SQLite from 'react-native-sqlite-storage';
import { GameState } from './gamestate';

const GameStateDbName = 'gameState.db';

let db = SQLite.openDatabase({ name: GameStateDbName }, null, e => console.log(e));
// db.executeSql('DROP TABLE Settings');

class GameDataService {
    saveGameState(callback) {
        db.transaction(txn => {
            txn.executeSql('CREATE TABLE IF NOT EXISTS GameData (id INTEGER PRIMARY KEY NOT NULL, \
                score INTEGER NOT NULL,\
                life INTEGER NOT NULL,\
                difficulty INTEGER NOT NULL,\
                level INTEGER NOT NULL,\
                date TEXT NOT NULL);', [], (txn, result) => {
                txn.executeSql('INSERT INTO GameData(score, life, difficulty, level, date) VALUES(?, ?, ?, ?, ?);',
                    [GameState.currentLevelScore,
                    GameState.currentLevelLife,
                    GameState.difficulty,
                    GameState.level,
                    new Date().toISOString()], () => callback(), e => console.log(e));
            }, e => console.log(e));
        }, e => console.log(e), null);
    }

    getGameStates(callback) {
        db.transaction(txn => {
            txn.executeSql('SELECT * FROM GameData;', [], (_, result) => {
                callback(result.rows.raw());
            }, e => console.log(e));
        }, e => console.log(e));
    }

    loadGameState(gameState) {
        GameState.reset();
        GameState.score = gameState.score;
        GameState.life = gameState.life;
        GameState.difficulty = gameState.difficulty;
        GameState.level = gameState.level;
        GameState.currentLevelScore = gameState.score;
        GameState.currentLevelLife = gameState.life;
    }

    deleteGameState(gameState, callback) {
        db.transaction(txn => {
            txn.executeSql('DELETE FROM GameData WHERE id=?;', [gameState.id], (_, result) => {
                callback(result.rows.raw());
            }, e => console.log(e));
        }, e => console.log(e));
    }

    saveUsername(username) {
        this.username = username;
        db.transaction(txn => {
            txn.executeSql('CREATE TABLE IF NOT EXISTS Settings (id INTEGER PRIMARY KEY NOT NULL, \
            key INTEGER NOT NULL,\
            value INTEGER NOT NULL);', [], (txn, _) => {
                txn.executeSql('SELECT id, key, value FROM Settings WHERE key = \'username\';', [], (txn, foundUsername) => {
                    console.log(foundUsername.rows.raw());
                    if (foundUsername.rows.length <= 0) {
                        txn.executeSql('INSERT INTO Settings(key, value) VALUES(?, ?);',
                            ['username', username], null, e => console.log(e));
                    } else {
                        txn.executeSql('REPLACE INTO Settings(id, key, value) VALUES(?, ?, ?);',
                            [foundUsername.rows.item(0).id, 'username', username], null, e => console.log(e));
                    }
                }, e => console.log(e));

            }, e => console.log(e));
        });
    }

    getUsername(callback) {
        if (typeof this.username !== 'undefined') {
            callback(this.username);
        } else {
            db.transaction(txn => {
                txn.executeSql('SELECT value FROM Settings WHERE key = \'username\';', [], (_, result) => {
                    this.username = result.rows.item(0).value;
                    callback(this.username);
                }, e => console.log(e));
            }, e => console.log(e));
        }
    }
}

export let gameDataService = new GameDataService();

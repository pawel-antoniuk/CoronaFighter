/**
 * Sample CoronaFighter App
 *
 */

import React, { Component } from "react";
import {
    StyleSheet, StatusBar, View,
    TouchableOpacity, Text} from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Background } from "../renderers/Background";
import { } from "../systems/BackgroundScroller"
import { } from "../systems/MenuSystem"
import { GameState } from "../gamestate";
import { homeEntityManager } from '../helpers/HomeEntityManager';
import { GameOverDialog } from "../GameOverDialog";
import { LevelStyleMap } from "../LevelStyleMap";

export default class LevelSelectionComponent extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ running: true });
            if (GameState.currentLevelScore != 0) {
                new GameOverDialog().show();
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    state = {
        running: false
    };

    entities = {
        1: {
            type: 'background',
            positionY: 0,
            speed: 50,
            source: require('../assets/images/bkgnd1_2x1.png'),
            renderer: <Background />
        },
        2: {
            type: 'background',
            positionY: 0,
            speed: 80,
            source: require('../assets/images/bkgnd2_2x1.png'),
            renderer: <Background />
        },
    };

    onSelectDifficulty(difficulty) {
        this.setState({ running: false });
        GameState.reset();
        GameState.difficulty = difficulty;
        this.props.navigation.navigate('Game')
    }

    render() {
        let levels = [];

        for (let i = 1; i <= 4; ++i) {
            levels.push(
                <TouchableOpacity style={{ ...styles.menuButton, ...LevelStyleMap[i].style }}
                    onPress={() => this.onSelectDifficulty(i)}
                    key={i}>
                    <Text style={styles.menuButtonSymbolText}>{LevelStyleMap[i].symbol}</Text>
                    <Text style={styles.menuButtonText}>{LevelStyleMap[i].name}</Text>
                </TouchableOpacity>)
        }

        return (
            <GameEngine
                ref={(r) => this.engine = r}
                systems={[
                    homeEntityManager.systemCallback.bind(homeEntityManager)
                ]}
                entities={this.entities}
                running={this.state.running}>

                <View style={styles.menuButtonContainer}>
                    <View style={styles.menuButtonList}>
                        <Text style={styles.menuHeaderText}>
                            Select the level of difficulty
                    </Text>
                        {levels}
                    </View>
                </View>
                <StatusBar hidden={true} />
            </GameEngine>
        );
    }
}

const styles = StyleSheet.create({
    menuButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuButtonList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        width: 150,
        height: 150,
        margin: 10,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    menuButtonText: {
        color: '#fff',
        fontSize: 20
    },
    menuButtonSymbolText: {
        color: '#fff',
        fontSize: 40,
    },
    menuHeaderText: {
        color: '#fff',
        fontSize: 25,
        marginBottom: 50
    },
});


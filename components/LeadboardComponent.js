/**
 * Sample CoronaFighter App
 *
 */

import React, { Component } from "react";
import {
    StyleSheet, StatusBar, View,
    Text, FlatList
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Background } from "../renderers/Background";
import { } from "../systems/BackgroundScroller"
import { } from "../systems/MenuSystem"
import { GameState } from "../gamestate";
import { homeEntityManager } from '../helpers/HomeEntityManager';
import { GameOverDialog } from "../GameOverDialog";
import { leadboard } from "../Leadboard";

export default class LeadboardComponent extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ running: true });
            leadboard.getEntries(entries => {
                let newState = [];
                entries.forEach(e => {
                    newState.push({ ...e, key: e.id.toString() });
                });
                newState.sort((l, r) => l.score < r.score);
                this.setState({ leadboard: newState });
            });
            if (GameState.score != 0) {
                new GameOverDialog().show();
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    state = {
        running: false,
        leadboard: []
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

    renderItem(item) {
        return <View style={styles.itemContainer}>
            <Text style={styles.itemScoreHeader}>SCORE {item.item.score}</Text>
            <Text style={styles.itemUsernameSubheader}>{item.item.username}</Text>
            <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemText}>DIFFICULTY {item.item.difficulty}</Text>
                <Text style={styles.itemText}>LEVEL {item.item.level}</Text>
            </View>
        </View>
    }

    render() {
        return (
            <GameEngine
                ref={(r) => this.engine = r}
                systems={[
                    homeEntityManager.systemCallback.bind(homeEntityManager)
                ]}
                entities={this.entities}
                running={this.state.running}>

                <Text style={styles.menuHeaderText}>
                    Leaderboard
                </Text>
                <FlatList
                    data={this.state.leadboard}
                    renderItem={item => this.renderItem(item)}
                    style={styles.leadboardContainer}
                />
                <StatusBar hidden={true} />
            </GameEngine>
        );
    }
}

const styles = StyleSheet.create({
    leadboardContainer: {
        alignSelf: 'center',
        width: '80%',
    },
    itemContainer: {
        margin: 5,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#9A1C40',
    },
    itemDetailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemScoreHeader: {
        fontSize: 20,
        color: '#fff'
    },
    itemUsernameSubheader: {
        fontSize: 15,
        color: '#fff'
    },
    itemText: {
        color: '#fff',
        fontSize: 10,
        width: '50%',
    },
    menuHeaderText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 25,
        height: 60,
        textAlignVertical: 'center'
    },
});

// <View style={styles.menuButton}>
// <Button color='#9A1C40' title="Play" />
// </View>
// <View style={styles.menuButton}>
// <Button color='#9A1C40' title="Leadboard" />
// </View>
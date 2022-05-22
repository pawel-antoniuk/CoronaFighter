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
import { Logo } from "../renderers/Logo";
import { homeEntityManager } from '../helpers/HomeEntityManager';
import { windowDimensionsProvider } from "../helpers/WindowManager";

export default class HomeComponent extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ running: true });
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
        4: {
            type: 'logo',
            position: [0, 20],
            dimensions: [windowDimensionsProvider.getWidth(), windowDimensionsProvider.getWidth()],
            size: 300,
            renderer: <Logo />
        }
    };

    onPlayPressed() {
        this.setState({ running: false });
        this.props.navigation.navigate('Levels')
    }

    onLeaderboardPressed() {
        this.setState({ running: false });
        this.props.navigation.navigate('Leadboard')
    }

    onContinuePressed() {
        this.setState({ running: false });
        this.props.navigation.navigate('Continue')
    }

    onSettingsPressed() {
        this.setState({ running: false });
        this.props.navigation.navigate('Settings')
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
                <View style={styles.menuButtonContainer}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => this.onPlayPressed()}>
                        <Text style={styles.menuButtonText}>New game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => this.onContinuePressed()}>
                        <Text style={styles.menuButtonText}>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => this.onLeaderboardPressed()}>
                        <Text style={styles.menuButtonText}>Leaderboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => this.onSettingsPressed()}>
                        <Text style={styles.menuButtonText}>Settings</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar hidden={true} />
            </GameEngine>
        );
    }
}

const styles = StyleSheet.create({
    menuButtonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300
    },
    menuButton: {
        width: 250,
        margin: 5,
        backgroundColor: '#9A1C40',
        padding: 10,
        borderRadius: 10,
    },
    menuButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    }
});

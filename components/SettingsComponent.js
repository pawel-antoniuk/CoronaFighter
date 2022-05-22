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
import { homeEntityManager } from '../helpers/HomeEntityManager';
import { gameDataService } from "../GameDataService";
import { TextInput } from "react-native-gesture-handler";

export default class SettingsComponent extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ running: true });
            gameDataService.getUsername(u => {
                this.setState({ username: u })
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    state = {
        running: false,
        username: 'unknown'
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

    onSavePressed() {
        gameDataService.saveUsername(this.state.username);
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

                <Text style={styles.menuHeaderText}>Settings</Text>
                <View style={styles.menuOptionContainer}>
                    <Text style={styles.menuText}>Username</Text>
                    <View>
                        <TextInput
                            style={styles.menuTextInput}
                            value={this.state.username}
                            onChangeText={text => this.setState({ username: text })} />
                    </View>
                </View>
                <TouchableOpacity style={styles.menuButton}
                    onPress={() => this.onSavePressed()}>
                    <Text style={styles.menuText}>Save</Text>
                </TouchableOpacity>
                <StatusBar hidden={true} />
            </GameEngine>
        );
    }
}

const styles = StyleSheet.create({
    menuButton: {
        width: 100,
        margin: 5,
        backgroundColor: '#9A1C40',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    menuOptionContainer: {
        backgroundColor: '#9A1C40',
        padding: 10,
        margin: 5,
        borderRadius: 10
    },
    menuText: {
        color: '#fff'
    },
    menuTextInput: {
        backgroundColor: '#803',
        color: '#fff',
        padding: 0,
        marginTop: 5
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
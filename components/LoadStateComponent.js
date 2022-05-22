/**
 * Sample CoronaFighter App
 *
 */

import React, { Component } from "react";
import {
  StyleSheet, StatusBar, View,
  TouchableOpacity, Text, FlatList
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Background } from "../renderers/Background";
import { } from "../systems/BackgroundScroller"
import { } from "../systems/MenuSystem"
import { GameState } from "../gamestate";
import { homeEntityManager } from '../helpers/HomeEntityManager';
import { gameDataService } from "../GameDataService";
import { LevelStyleMap } from "../LevelStyleMap";
import { GameOverDialog } from "../GameOverDialog";

export default class LoadStateComponent extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ running: true });
      if (GameState.currentLevelScore != 0) {
        let dialog = new GameOverDialog();
        dialog.onSavedCallback = () => this.loadGameState();
        dialog.show();
      } else {
        this.loadGameState();
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  state = {
    running: false,
    gameStates: []
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

  loadGameState() {
    gameDataService.getGameStates(results =>
      this.setState({ gameStates: results.map(o => ({ ...o, key: o.id.toString() })) }));
  }

  onGameStateSelected(gameState) {
    this.setState({ running: false });
    gameDataService.loadGameState(gameState);
    this.props.navigation.navigate('Game')
  }

  onGameStateDeleted(gameState) {
    gameDataService.deleteGameState(gameState, () => this.loadGameState());
  }

  renderItem(item) {
    return <View style={styles.menuButtonContainer}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => this.onGameStateSelected(item.item)}>
        <Text style={styles.menuButtonText}>SCORE</Text>
        <Text style={styles.menuButtonText}>{item.item.score}</Text>
        <Text style={styles.menuButtonText}>DIFFICULTY</Text>
        <Text style={styles.menuButtonText}>{LevelStyleMap[item.item.difficulty].name}</Text>
        <Text style={styles.menuButtonText}>LIFE</Text>
        <Text style={styles.menuButtonText}>{item.item.life}</Text>
        <Text style={styles.menuButtonText}>LEVEL</Text>
        <Text style={styles.menuButtonText}>{item.item.level}</Text>
        <Text style={styles.menuButtonText}>DATE</Text>
        <Text style={styles.menuButtonText}>{new Date(Date.parse(item.item.date)).toLocaleDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuButtonDelete}
        onPress={() => this.onGameStateDeleted(item.item)}>
        <Text>❌</Text>
      </TouchableOpacity>
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

        <Text style={styles.menuHeaderText}>Load a saved game</Text>
        <FlatList
          data={this.state.gameStates}
          renderItem={item => this.renderItem(item)}
        />
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuButtonList: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  menuButton: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#9A1C40',
    width: '78%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuButtonDelete: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex'
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 10,
    width: '25%',
  },
  menuHeaderText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    height: 60,
    textAlignVertical: 'center'
  },
  menuButtonContainer: {
    flexDirection: 'row',
  }
});

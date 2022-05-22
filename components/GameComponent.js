/**
 * Sample CoronaFighter App
 *
 */

import React, { PureComponent, Component } from "react";
import { Dimensions, AppRegistry, StyleSheet, StatusBar, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Virus } from "../renderers/Virus";
import { Fighter } from "../renderers/Fighter";
import { Background } from "../renderers/Background";
import { Crosshair } from "../renderers/Crosshair";
import { Hearts } from "../renderers/Hearts";
import { Score } from "../renderers/Score";
import { Pill } from "../renderers/Pill";
import { } from "../systems/MoveFighter"
import { } from "../systems/VirusSpawner"
import { } from "../systems/BackgroundScroller"
import { } from "../systems/FireSystem"
import { } from "../systems/BulletSystem"
import { } from "../systems/CrosshairSystem"
import { } from "../systems/HeartsSystem"
import { } from "../systems/ScoreSystem"
import { } from '../systems/GameStateSystem';
import { } from '../systems/PillSpawner';
import { } from '../systems/VaccineSpawner';
import { } from '../systems/EntityScreenTracker';
import { } from '../systems/BarrierSystem';
import { } from '../systems/ProgressSystem';
import { } from '../systems/BossSystem';
import { } from '../systems/BossHealthBarSystem';
import { showGameAlert } from '../systems/GameAlertSystem';
import { GameState } from "../gamestate";
import { Accelerometer } from "../Accelerometer";
import { gameEntityManager } from '../helpers/GameEntityManager';
import { Vaccine } from "../renderers/Vaccine";
import { Barrier } from "../renderers/Barrier";
import { ProgressBar } from "../renderers/ProgressBar";
import { Boss } from "../renderers/Boss";
import { BossHealthBar } from "../renderers/BossHealthBar";
import { GameAlert } from "../renderers/GameAlert";
import { windowDimensionsProvider } from "../helpers/WindowManager";

export default class GameComponent extends Component {
  constructor() {
    super();

    gameEntityManager.setEntities(this.entities);
    gameEntityManager.spawnEntity('background', Background, {
      positionY: 0,
      speed: 30,
      source: require('../assets/images/bkgnd1_2x1.png'),
    });
    gameEntityManager.spawnEntity('background', Background, {
      positionY: 0,
      speed: 40,
      source: require('../assets/images/bkgnd2_2x1.png'),
    });
    gameEntityManager.spawnEntity('fighter', Fighter, {
      position: [windowDimensionsProvider.getWidth() / 2, windowDimensionsProvider.getHeight() / 2],
      dimensions: [64, 96],
      frame: 0,
      barrier: false
    });
    gameEntityManager.spawnEntity('crosshair', Crosshair, {
      position: [windowDimensionsProvider.getWidth() - 50, windowDimensionsProvider.getHeight() - 50],
      dimensions: [60, 60],
    });
    gameEntityManager.spawnEntity('progressBar', ProgressBar, {
      progress: 0,
    });
    gameEntityManager.spawnEntity('barrier', Barrier, {
      position: [windowDimensionsProvider.getWidth() / 2 - 64, windowDimensionsProvider.getHeight() - 200],
      dimensions: [120, 120],
      frame: 0,
      armor: 0
    });
    gameEntityManager.spawnEntity('vaccine', Vaccine, {
      position: [10, 1000],
      dimensions: [40, 40],
      rotation: 0,
    });
    gameEntityManager.spawnEntity('pill', Pill, {
      position: [10, 1000],
      dimensions: [40, 40],
      rotation: 0,
    });
    gameEntityManager.spawnEntity('hearts', Hearts, {
      position: [20, 20],
      dimensions: [20, 20],
      count: GameState.maxLife,
      current: GameState.maxLife,
      offset: 3,
    });
    gameEntityManager.spawnEntity('boss', Boss, {
      position: [100, 100],
      dimensions: [97.5, 142.5],
      dimensionsMutatedScale: [1, 239 / 190],
      life: 10,
      deadDuration: 0,
      bossPhaseCounter: 0,
      hitTImer: 0,
      mutationState: 0,
      mutationPhaseCounter: 0
    });
    gameEntityManager.spawnEntity('bossHealthBar', BossHealthBar, {
      healthPoints: 0,
      healthBar: 0,
      position: [0, 0]
    });
    gameEntityManager.spawnEntity('score', Score, {
      value: 0,
    });
    gameEntityManager.spawnEntity('alert', GameAlert, {
      message: 'Test message',
      messageOpacity: 0,
    });

    showGameAlert(`Level ${GameState.level}`);
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ running: true });
    });
    Accelerometer.start();
  }

  componentWillUnmount() {
    this.unsubscribe();
    Accelerometer.stop();
  }

  state = {
    running: false
  };

  entities = {
  };

  nextEntityId = parseInt(Object.keys(this.entities).slice(-1)[0]) + 1;

  onEvent(e) {
    if (e.type === 'stop') {
      this.setState({ running: false });
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <GameEngine
        ref={(r) => this.engine = r}
        style={styles.container}
        systems={[gameEntityManager.systemCallback.bind(gameEntityManager)]}
        entities={this.entities}
        onEvent={(e) => this.onEvent(e)}
        running={this.state.running}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

import { showGameAlert } from "./systems/GameAlertSystem";

export const GameState = {
    score: 0,
    life: 5,
    maxLife: 5,
    difficulty: 1,
    progress: 0,
    maxProgress: 40000,
    level: 1,
    currentLevelScore: 0,
    currentLevelLife: 0,

    reset() {
        this.score = 0;
        this.life = this.maxLife;
        this.progress = 0;
        this.level = 1;
        this.currentLevelScore = 0;
        this.currentLevelLife = this.maxLife;
    },

    increaseScore(points) {
        this.score += Math.floor(points * (1 + (this.getDifficultyCoefficient() - 1) / 3));
    },

    decreaseLife(hearts) {
        if (this.life > 0) {
            this.life -= hearts;
        }
    },

    increaseProgress(deltaTime) {
        if (this.progress < this.maxProgress) {
            this.progress += deltaTime;
        }
    },

    getProgressRatio() {
        return this.progress / this.maxProgress;
    },

    nextLevel() {
        this.currentLevelScore = this.score;
        this.currentLevelLife = this.life;
        this.progress = 1;
        this.level += 1;        
    },

    getBossMaxHealthPoints() {
        return 60 + this.getDifficultyCoefficient() * 100;
    },

    getDifficultyCoefficient() {
        const x = this.level * this.difficulty;
        return Math.log(x + 1) / Math.log(20);
    }
    
}
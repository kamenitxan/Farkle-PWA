import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreCalculatorService {

  constructor() { }

  private SCORE_RULES: Record<string, number> = {
    "1": 100,
    "5": 50,
    "111": 1000,
    "123456": 1500,
    "12345": 500,
    "23456": 750
  };

  calculateScore(dice: DiceRoll): number {
    const counts = this.countOccurrences(dice);
    let score = 0;
    let remainingDice = [...dice];

    // Check for full straight (1-6)
    if (dice.length === 6 && new Set(dice).size === 6) {
      return this.SCORE_RULES["123456"];
    }

    // Check for partial straights (1-5 or 2-6)
    if (new Set(dice).size === 5) {
      if (dice.includes(1) && !dice.includes(6)) {
        return this.SCORE_RULES["12345"];
      }
      if (dice.includes(6) && !dice.includes(1)) {
        return this.SCORE_RULES["23456"];
      }
    }

    console.log("counts", counts);
    // Check for multiples of a kind
    for (let [die, count] of Object.entries(counts)) {
      const num = parseInt(die);
      if (count >= 3) {
        let baseScore = num === 1 ? 1000 : num * 100;
        let multiplier = 1 << (count - 3); // Doubles for four or more
        score += baseScore * multiplier;
        remainingDice = remainingDice.filter(d => d !== num);
      }
    }

    console.log("remainingDice", remainingDice);
    // Check for single 1s and 5s
    for (let die of remainingDice) {
      if (die === 1 || die === 5) {
        score += this.SCORE_RULES[die.toString()] || 0;
      }
    }

    return score;
  }

  private countOccurrences(dice: DiceRoll): Record<number, number> {
    return dice.reduce((acc, die) => {
      acc[die] = (acc[die] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }
}

type DiceRoll = number[];

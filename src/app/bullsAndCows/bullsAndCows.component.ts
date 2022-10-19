import { Component } from "@angular/core";

@Component({
    selector: 'bullsAndCows',
    templateUrl: 'bullsAndCows.component.html',
    styleUrls: ['bullsAndCows.component.css']
})

export class BullsAndCows {
    correctNumber: number[] = [];
    guessHistory: Attempt[] = [];
    playerGuess: number = 0;
    checkInput: CheckCnB = new CheckCnB(0, 0);
    showInput: boolean = false;
    isGameWon: boolean = false;
    isGameStarted: boolean = false;

    gameStart() {
        if (this.isGameWon === true) {
            this.isGameWon = false;
        }
        this.isGameStarted = true;
        this.guessHistory = [];
        this.randomNumberGenerator();
        this.showInput = true;
        console.log("Correct number is: ", this.correctNumber)
    }

    randomNumberGenerator() {
        for (let a = [1, 2, 3, 4, 5, 6, 7, 8, 9], i = a.length; i--;) {
            var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
            this.correctNumber.push(random);
        }
        this.correctNumber.splice(4, 9);
    }

    guessSaver() {
        let attempt: Attempt = {
            playerGuess: this.playerGuess,
            bulls: this.checkInput.bulls,
            cows: this.checkInput.cows
        }
        this.guessHistory.push(attempt);
    }

    submitAnswer() {
        let guessDigit1: number = Math.floor(this.playerGuess / 1000) % 10;
        let guessDigit2: number = Math.floor(this.playerGuess / 100) % 10;
        let guessDigit3: number = Math.floor(this.playerGuess / 10) % 10;
        let guessDigit4: number = Math.floor(this.playerGuess / 1) % 10;

        let digitToCheck1: number = this.correctNumber[0];
        let digitToCheck2: number = this.correctNumber[1];
        let digitToCheck3: number = this.correctNumber[2];
        let digitToCheck4: number = this.correctNumber[3];

        if (digitToCheck1 === guessDigit1) {
            this.checkInput.bulls++;
        }
        if (digitToCheck2 === guessDigit2) {
            this.checkInput.bulls++;
        }
        if (digitToCheck3 === guessDigit3) {
            this.checkInput.bulls++;
        }
        if (digitToCheck4 === guessDigit4) {
            this.checkInput.bulls++;
        }

        if (digitToCheck1 === guessDigit2) {
            this.checkInput.cows++;
        }
        else if (digitToCheck1 === guessDigit3) {
            this.checkInput.cows++;
        }
        else if (digitToCheck1 === guessDigit4) {
            this.checkInput.cows++;
        }

        if (digitToCheck2 === guessDigit1) {
            this.checkInput.cows++;

        } else if (digitToCheck2 === guessDigit3) {
            this.checkInput.cows++;

        } else if (digitToCheck2 === guessDigit4) {
            this.checkInput.cows++;
        }

        if (digitToCheck3 === guessDigit1) {
            this.checkInput.cows++;

        } else if (digitToCheck3 === guessDigit2) {
            this.checkInput.cows++;

        } else if (digitToCheck3 === guessDigit4) {
            this.checkInput.cows++;
        }

        if (digitToCheck4 === guessDigit1) {
            this.checkInput.cows++;

        } else if (digitToCheck4 === guessDigit2) {
            this.checkInput.cows++;

        } else if (digitToCheck4 === guessDigit3) {
            this.checkInput.cows++;
        }

        this.guessSaver();

        if (this.checkInput.bulls === 4) {
            this.isGameWon = true;
            this.correctNumber = [];
            this.isGameStarted = false;
        }

        this.checkInput.bulls = 0;
        this.checkInput.cows = 0;

    }
}

class Attempt {
    playerGuess: number;
    bulls: number;
    cows: number;

    constructor(playerGuess: number, bulls: number, cows: number) {
        this.playerGuess = playerGuess;
        this.bulls = bulls;
        this.cows = cows;
    }
}

class CheckCnB {
    constructor(public bulls: number, public cows: number) {
    }
}
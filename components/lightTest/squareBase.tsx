//вернуть целое число в промежутке [min, max)
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

//средне квадратичное отклонение
export const sampleStandartDeviation = (numbers: any[]) => {
  const avg = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
  const s = numbers.reduce((acc, curr) => acc + (avg - curr) ** 2, 0);
  return Math.sqrt(s / (numbers.length - 1));
};

//

function send(
  avg: string,
  total: any,
  correct: any,
  misses: any,
  score: string
) {
  const avg_time = document.getElementById("avg_time") as HTMLInputElement;
  if (avg_time) avg_time.value = avg;

  const total_time = document.getElementById("total_time") as HTMLInputElement;
  if (total_time) total_time.value = total;

  const correctInput = document.getElementById("correct") as HTMLInputElement;
  if (correctInput) correctInput.value = correct;

  const missesInput = document.getElementById("misses") as HTMLInputElement;
  if (missesInput) missesInput.value = misses;

  const scoreInput = document.getElementById("score") as HTMLInputElement;
  if (scoreInput) scoreInput.value = score;

  const submitButtonInput = document.getElementById(
    "submitButton"
  ) as HTMLInputElement;
  if (submitButtonInput) submitButtonInput.click();
}

export class Result {
  min: any;
  max: any;
  message: any;
  constructor(min: any, max: any, message: any) {
    this.min = min;
    this.max = max;
    this.message = message;
  }

  checkValue(value: number) {
    return value >= this.min && value < this.max;
  }
}

class SquareBase {
  squares: any;
  startButton: any;
  resultLabel: any;
  progressBar: any;
  amount: any;
  baseColor: any;
  colors: string[];
  getMessage: () => any;
  endMessage: any;
  totalTime: number;
  curSquare: number;
  correct: number;
  incorrect: number;
  num: number;
  isActive: boolean;
  time: number;
  reactionTimes: any[];

  constructor(
    squares: any,
    startButton: any,
    resultLabel: any,
    progressBar: any,
    amount: any
  ) {
    this.squares = squares;
    this.startButton = startButton;
    this.resultLabel = resultLabel;
    this.progressBar = progressBar;
    this.amount = amount;
    this.baseColor = squares[0].style.backgroundColor;
    this.colors = ["red", "yellow", "green"];
    this.getMessage = () => "";
    this.totalTime = 0;
    this.curSquare = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.num = 0;
    this.isActive = false;
    this.time = performance.now();
    this.reactionTimes = [];

    this.reset();
  }

  attachTest(test: any) {
    this.startButton.onclick = () => {
      this.setLabel("Тест начался!");
      this.startButton.style.display = "none";
      test();
    };
  }

  setMessage(func: () => string) {
    this.getMessage = func;
  }

  setEndMessage(func: any) {
    this.endMessage = func;
  }

  reset() {
    this.totalTime = 0;
    this.curSquare = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.num = 0;
    this.isActive = false;
    this.time = performance.now();
    this.reactionTimes = [];
    this.progressBar.value = 0;

    this.resetColors();
  }

  setLabel(text: string) {
    this.resultLabel.innerHTML = text;
  }

  chooseResult(results: string | any[], value: any) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].checkValue(value)) {
        return results[i].message;
      }
    }
  }

  getAverageTime() {
    return Math.round(this.totalTime || 0 / this.num);
  }

  addReactionTime(time: number) {
    this.reactionTimes.push(time);
    this.totalTime += Math.round(time);
  }

  step(color: any, time: number | undefined, index: number | undefined) {
    if (index == undefined) {
      index = this.nextRandomSquare();
    }
    setTimeout(() => {
      if (this.checkCurrentSquare()) {
        this.incorrect++;
      }
      this.updateTime();
      this.changeCurrentSquareColor(this.baseColor);
      this.curSquare = index || 0;
      this.changeCurrentSquareColor(color);
      this.num++;
      this.time = performance.now();
    }, time);
  }

  updateTime() {
    if (this.checkCurrentSquare()) {
      this.addReactionTime(performance.now() - this.time);
    }
    this.setLabel(this.getMessage());
    this.progressBar.value = Math.round((this.num / this.amount) * 100);
  }

  end(time: number | undefined) {
    setTimeout(() => {
      this.updateTime();
      this.resetColors();

      const avg = this.getAverageTime();

      this.setLabel(this.endMessage());
      //   document.removeEventListener("keydown", this.listener);

      this.startButton.style.display = "block";
      send(
        `${this.getAverageTime()}`,
        this.totalTime,
        this.correct,
        this.incorrect,
        `${Math.round((this.correct * 100) / (this.correct + this.incorrect))}`
      );
    }, time);
  }
  //   listener(arg0: string, listener: any) {
  //     throw new Error("Method not implemented.");
  //   }

  //square methods
  resetColors() {
    for (let i = 0; i < this.squares.length; i++) {
      this.changeSquareColor(i, this.baseColor);
    }
  }

  changeCurrentSquareColor(color: any) {
    this.changeSquareColor(this.curSquare, color);
  }

  changeSquareColor(index: number, color: any) {
    this.squares[index].style.backgroundColor = color;
  }

  checkCurrentSquare() {
    return this.checkSquare(this.curSquare);
  }

  checkSquare(index: number) {
    return this.squares[index].style.backgroundColor !== this.baseColor;
  }

  nextSquare() {
    return (this.curSquare + 1) % this.squares.length;
  }

  nextRandomSquare() {
    return getRandomInt(0, this.squares.length);
  }
}

export default SquareBase;

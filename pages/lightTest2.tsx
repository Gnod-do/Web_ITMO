import React, { useEffect } from "react";

const lightTest2 = () => {
  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  //средне квадратичное отклонение
  const sampleStandartDeviation = (numbers: any[]) => {
    const avg = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
    const s = numbers.reduce((acc, curr) => acc + (avg - curr) ** 2, 0);
    return Math.sqrt(s / (numbers.length - 1));
  };
  function send(
    avg: string,
    total: any,
    correct: any,
    misses: any,
    score: string
  ) {
    const avg_time = document.getElementById("avg_time") as HTMLInputElement;
    if (avg_time) avg_time.value = avg;

    const total_time = document.getElementById(
      "total_time"
    ) as HTMLInputElement;
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

  class Result {
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
      this.baseColor = squares?.[0]?.style.backgroundColor;
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
          `${Math.round(
            (this.correct * 100) / (this.correct + this.incorrect)
          )}`
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

  class LightReaction extends SquareBase {
    public results: any;
    public attachTest: any;
    public setEndMessage: any;
    public listener: any;
    public reset: any;
    public colors: any;
    public amount: any;
    public step: any;
    public end: any;
    public checkCurrentSquare: any;
    public setLabel: any;
    public incorrect: any;
    public correct: any;
    public updateTime: any;
    public changeCurrentSquareColor: any;
    public baseColor: any;
    public num: any;
    public getAverageTime: any;
    public chooseResult: any;

    constructor(
      squares: NodeListOf<Element>,
      startButton: any,
      resultLabel: any,
      progressBar: HTMLElement | null,
      amount = 10
    ) {
      super(squares, startButton, resultLabel, progressBar, amount);
      this.results = [
        new Result(0, 300, "У вас отличная простая реакция!"),
        new Result(300, 400, "У вас хорошая простая реакция!"),
        new Result(400, 600, "У вас удовлетворительная простая реакция!"),
        new Result(800, 10000, "У вас неудовлетворительная простая реакция!"),
      ];

      this.attachTest(this.start.bind(this));
      this.setMessage(this.getMessage);
      this.setEndMessage(this.getEndMessage);
      this.listener = (event: { code: string }) => {
        if (event.code !== "Space") {
          return;
        }
        this.clickHandler();
      };
    }

    start() {
      this.reset();

      const color = this.colors[getRandomInt(0, this.colors.length)];
      let time = 1000;

      for (let i = 0; i < this.amount; i++) {
        time = time + getRandomInt(1000, 2000);
        this.step(color, time);
      }

      document.addEventListener("keydown", this.listener);
      this.end(time + 2000);
    }

    clickHandler() {
      if (!this.checkCurrentSquare()) {
        this.setLabel("Вы нажали слишком рано!");
        this.incorrect++;
        return;
      }
      this.correct++;
      this.updateTime();
      this.changeCurrentSquareColor(this.baseColor);
    }

    getMessages() {
      return `Пройдено: ${this.num}/${
        this.amount
      }. Среднее время реакции: ${this.getAverageTime()} мс`;
    }

    getEndMessage() {
      return `Поздравляем: ${this.chooseResult(
        this.results,
        this.getAverageTime()
      )} (${this.getAverageTime()} мс)`;
    }
  }

  useEffect(() => {
    const windowClick = (event: any) => {
      const modal = document.getElementById("modal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    };

    //блокировать нажатие на кнопку при нажатии пробела или enter
    const keydownEvent = (event: any) => {
      console.log(event.code);
      if (event.code === "Space" || event.code == "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", keydownEvent);

    window.addEventListener("click", windowClick);

    const arg1 = document.querySelectorAll("#test .field .square");
    const arg2 = document.querySelector("#test .btn");
    const arg3 = document.querySelector("#test .result");
    const arg4 = document.getElementById("progress");

    const t = new LightReaction(arg1, arg2, arg3, arg4);
  });

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <button
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Тест на свет</title>
      <h1>Тест на свет</h1>
      <button className="instructions-button" onClick={openModalW}>
        Инструкция
      </button>
      <p />
      <div id="modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModalW}>
            ×
          </span>
          <h2>Инструкция</h2>
          <p>
            Для начала теста, нажмите кнопку "Начать тест". <br />
            Квадраты начнут менять цвет. <br />
            Вам надо как можно быстрее нажимать "пробел", когда вы увидите, что
            какой-то квадрат сменил цвет.
          </p>
        </div>
      </div>
      <p>Нажимайте "пробел", когда квадрат сменит цвет!</p>
      <progress id="progress" value={0} max={100} />
      <div className="test" id="test">
        <div className="field">
          <div className="square" />
          <div className="square" />
          <div className="square" />
        </div>
        <button className="btn start">Начать тест</button>
        <div className="result">Здесь будет отображен результат</div>
      </div>
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Свет"
        />
        <input type="hidden" name="avg_time" id="avg_time" />
        <input type="hidden" name="total_time" id="total_time" />
        <input type="hidden" name="correct" id="correct" />
        <input type="hidden" name="misses" id="misses" />
        <input type="hidden" name="score" id="score" />
        <input
          id="submit-button"
          type="submit"
          defaultValue="Submit"
          style={{ display: "none" }}
        />
      </form>
    </div>
  );
};

export default lightTest2;

import React, { useEffect } from "react";

const memory = () => {
  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }

  //вернуть целое число в промежутке [min, max)
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  //средне квадратичное отклонение
  const sampleStandartDeviation = (numbers: number[]) => {
    const avg = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
    const s = numbers.reduce((acc, curr) => acc + (avg - curr) ** 2, 0);
    return Math.sqrt(s / (numbers.length - 1));
  };

//   function send(avg: any, total: any, correct: any, misses: any, score: any) {
//     const avg_time = document.getElementById("avg_time") as HTMLInputElement;
//     avg_time.value = avg;
//     const total_time = document.getElementById(
//       "total_time"
//     ) as HTMLInputElement;
//     total_time.value = total;
//     const correctInput = document.getElementById("correct") as HTMLInputElement;
//     correctInput.value = correct;
//     const missesInput = document.getElementById("misses") as HTMLInputElement;
//     missesInput.value = misses;
//     const scoreInput = document.getElementById("score") as HTMLInputElement;
//     scoreInput.value = score;
//     const submitButton = document.getElementById(
//       "submit-button"
//     ) as HTMLInputElement;
//     submitButton.click();
//   }

  class Result {
    min: number;
    message: any;
    max: number;
    constructor(min: number, max: number, message: any) {
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
    // squares: any,
    // startButton: any,
    // resultLabel: any,
    // progressBar: any,
    // amount: any
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

    setMessage(func: any) {
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
      return Math.round(this.totalTime / this.num);
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
        // document.removeEventListener("keydown", this.listener)

        this.startButton.style.display = "block";
        // send(
        //   this.getAverageTime(),
        //   this.totalTime,
        //   this.correct,
        //   this.incorrect,
        //   Math.round((this.correct * 100) / (this.correct + this.incorrect))
        // );
      }, time);
    }

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

  class MemoryReaction extends SquareBase {
    codes: string[];
    colorHistory: any[];
    listener: (event: { code: any }) => void;
    constructor(
      squares: NodeListOf<Element>,
      startButton: any,
      resultLabel: any,
      progressBar: HTMLElement | null,
      amount = 10
    ) {
      super(squares, startButton, resultLabel, progressBar, amount);

      this.codes = ["Enter", "Space"];
      this.colorHistory = [];

      this.attachTest(this.start.bind(this));
      this.setMessage(this.getMessage);
      this.setEndMessage(this.getEndMessage);
      this.listener = (event: { code: any }) => {
        if (!this.codes.includes(event.code)) {
          return;
        }
        this.clickHandler(event.code);
      };
    }

    start() {
      this.reset();
      this.generateColors();

      let time = 1000;

      for (let i = 0; i < this.amount; i++) {
        time += getRandomInt(1000, 2000);
        this.step(this.colorHistory[i], time, this.nextRandomSquare());
      }

      document.addEventListener("keydown", this.listener);
      this.end(time + 2000);
    }

    generateColors() {
      this.colorHistory = [];
      for (let i = 0; i < this.amount; i++) {
        this.colorHistory.push(
          this.colors[getRandomInt(0, this.colors.length)]
        );
      }
      console.log(this.colorHistory);
    }

    clickHandler(code: string) {
      if (!this.checkCurrentSquare()) {
        this.setLabel("Вы нажали слишком рано!");
        this.incorrect++;
        return;
      }

      if (
        this.num == 1 ||
        (this.colorHistory[this.num - 1] == this.colorHistory[this.num - 2] &&
          code == "Space") ||
        (this.colorHistory[this.num - 1] !== this.colorHistory[this.num - 2] &&
          code == "Enter")
      ) {
        this.correct++;
      } else {
        this.incorrect++;
      }
      this.updateTime();
      this.changeCurrentSquareColor(this.baseColor);
    }

    getMessage() {
      return `Пройдено: ${this.num}/${this.amount}. Правильно: ${
        this.correct
      }. Неправильно: ${
        this.incorrect
      }. Среднее время реакции: ${this.getAverageTime()} мс`;
    }

    getEndMessage() {
      return `Ваша реакция: (${this.getAverageTime()} мс). Правильных ответов: ${
        this.correct
      }`;
    }
  }

  // const t = new MemoryReaction(
  //     document.querySelectorAll("#test .field .square"),
  //     document.querySelector("#test .btn"),
  //     document.querySelector("#test .result"),
  //     document.getElementById("progress")
  // )

  useEffect(() => {
    const windowClick = (event: any) => {
      const modal = document.getElementById("modal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    };

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

    const t = new MemoryReaction(arg1, arg2, arg3, arg4);
  });
  return (
    <div style={{backgroundImage: 'linear-gradient(105.07deg, rgb(85, 211, 211) -64.38%, rgb(43, 58, 186) 138.29%)'}}>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/memorieTest.css" />
      <link rel="stylesheet" href="css/progressBar.css" />
      <button style={{display: 'none'}}
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Тест на память</title>
      <h1 style={{marginTop: '0'}}>Тест на память</h1>
      <button className="instructions-button" onClick={openModalW} style={{display: 'none'}}>
        Инструкция
      </button>
      <p></p>
      <div id="modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModalW}>
            ×
          </span>
          <h2>Инструкция</h2>
          <p>
            Для начала теста, нажмите кнопку "Начать тест". <br />
            Начнут появляться квадраты разных цветов. <br />
            Если цвет изменился, нажмите "enter" <br />
            Если цвет НЕ изменился, нажмите "пробел"
          </p>
        </div>
      </div>
      <p>Нажимайте "пробел", если цвет не изменился. Иначе - "enter"</p>
      <progress id="progress" value={0} max={100} style={{marginBottom: '0'}}/>
      <div className="test" id="test">
        <div className="field">
          <div className="square" style={{borderRadius:'50%'}}/>
          <div className="square" style={{borderRadius:'50%'}}/>
          <div className="square" style={{borderRadius:'50%'}}/>
        </div>
        <button className="btn start" style={{borderRadius: '0', backgroundColor:'#00FF00', color:'black'}}>Начать тест</button>
        <div className="result" style={{display:'block', textAlign: 'center', width:'100%', height:'50px', paddingLeft:'0', margin: '4% 4% 0 0'}}>Здесь будет отображен результат</div>
      </div>
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Память"
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

export default memory;

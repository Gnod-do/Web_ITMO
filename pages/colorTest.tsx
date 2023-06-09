import React, { useEffect } from "react";
import { getTestResult, setTestResult } from "../utils/globals";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const colorTest2 = () => {
  const { data: session }: any = useSession();
  let email: any;
  let result: any;

  function showNotification() {
    const message = "Your result saved!"; 
    const notification = document.createElement("div"); 
    notification.innerText = message; 
    notification.classList.add("notification"); 
    document.body.appendChild(notification); 
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }

  let correct: any = 0;
  let time: number = 0;
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
    
    let email: any;
    let tmp: number = 0;
    if (correct*10  < 21) tmp = 0.25;
    if (correct*10  < 61 && correct*10  > 20) tmp = 0.5;
    if (correct*10  < 91 && correct*10  > 60) tmp = 0.8;
    if (correct*10  > 90) tmp = 1;
    const data = {
      email: session?.user?.email,
      testNumber: "test12",
      percent: correct*10 + "%",
      speed: avg + "ms",
      coefficient: 0,
    };
    tmp = 0;
    console.log(email);
    console.log("1233");
    axios
      .post("http://localhost:3000/api/auth/updateResult", data)
      .then((response) => {
        // Xử lý phản hồi từ server sau khi cập nhật thành công
        console.log(response.data); // In ra phản hồi từ server (tùy chỉnh theo yêu cầu)
      })
      .catch((error: AxiosError) => {
        // Xử lý lỗi trong quá trình gửi request
        console.error(error);
      });
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

    reactionTimes: any[];
    time: number;

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
        this.setLabel("The test has begun!");
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

  class ColorReaction extends SquareBase {
    results: Result[];
    codes: string[];
    listener: (event: any) => void;
    constructor(
      squares: NodeListOf<Element>,
      startButton: Element | null,
      resultLabel: Element | null,
      progressBar: HTMLElement | null,
      amount = 10
    ) {
      super(squares, startButton, resultLabel, progressBar, amount);
      this.results = [
        new Result(9, 1000, "You have a great complex reaction!"),
        new Result(7, 9, "You have a good complex reaction!"),
        new Result(5, 7, "You have a satisfactory complex reaction!"),
        new Result(0, 5, "You have an unsatisfactory complex reaction!"),
      ];

      this.codes = ["Digit1", "Digit2", "Digit3"];

      this.attachTest(this.start.bind(this));
      this.setMessage(this.getMessage);
      this.setEndMessage(this.getEndMessage);
      this.listener = (event) => {
        if (!this.codes.includes(event.code)) {
          return;
        }
        this.clickHandler(event.code);
      };
    }

    start() {
      this.reset();

      let time = 1000;

      for (let i = 0; i < this.amount; i++) {
        let index = getRandomInt(0, this.squares.length);
        time += getRandomInt(1000, 2000);
        this.step(this.colors[index], time, index);
      }

      document.addEventListener("keydown", this.listener);
      this.end(time + 2000);
    }

    clickHandler(code: any) {
      if (!this.checkCurrentSquare()) {
        this.setLabel("You clicked too soon!");
        this.incorrect++;
        return;
      }

      if (this.codes.indexOf(code) == this.curSquare) {
        this.correct++;
      } else {
        this.incorrect++;
      }
      this.updateTime();
      this.changeCurrentSquareColor(this.baseColor);
    }

    public getMessage(): string {
      return `Passed: ${this.num}/${this.amount}. Right: ${
        this.correct
      }. Wrong: ${
        this.incorrect
      }. Average reaction time: ${this.getAverageTime()} ms`;
    }

    getEndMessage() {
      return `Congratulations: ${this.chooseResult(
        this.results,
        this.correct
      )} (${this.getAverageTime()} ms). Correct answers: ${this.correct}`;
    }
  }

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

    const t = new ColorReaction(arg1, arg2, arg3, arg4);

    function submit() {
      const submitButton = document.getElementById(
        "submit-button"
      ) as HTMLInputElement;
      submitButton.click();
    }
  });
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/squareTest.css" />
      <link rel="stylesheet" href="css/progressBar.css" />
      <title>Color Test</title>
      <h1>Color Test</h1>
      <p></p>
      <p>
        Press "1", "2" or "3" when the square changes color! When completing the
        test, click the Submit button, your data is stored
      </p>
      <progress id="progress" value={0} max={100} />
      <div className="test" id="test">
        <div className="field">
          <div className="square">1</div>
          <div className="square">2</div>
          <div className="square">3</div>
        </div>
        <button className="btn start">Begin</button>
        <button
          className="btn start"
          style={{
            borderRadius: "0",
            backgroundColor: "#00FF00",
            color: "black",
          }}
          onClick={showNotification}
        >
          Submit
        </button>
        <div className="result">The result will be displayed here</div>
      </div>
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Цвет"
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

export default colorTest2;

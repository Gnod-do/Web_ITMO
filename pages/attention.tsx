import React, { useEffect } from "react";
import { getTestResult, setTestResult } from "../utils/globals";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const attention = () => {
  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }

  const { data: session }: any = useSession();
  let email: any;
  let result: any;

  function updateRs() {
    const correctInput = document.getElementById("correct") as HTMLInputElement;
    if (correctInput) correctInput.value = result;
    const data = {
      email: session?.user?.email,
      testNumber: "test4",
      percent: (correctAnswers * 10).toFixed(0) + "%",
      speed: avgCorrectReactionTime.toString() + "Мс",
    };
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

  let correctAnswers: number = 0;

  let avgCorrectReactionTime: number = 0;

  useEffect(() => {
    const windowClick = (event: any) => {
      const modal = document.getElementById("modal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    };

    const words = ["red", "green", "blue", "orange", "yellow", "pink"];
    const colors = ["red", "green", "blue", "orange", "yellow", "pink"];
    let wordIndex: number;
    let colorIndex: any;
    let answer = "";
    let count: number = 0,
      correctReactionTime: number,
      incorrectReactionTime = 0;
    let startTime: number;
    let averageReactionTime = 0;

    const start = document.getElementById("start") as HTMLInputElement;
    if (start)
      start.addEventListener("click", function () {
        start.style.display = "none";
        enableButtons();
        startTest();
      });

    function enableButtons() {
      const red = document.getElementById("red") as HTMLInputElement;
      if (red) red.disabled = false;
      const green = document.getElementById("green") as HTMLInputElement;
      if (green) green.disabled = false;
      const blue = document.getElementById("blue") as HTMLInputElement;
      if (blue) blue.disabled = false;
      const orange = document.getElementById("orange") as HTMLInputElement;
      if (orange) orange.disabled = false;
      const yellow = document.getElementById("yellow") as HTMLInputElement;
      if (yellow) yellow.disabled = false;
      const pink = document.getElementById("pink") as HTMLInputElement;
      if (pink) pink.disabled = false;
    }

    function disableButtons() {
      const red = document.getElementById("red") as HTMLInputElement;
      if (red) red.disabled = true;
      const green = document.getElementById("green") as HTMLInputElement;
      if (green) green.disabled = true;
      const blue = document.getElementById("blue") as HTMLInputElement;
      if (blue) blue.disabled = true;
      const orange = document.getElementById("orange") as HTMLInputElement;
      if (orange) orange.disabled = true;
      const yellow = document.getElementById("yellow") as HTMLInputElement;
      if (yellow) yellow.disabled = true;
      const pink = document.getElementById("pink") as HTMLInputElement;
      if (pink) pink.disabled = true;
    }

    function startTest() {
      correctAnswers = 0;
      let correctAnswersElement = document.getElementById(
        "correctAnswers"
      ) as HTMLInputElement;
      if (correctAnswersElement) {
        correctAnswersElement.innerText = "";
        correctAnswers = 0;
      }

      const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
      scoreMy.innerText = "";
      const progress = document.getElementById("progress") as HTMLInputElement;
      progress.value = "0";
      count = 0;
      correctReactionTime = 0;
      incorrectReactionTime = 0;
      averageReactionTime = 0;
      const result = document.getElementById("result") as HTMLInputElement;
      result.innerText = "";
      getNextWord();
      console.log("so cau tra loi dung la:" + colorIndex);
      // updateRs(correctAnswers.toFixed(0));
      return correctAnswers.toFixed(0);
    }

    function getNextWord() {
      wordIndex = Math.floor(Math.random() * words.length);
      colorIndex = Math.floor(Math.random() * colors.length);
      startTime = new Date().getTime();
      const word = document.getElementById("word") as HTMLInputElement;
      word.innerText = words[wordIndex];
      word.style.color = colors[colorIndex];
    }

    const red = document.getElementById("red") as HTMLInputElement;
    red.addEventListener("click", function () {
      checkAnswer("red");
    });

    const green = document.getElementById("green") as HTMLInputElement;
    green.addEventListener("click", function () {
      checkAnswer("green");
    });

    const blue = document.getElementById("blue") as HTMLInputElement;
    blue.addEventListener("click", function () {
      checkAnswer("blue");
    });

    const orange = document.getElementById("orange") as HTMLInputElement;
    orange.addEventListener("click", function () {
      checkAnswer("orange");
    });

    const yellow = document.getElementById("yellow") as HTMLInputElement;
    yellow.addEventListener("click", function () {
      checkAnswer("yellow");
    });

    const pink = document.getElementById("pink") as HTMLInputElement;
    pink.addEventListener("click", function () {
      checkAnswer("pink");
    });

    function checkAnswer(clickedColor: any) {
      const reactionTime = new Date().getTime() - startTime;
      let avgReactionTimePercent;
      if (count >= 10) {
        const word = document.getElementById("word") as HTMLInputElement;
        word.innerText = "Test completed!";
        const start = document.getElementById("start") as HTMLInputElement;
        start.style.display = "block";
        avgCorrectReactionTime = correctReactionTime / correctAnswers;
        const avgIncorrectReactionTime =
          incorrectReactionTime / (count - correctAnswers);
        const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
        scoreMy.innerText = `Average reaction time for correct answers: ${avgCorrectReactionTime.toFixed(
          2
        )} ms, for wrong answers: ${avgIncorrectReactionTime.toFixed(2)} ms`;
        const avgReactionTime = correctAnswers > 0 ? avgCorrectReactionTime : 0;
        avgReactionTimePercent = ((avgReactionTime / 1000) * 100).toFixed(0);
        //sendForm
        const score = document.getElementById("score") as HTMLInputElement;
        score.value = avgReactionTimePercent;
        const avg_time = document.getElementById(
          "avg_time"
        ) as HTMLInputElement;
        avg_time.value = avgReactionTimePercent;
        const correct = document.getElementById("correct") as HTMLInputElement;
        correct.value = avgReactionTimePercent;
        const submitButton = document.getElementById(
          "submitButton"
        ) as HTMLInputElement;
        if (submitButton) submitButton.click();
        //sendForm
        disableButtons();
        return;
      }
      count++;
      if (
        clickedColor === colors[colorIndex] ||
        clickedColor === words[wordIndex]
      ) {
        const result = document.getElementById("result") as HTMLInputElement;
        result.innerText = `Right! Reaction time: ${reactionTime} ms`;
        correctAnswers++;
        correctReactionTime += reactionTime;
        const correctAnswersElement = document.getElementById(
          "correctAnswers"
        ) as HTMLInputElement;
        correctAnswersElement.innerText = `Number of correct answers: ${correctAnswers}`;
      } else {
        const result = document.getElementById("result") as HTMLInputElement;
        result.innerText = `Wrong! Reaction time: ${reactionTime} ms`;
        incorrectReactionTime += reactionTime;
        // save score to global object
        const testId = "attention";
        const globaRresult = reactionTime.toString();
        setTestResult(testId, globaRresult + " millisecond");
        // for test only
        getTestResult("analogStalking");
      }
      wordIndex = Math.floor(Math.random() * words.length);
      colorIndex = Math.floor(Math.random() * colors.length);
      startTime = new Date().getTime();
      const word = document.getElementById("word") as HTMLInputElement;
      word.innerText = words[wordIndex];
      word.style.color = colors[colorIndex];
      answer = "";
      const progressElement = document.getElementById(
        "progress"
      ) as HTMLInputElement;
      if (progressElement)
        progressElement.value = ((count * 100) / 10).toFixed(0);
    }
  });

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(105.07deg, rgb(85, 211, 211) -64.38%, rgb(43, 58, 186) 138.29%)",
      }}
    >
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/attention.css" />
      <title>Document</title>
      <h1 style={{ marginTop: "0" }}>Тест на внимание</h1>
      <button
        className="back-button"
        style={{ display: "none" }}
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Back
      </button>
      <button
        style={{ display: "none" }}
        className="instructions-button"
        onClick={openModalW}
      >
        Instruction
      </button>
      <p />
      <div id="modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModalW}>
            ×
          </span>
          <h2>Instruction</h2>
          <p>
            You need to indicate the color in which the word itself is written
            color name. The name of the color (word) may not match the color, by
            which it was written. For example, the word "green" might be written
            in red. For clarity, here are some examples of tasks and correct
            answers to them:
          </p>
          <ul>
            <li style={{ color: "#B22222" }}>- correct answer is red</li>
            <li style={{ color: "#9ACD32" }}>- correct answer is green</li>
            <li style={{ color: "#FF69B4" }}>- correct answer is "pink"</li>
            <li style={{ color: "#FF8C00" }}>- correct answer is orange</li>
          </ul>
        </div>
      </div>
      <p>
        Press the button indicating the color in which the word is written! When
        completing the test, click the Submit button, your data is stored
      </p>
      <p>
        <progress
          id="progress"
          style={{ marginBottom: "0" }}
          value={0}
          max={100}
        />
      </p>
      <p>
        <button
          id="start"
          style={{
            padding: "20px 60px",
            marginTop: "3%",
            borderRadius: "0",
            backgroundColor: "#00FF00",
            color: "black",
          }}
        >
          Begin
        </button>
      </p>
      <p id="word" />
      <div className="answ-bottons">
        <button
          style={{ backgroundColor: "blue", color: "black", borderRadius: "0" }}
          id="red"
          className="colorb"
          disabled
        >
          Red
        </button>
        <button
          style={{ backgroundColor: "red", color: "black", borderRadius: "0" }}
          id="green"
          className="colorb"
          disabled
        >
          Green
        </button>
        <button
          style={{
            backgroundColor: "yellow",
            color: "black",
            borderRadius: "0",
          }}
          id="blue"
          className="colorb"
          disabled
        >
          Blue
        </button>
        <br />
        <button
          style={{ backgroundColor: "pink", color: "black", borderRadius: "0" }}
          id="orange"
          className="colorb"
          disabled
        >
          Orange
        </button>
        <button
          style={{
            backgroundColor: "green",
            color: "black",
            borderRadius: "0",
          }}
          id="yellow"
          className="colorb"
          disabled
        >
          Yellow
        </button>
        <button
          style={{
            backgroundColor: "orange",
            color: "black",
            borderRadius: "0",
          }}
          id="pink"
          className="colorb"
          disabled
        >
          Pink
        </button>
        <button
          className="btn start"
          style={{
            borderRadius: "0",
            backgroundColor: "#00FF00",
            color: "black",
          }}
          onClick={updateRs}
        >
          Submit
        </button>
      </div>
      <p id="result" />
      <p id="correctAnswers" />
      <p id="scoreMy" />
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Attention"
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

export default attention;

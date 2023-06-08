import React, { useEffect } from "react";
import { getTestResult, setTestResult } from "../utils/globals";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const additionInTheMind = () => {
  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }

  const min = 10;
  const max = 99;
  const { data: session }: any = useSession();
  let averageGood: HTMLInputElement;
  let averageBad: HTMLInputElement;
  let resultDiv: HTMLInputElement;
  let startTime: number;
  let a: number, b: number, answers: number = 0;
  let attempts = 0;
  let totalReactionTime = 0;
  let totalReactionTimeBad = 0;
  const maxAttempts = 5;
  let averageReactionTimeGood: any;
  let averageReactionTimeBad: any;
  let percentageReactionTimeGood;
  let wrong = 0;
  let result_data: string;

  function checkAnswer(answer: string) {
    let time = performance.now() - startTime;
    let resultDiv = document.getElementById("result") as HTMLInputElement;
    let averageGood = document.getElementById(
      "averageGood"
    ) as HTMLInputElement;
    let averageBad = document.getElementById("averageBad") as HTMLInputElement;
    if (
      (answer === "четное" && (a + b) % 2 === 0) ||
      (answer === "нечетное" && (a + b) % 2 !== 0)
    ) {
      if (resultDiv)
       { resultDiv.innerText = `Your reaction time: ${time.toFixed(2)} ms.`;
      totalReactionTime += time;}
    } else {
      if (resultDiv) {
        resultDiv.innerText = "Error";
        wrong++;
        totalReactionTimeBad += time;
      }
    }
    answers++;
    let averageBadTMP = parseInt((totalReactionTimeBad / wrong).toFixed(2));
    let averageGoodTMP = parseInt(
      (totalReactionTime / (attempts - wrong)).toFixed(2)
    );
    if (averageReactionTimeBad)
      averageReactionTimeBad = (totalReactionTimeBad / wrong).toFixed(0);
    if (averageReactionTimeGood)
      averageReactionTimeGood = (
        totalReactionTime /
        (attempts - wrong)
      ).toFixed(0);
    if (attempts === maxAttempts) {
      if (averageGood) {
        averageGood.innerText += ` Average reaction time (correct answers): ${averageGoodTMP} ms.`;
        // // save score to global object
        // const testId = 'additionInTheMind';
        // setTestResult(testId, (averageGoodTMP.toString() + " millisecond"));
        // // for test only
        // getTestResult('additionInTheMind');
        result_data = (averageGoodTMP.toString() + "мс");
      }
      if (averageBad)
        averageBad.innerText += ` Average reaction time (wrong answers): ${averageBadTMP} ms.`;
      percentageReactionTimeGood =
      averageGoodTMP /
      (averageGoodTMP + averageBadTMP) *
      100;
      const start = document.querySelector(".start") as HTMLInputElement;
      start.style.display = "block";
      //sendForm
      const avg_time = document.getElementById("avg_time") as HTMLInputElement;
      if (avg_time) avg_time.value = averageReactionTimeGood;
      const total_time = document.getElementById(
        "total_time"
      ) as HTMLInputElement;
      const data = {
        email: session?.user?.email,
        testNumber: "test9",
        percent: answers*20 + "%",
        speed: (totalReactionTime / 5).toFixed(2) + "мс",
      };
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
    } else {
      setTimeout(startTest, 2000);
    }
  }
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

  function startTest() {
    const start = document.querySelector(".start") as HTMLInputElement;
    if (start) start.style.display = "none";
    let progress = document.getElementById("progress") as HTMLInputElement;
    progress.value = attempts.toString();
    if (attempts === maxAttempts) {
      attempts = 6;
      totalReactionTime = 0;
      if (averageReactionTimeGood) averageReactionTimeGood.innerText = "";
      if (averageReactionTimeBad) averageReactionTimeBad.innerText = "";
    }
    attempts++;
    progress.value = (attempts * 20).toFixed(0);
    if (attempts > maxAttempts) {
      console.log("Da qua gioi han");
      return;
    }
    const [a, b] = generateNumbers();
    let resultDiv = document.getElementById("result") as HTMLInputElement;
    if (resultDiv) resultDiv.innerText = `${a}+${b}`;
    startTime = performance.now();
    return [a, b];
  }

  function generateNumbers() {
    a = Math.floor(Math.random() * (max - min + 1)) + min;
    b = Math.floor(Math.random() * (max - min + 1)) + min;
    return [a, b];
  }

  useEffect(() => {
    const windowClick = (event: any) => {
      const modal = document.getElementById("modal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }

      window.addEventListener("click", windowClick);
    };
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
      <link rel="stylesheet" href="css/evenOddTest.css" />
      <button
        style={{ display: "none" }}
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Back
      </button>
      <title>Document</title>
      <title>Sound even/odd</title>
      <meta charSet="UTF-8" />
      <h1 style={{ marginTop: "0" }}>
        Assessing the speed of reaction to addition in the mind (text)
      </h1>
      <button
        className="instructions-button"
        onClick={openModalW}
        style={{ display: "none" }}
      >
        Instruction
      </button>
      <p></p>
      <div id="modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModalW}>
            ×
          </span>
          <h2>Instruction</h2>
          <p>
            To start the test, click the "Start" button. You will see two
            numbers your task is to add them up and determine if the result is
            even or odd. Click the appropriate button to select an answer. You
            can repeat the test several times to improve your result.
          </p>
        </div>
      </div>
      <p>
        Add up the numbers and choose the result.When completing the test, click
        the Submit button, your data is stored{" "}
      </p>
      <progress id="progress" value={0} max={100} />
      <p>
        <button
          className="start"
          onClick={startTest}
          style={{
            borderRadius: "0",
            backgroundColor: "#00FF00",
            color: "black",
            marginBottom: "2%",
          }}
        >
          Begin
        </button>
      </p>
      <p></p>
      <div id="question" />
      <button
        style={{
          borderRadius: "0",
          backgroundColor: "#FFCC00",
          color: "black",
        }}
        className="even"
        onClick={() => checkAnswer("четное")}
      >
        Even
      </button>
      <button
        style={{
          borderRadius: "0",
          backgroundColor: "#CC3300",
          color: "black",
          textAlign: "center",
          padding: "20px 30px",
          marginLeft: "20px",
        }}
        className="odd"
        onClick={() => checkAnswer("нечетное")}
      >
        Odd
      </button>
      <p></p>
      <div id="result" />
      <p></p>
      <div id="averageGood" />
      <p></p>
      <div id="averageBad" />
      <audio id="audio" />
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Сложение (текст)"
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
    </div>
  );
};

export default additionInTheMind;

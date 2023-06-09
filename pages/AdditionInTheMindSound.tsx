import React, { useEffect } from "react";
import { getTestResult, setTestResult } from "../utils/globals";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const AdditionInTheMindSound = () => {
  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }
  const { data: session }: any = useSession();
  let tmp: number = 0;
  const min = 10;
  const max = 99;
  let average: HTMLInputElement;
  let resultDiv: HTMLInputElement;
  // let average = document.getElementById("average");
  // let resultDiv = document.getElementById("result");
  let startTime: number;
  let a: number;
  let b: number;
  let attempts = 0;
  const maxAttempts = 5;
  let totalReactionTime = 0;
  let averageReactionTime;
  let percentage;
  let result_data: string;
  let result_data_percent: string;

  function generateNumbers() {
    a = Math.floor(Math.random() * (max - min + 1)) + min;
    b = Math.floor(Math.random() * (max - min + 1)) + min;
    return [a, b];
  }

  let startTimeFirstDigit: number;
  let timeToSpeakDigits: number;

  function startTest() {
    const start = document.querySelector(".start") as HTMLInputElement;
    if (start) start.style.display = "none";
    attempts++;
    let progress = document.getElementById("progress") as HTMLInputElement;
    if (progress) progress.value = ((attempts / maxAttempts) * 100).toFixed(2);
    if (attempts > maxAttempts) {
      progress.value = "0";
      return;
    }
    const [a, b] = generateNumbers();
    let audio = new SpeechSynthesisUtterance(`${a} plus ${b}`);
    audio.lang = "en-EN";
    audio.onboundary = function (event) {
      if (event.charIndex === 0) {
        startTimeFirstDigit = performance.now();
      } else {
        timeToSpeakDigits = performance.now() - startTimeFirstDigit;
      }
    };
    resultDiv = document.getElementById("result") as HTMLInputElement;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.speak(audio);
      startTime = performance.now();
    } else {
      if (resultDiv)
        resultDiv.innerText = "Your browser does not support voice synthesis.";
    }
  }

  let wrong = 0;

  function checkAnswer(answer: any) {
    const time = performance.now() - startTime - timeToSpeakDigits;
    resultDiv = document.getElementById("result") as HTMLInputElement;
    if (
      (answer === "четное" && (a + b) % 2 === 0) ||
      (answer === "нечетное" && (a + b) % 2 !== 0)
    ) {
      if (parseFloat(time.toFixed(2)) < 0) {
        if (resultDiv) resultDiv.innerText = "And so it's not necessary...";
      } else {
        if (resultDiv)
          resultDiv.innerText = `Your reaction time: ${time.toFixed(2)} ms.`;
        totalReactionTime += time;
      }
    } else {
      if (parseFloat(time.toFixed(2)) < 0) {
        if (resultDiv) resultDiv.innerText = "And so it's not necessary...";
      } else {
        if (resultDiv) resultDiv.innerText = "Error";
        wrong++;
      }
    }
    averageReactionTime = totalReactionTime / (attempts - wrong);
    percentage = (averageReactionTime / totalReactionTime) * 100;
    average = document.getElementById("average") as HTMLInputElement;
    if (attempts === maxAttempts) {
      if (average) {
        average.innerText += ` Average reaction time: ${averageReactionTime.toFixed(
          2
        )} ms.`;
      }
      // // save score to global object
      // const testId = 'additionInTheMindSound';
      // setTestResult(testId, (averageReactionTime.toFixed(2).toString() + " millisecond"));


      //sendForm
      const avg_time = document.getElementById("avg_time") as HTMLInputElement;
      if(avg_time) avg_time.value = averageReactionTime.toFixed(2);
      const total_time = document.getElementById("total_time") as HTMLInputElement;
      if(total_time) total_time.value = totalReactionTime.toFixed(2);
      const correct = document.getElementById("correct") as HTMLInputElement;
      if(correct) correct.value = (maxAttempts - wrong).toFixed(0);
      const misses = document.getElementById("misses") as HTMLInputElement;
      if(misses) misses.value= wrong.toFixed(0);
      const score = document.getElementById("score") as HTMLInputElement;
      if(score) score.value= percentage.toFixed(0);
      //sendForm
      if ((maxAttempts - wrong) * 20  < 21) tmp = 0.25;
      if ((maxAttempts - wrong) * 20  < 61 && (maxAttempts - wrong) * 20  > 20) tmp = 0.5;
      if ((maxAttempts - wrong) * 20  < 91 && (maxAttempts - wrong) * 20  > 60) tmp = 0.8;
      if ((maxAttempts - wrong) * 20  > 90) tmp = 1;

      const data = {
        email: session?.user?.email,
        testNumber: "test10",
        percent: (maxAttempts - wrong) * 20 + "%",
        speed: averageReactionTime.toFixed(2) + "ms",
        coefficient: tmp,
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
      tmp = 0;
      result_data = averageReactionTime.toFixed(2).toString() + "мс";
      result_data_percent = percentage.toFixed(2).toString() + "%";

      let start = document.querySelector(".start") as HTMLInputElement;
      start.style.display = "block";
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
      <link rel="stylesheet" href="css/soundTest.css" />
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
        Assessing the speed of reaction to addition in the mind (sound)
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
            To start the test, click the "Start" button. You will hear two
            numbers your task is to add them up and determine if the result is
            even or odd. Click the appropriate button to select an answer. You
            can repeat the test several times to improve your result.
          </p>
        </div>
      </div>
      <p>Add up the numbers and choose the result. </p>
      <progress id="progress" value={0} max={100} />
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
      <p></p>
      <div id="question" />
      <button
        className="even"
        onClick={() => checkAnswer("четное")}
        style={{
          borderRadius: "0",
          backgroundColor: "#FFCC00",
          color: "black",
        }}
      >
        Even
      </button>
      <button
        className="odd"
        onClick={() => checkAnswer("нечетное")}
        style={{
          borderRadius: "0",
          backgroundColor: "#CC3300",
          color: "black",
          textAlign: "center",
          padding: "20px 30px",
          marginLeft: "20px",
        }}
      >
        Odd
      </button>
      <p></p>
      <div id="result" />
      <p></p>
      <div id="average" />
      <audio id="audio" />
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Addition (sound)"
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

export default AdditionInTheMindSound;

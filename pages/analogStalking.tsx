import React, { useEffect } from "react";
import { getTestResult, setTestResult } from "./../utils/globals";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const analogStracking = () => {
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
  let tmp: number = 0;

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

  let avgScore: any = 0;
  let reactionTime: number = 0;
  useEffect(() => {
    const windowClick = (event: any) => {
      const modal = document.getElementById("modal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    };

    const ball1 = document.getElementById("ball1") as HTMLInputElement;
    const ball2 = document.getElementById("ball2") as HTMLInputElement;
    const startButton = document.getElementById(
      "startButton"
    ) as HTMLInputElement;
    const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
    const reaction = document.getElementById("reaction") as HTMLInputElement;
    let lastDirectionChangeTime = 0;
    let ball2Position = 0;
    let ball1Position = 0;
    let ball1Direction = "right";
    let startTime = 0;
    let testTime = 30000;

    const startTest = () => {
      const progress = document.getElementById("progress") as HTMLInputElement;

      let value = 0;
      const intervalId = setInterval(() => {
        value++;
        progress.value = value.toFixed(0);

        if (value === 30) {
          clearInterval(intervalId);
        }
      }, 1000);
      startButton.style.display = "none";
      lastDirectionChangeTime = 0;
      startTime = new Date().getTime();
      const scores: any = [];
      const reactions: any = [];
      setInterval(() => {
        const rand = Math.random();
        if (rand > 0.5) {
          ball1Direction = ball1Direction === "right" ? "left" : "right";
          const elapsedTime = new Date().getTime() - startTime;
          reactionTime = elapsedTime - lastDirectionChangeTime;
          reactions.push(reactionTime);
        }
      }, 2000);
      setTimeout(() => {
        clearInterval(ball1MoveInterval);
        clearInterval(ball1DirectionChangeInterval);
        clearInterval(checkCollisionInterval);
        startButton.style.display = "block";
        startButton.disabled = false;

        avgScore = (
          scores.reduce((a: number, b: number) => a + b, 0) / scores.length
        ).toFixed(2);
        const avgReaction = (
          reactions.reduce((a: number, b: number) => a + b, 0) /
          reactions.length /
          1000
        ).toFixed(2);
        scoreMy.innerText = `Average value of ball match: ${avgScore}%`;
        reaction.innerText = `The average value of the speed of reaction to a change in the movement of the ball: ${avgReaction} c/ball`;

        const avg_time = document.getElementById(
          "avg_time"
        ) as HTMLInputElement;
        if (avg_time) avg_time.value = avgReaction;
        const correct = document.getElementById("correct") as HTMLInputElement;
        if (correct) correct.value = avgScore;
        const score = document.getElementById("score") as HTMLInputElement;
        if (score) score.value = avgScore;
        const submitButton = document.getElementById(
          "submit-button"
        ) as HTMLInputElement;
        if (submitButton) submitButton.click();
        if (avgScore < 21) tmp = 0.25;
        if (avgScore < 61 && avgScore > 20) tmp = 0.5;
        if (avgScore < 91 && avgScore > 60) tmp = 0.8;
        if (avgScore > 90) tmp = 1;
        const data = {
          email: session?.user?.email,
          testNumber: "test2",
          percent: avgScore + "%",
          speed: avgReaction + "mc",
          coefficient: tmp,
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

        tmp = 0;

        const testId = "analogStalking";
        const result = avgScore;
        setTestResult(testId, result + " %");
        // for test only
        getTestResult("analogStalking");
      }, testTime);
      startButton.style.display = "none";
      const ball1MoveInterval = setInterval(() => {
        if (ball1Direction === "right") {
          ball1Position += 10;
          let container = document.getElementById(
            "container"
          ) as HTMLInputElement;
          if (container)
            if (ball1Position >= container.clientWidth - 50) {
              ball1Direction = "left";
            }
        } else {
          ball1Position -= 10;
          if (ball1Position <= 0) {
            ball1Direction = "right";
          }
        }
        ball1.style.left = ball1Position + "px";
      }, 50);

      const ball1DirectionChangeInterval = setInterval(() => {
        const rand = Math.random();
        if (rand > 0.5) {
          ball1Direction = ball1Direction === "right" ? "left" : "right";
          const elapsedTime = new Date().getTime() - startTime;
          const percentMatch = ((elapsedTime / testTime) * 100).toFixed(2);
          scores.push(Math.max(parseFloat(percentMatch), 0));
          lastDirectionChangeTime = elapsedTime;
        }
      }, 2000);

      const checkCollisionInterval = setInterval(() => {
        const ball1Position = ball1.offsetLeft;
        const ball2Position = ball2.offsetLeft;
        if (ball1Position === ball2Position) {
          const elapsedTime = new Date().getTime() - startTime;
          const reactionTime = elapsedTime - lastDirectionChangeTime;
          const speed = (reactionTime / 1000).toFixed(2);
          const percentMatch = ((elapsedTime / testTime) * 100).toFixed(2);
          scoreMy.innerText = `Ball match: ${Math.max(
            parseFloat(percentMatch),
            0
          )}%`;
          reaction.innerText = `The speed of reaction to a change in the movement of the ball: ${speed} c/ball`;
          lastDirectionChangeTime = elapsedTime;
        }
      }, 50);
    };
    const moveBall2 = (direction: any) => {
      const containerWidth = ball2.parentElement?.clientWidth;
      const ball2Width = ball2.clientWidth;
      let newBall2Position = ball2Position;

      if (direction === "right") {
        newBall2Position += 10;
        if (containerWidth)
          if (newBall2Position + ball2Width > containerWidth) {
            newBall2Position = containerWidth - ball2Width;
          }
      } else if (direction === "left") {
        newBall2Position -= 10;
        if (newBall2Position < 0) {
          newBall2Position = 0;
        }
      }
      ball2Position = newBall2Position;
      ball2.style.left = ball2Position + "px";
    };

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        moveBall2("left");
      } else if (event.key === "ArrowRight") {
        moveBall2("right");
      }
    });
    ball1.addEventListener("click", () => {
      ball1Direction = ball1Direction === "right" ? "left" : "right";
      reactionTime = new Date().getTime() - startTime;
    });

    startButton.addEventListener("click", startTest);
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
      <link rel="stylesheet" href="css/analogPurs.css" />
      <button
        className="back-button"
        style={{ display: "none" }}
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Document</title>
      <h1 style={{ marginTop: "0" }}>Analog Stalking</h1>
      <button
        className="instructions-button"
        style={{ display: "none" }}
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
            Press the "Start" button. The red ball will start moving around the
            screen left and right. Your task is to control the blue ball with
            left and right keys to keep it as close as possible to red ball.
          </p>
        </div>
      </div>
      <p>
        Control the blue ball with the left and right keys! When completing the
        test, click the Submit button, your data is stored{" "}
      </p>
      <progress id="progress" value={0} max={30} />
      <div
        id="container"
        style={{ maxHeight: 52, borderRadius: 25, border: "1px #606086 solid" }}
      >
        <div id="ball1" />
        <div id="ball2" />
      </div>
      <button
        id="startButton"
        style={{
          padding: "10px 20px",
          marginTop: "3%",
          borderRadius: "0",
          backgroundColor: "#00FF00",
          color: "black",
        }}
      >
        Начать
      </button>
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
      <p></p>
      <div id="reaction" />
      <div id="scoreMy" />
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Analog Stalking"
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

export default analogStracking;

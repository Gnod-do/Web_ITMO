import React, { useEffect } from "react";
import { getTestResult, setTestResult } from './../utils/globals';
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

  function updateRs() {
    const correctInput = document.getElementById("correct") as HTMLInputElement;
    if (correctInput) correctInput.value = result;
    const data = {
      email: session?.user?.email,
      testNumber: 'test2',
      percent: (avgScore*1).toFixed(0) + '%',
      speed: reactionTime.toString() + 'Мс',
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
        scoreMy.innerText = `Среднее значение совпадения с шариком: ${avgScore}%`;
        reaction.innerText = `Среднее значение скорости реакции на изменение движения шарика: ${avgReaction} с/шарик`;

        const testId = 'analogStalking';
        const result = avgScore;
        setTestResult(testId, (result + " %"));
        // for test only
        getTestResult('analogStalking');

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
          scoreMy.innerText = `Совпадение с шариком: ${Math.max(
            parseFloat(percentMatch),
            0
          )}%`;
          reaction.innerText = `Cкорость реакции на изменение движения шарика: ${speed} с/шарик`;
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
      <h1 style={{ marginTop: "0" }}>Аналоговое преследование</h1>
      <button
        className="instructions-button"
        style={{ display: "none" }}
        onClick={openModalW}
      >
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
            Нажмите кнопку "Начать".Красный шарик начнет двигаться по экрану
            влево и вправо. Ваша задача - управлять синим шариком с помощью
            клавиш "влево" и "вправо", чтобы держать его как можно ближе к
            красному шарику.
          </p>
        </div>
      </div>
      <p>Управляйте синим шариком с помощью клавиш "влево" и "вправо". </p>
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
          onClick={updateRs}
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
          defaultValue="Аналоговое преследование"
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

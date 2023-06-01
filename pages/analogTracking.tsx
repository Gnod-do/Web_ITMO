import React, { useEffect } from "react";

const analogTracking = () => {

  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }

  function calculateHitPercentage(progress: HTMLInputElement) {
    throw new Error("Function not implemented.");
  }



  useEffect(() => {
    const windowClick = (even: any) => {
      const modal = document.getElementById("modal");
      if (modal && even.target === modal) {
        modal.style.display = "none";
      }
    };

    window.addEventListener("click", windowClick);

    const container = document.getElementById("container") as HTMLInputElement;
    const ball = document.getElementById("ball") as HTMLInputElement;
    const startButton = document.getElementById(
      "startButton"
    ) as HTMLInputElement;
    const mark = document.createElement("div") as HTMLInputElement;
    mark.classList.add("mark");
    if (container) mark.style.left = container.offsetWidth / 2 - 5 + "px";
    if (container) container.appendChild(mark);
    const reactionT = document.getElementById("reaction") as HTMLInputElement;
    const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
    let currentPosition = 0;
    let direction = "right";
    let randomDirectionInterval: any;
    let moveBallInterval: any;
    let resistance = 1;
    let numHits = 0;
    let count = 0;
    const reactionValues: any[] = [];
    const deviationValues: any[] = [];

    function startMovingBall() {
      const progress = document.getElementById("progress") as HTMLInputElement;
      let value = 0;
      const intervalId = setInterval(() => {
        value++;
        progress.value = value.toString();

        if (value === 30) {
          clearInterval(intervalId);
        }
      }, 1000);
      startButton.style.display = "none";
      moveBallInterval = setInterval(() => {
        if (direction === "right") {
          currentPosition += 10 * resistance;
          if (currentPosition >= container.offsetWidth - ball.offsetWidth) {
            direction = "left";
          }
        } else {
          currentPosition -= 10 * resistance;
          if (currentPosition <= 0) {
            direction = "right";
          }
        }
        ball.style.left = currentPosition + "px";
        const ballRight = currentPosition + ball.offsetWidth;
        const markLeft = mark.offsetLeft;
        const markRight = mark.offsetLeft + mark.offsetWidth;
        if (ballRight >= markLeft && currentPosition <= markRight) {
          resistance = 0.6;
          if (
            currentPosition + ball.offsetWidth / 2 ===
            markLeft + mark.offsetWidth / 2
          ) {
            numHits++;
            calculateHitPercentage(progress);
          }
        } else {
          resistance = 1;
        }
      }, 20);

      randomDirectionInterval = setInterval(() => {
        if (Math.random() < 0.5) {
          direction = "left";
        } else {
          direction = "right";
        }
      }, 1000);
      document.addEventListener("keydown", (event) => {
        const reactionT = document.getElementById("reaction");
        if (event.key === "ArrowLeft") {
          direction = "left";
          if (direction === "right") {
            resistance = 2;
          } else {
            resistance = 0.5;
          }
        } else if (event.key === "ArrowRight") {
          direction = "right";
          if (direction === "left") {
            resistance = 2;
          } else {
            resistance = 0.5;
          }
        }
        const ballRight = currentPosition + ball.offsetWidth;
        const markLeft = mark.offsetLeft;
        const markRight = mark.offsetLeft + mark.offsetWidth;
        const distanceToMark = Math.min(
          Math.abs(ballRight - markLeft),
          Math.abs(currentPosition - markRight)
        );
        const reaction = distanceToMark / 10;
        reactionValues.push(reaction.toFixed(2));
        if (reactionT)
          reactionT.innerText = `Cкорость реакции на изменение движения шарика: ${reactionValues[reactionValues.length - 1]
            } с/шарик`;
      });
      function calculateHitPercentage(progress: any) {
        const deviation = Math.abs(currentPosition + ball.offsetWidth / 2 - mark.offsetLeft - mark.offsetWidth / 2 + mark.offsetWidth / 2 - ball.offsetWidth / 2);
        const containerWidth = container.offsetWidth;
        const deviationPercentage = ((containerWidth / 2 - deviation) / (containerWidth / 2)) * 100;
        deviationValues.push(Math.abs(parseInt(deviationPercentage.toFixed(2))));
        scoreMy.innerText = `Процент отклонения от средней границы: ${deviationValues[deviationValues.length - 1]}%`;
      }


      setInterval(() => {
        calculateHitPercentage(progress);
      }, 2000);
      setTimeout(() => {
        clearInterval(moveBallInterval);
        clearInterval(randomDirectionInterval);
        startButton.style.display = "block";
        const reactionAverage =
          reactionValues.reduce((acc, val) => acc + Number(val), 0) /
          reactionValues.length;
        const deviationAverage =
          deviationValues.reduce((acc, val) => acc + Number(val), 0) /
          deviationValues.length;
        reactionT.innerText = ` Средняя скорость реакции на изменение движения шарика: ${reactionAverage.toFixed(
          2
        )} с/шарик`;
        scoreMy.innerText = `Среднее отклонение от средней границы: ${deviationAverage.toFixed(
          2
        )}%`;
        //sendForm
        const avg_time = document.getElementById("avg_time") as HTMLInputElement;
        if (avg_time) avg_time.value = reactionAverage.toFixed(2);
        const correct = document.getElementById("correct") as HTMLInputElement;
        if (correct) correct.value = deviationAverage.toFixed(2);
        const score = document.getElementById("score") as HTMLInputElement;
        if (score) score.value = deviationAverage.toFixed(2);
        const submitButton = document.getElementById("submitButton") as HTMLInputElement;
        if (submitButton) submitButton.click();
        //sendForm
      }, 30000);
    }

    startButton.addEventListener("click", startMovingBall);
  });

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/analogSum.css" />
      <button
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Document</title>
      <h1>Аналоговое слежение</h1>
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
            Нажмите кнопку "Начать".Красный шарик начнет двигаться по экрану
            влево и вправо. Ваша задача - при помощи кнопок "вправо" и "влево"
            удерживать шарик, как можно ближе к средней границе.
          </p>
        </div>
      </div>
      <p>
        Управляйте красным шариком с помощью клавиш "влево" и "вправо", не давая
        ему отлететь от средней границы.{" "}
      </p>
      <progress id="progress" value={0} max={30} />
      <p></p>
      <div id="container">
        <div id="ball" />
        <div id="mark" />
      </div>
      <button id="startButton" style={{ marginTop: 20 }}>Начать</button>
      <p></p>
      <div id="reaction" />
      <p></p>
      <div id="scoreMy" />
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Аналоговое слежение"
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

export default analogTracking;


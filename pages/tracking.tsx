import React, { useEffect } from "react";

const tracking = () => {
  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }

  useEffect(() => {
    const windowClick = (event: any) => {
      const modal = document.getElementById("modal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    };

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    const startButton = document.getElementById(
      "startButton"
    ) as HTMLInputElement;
    const circleX = canvas.width / 2;
    const circleY = canvas.height / 2;
    const circleRadius = 150;
    const pointRadius = 10;
    const point = {
      x: circleX + circleRadius,
      y: circleY,
    };
    let pointX: number;
    let pointY: number;
    let count = 0;
    let totalDistance = 0;
    let result = 0;
    const resultDiv = document.getElementById("resultAns");

    function calculateFixedPoint() {
      const angle = Math.random() * Math.PI * 2;
      pointX = circleX + Math.cos(angle) * circleRadius;
      pointY = circleY + Math.sin(angle) * circleRadius;
    }

    function pointDr() {
      if (context) {
        context.beginPath();
        context.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
        context.fillStyle = "red";
        context.fill();
      }
    }

    function circle() {
      if (context) {
        context.beginPath();
        context.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
        context.strokeStyle = "blue";
        context.stroke();
      }
    }

    function fixedPoint() {
      if (context) {
        context.beginPath();
        context.arc(pointX, pointY, pointRadius, 0, Math.PI * 2);
        context.stroke();
      }
    }

    function updatePosition() {
      const angle = performance.now() / 1000;
      point.x = circleX + Math.cos(angle) * circleRadius;
      point.y = circleY + Math.sin(angle) * circleRadius;
    }

    function spacePress() {
      const distance = Math.sqrt(
        (point.x - pointX) ** 2 + (point.y - pointY) ** 2
      );
      totalDistance += distance;
      count++;
      const progress = document.getElementById("progress") as HTMLInputElement;
      progress.value = (count * 10).toFixed(2);
      showResult();
    }

    function showResult() {
      const average = totalDistance;
      totalDistance = 0;
      let matchPercent;
      matchPercent = 100 - (average / circleRadius) * 100;
      if (matchPercent < 0) {
        matchPercent = 0;
        if (resultDiv)
          resultDiv.innerText = `Ваш процент попадания: ${matchPercent.toFixed(
            2
          )}%`;
        result = result + matchPercent;
      } else {
        if (resultDiv)
          resultDiv.innerText = `Ваш процент попадания: ${matchPercent.toFixed(
            2
          )}%`;
        result = result + matchPercent;
      }
      let answer;
      if (count === 10) {
        answer = (result / 10).toFixed(0);
        if (resultDiv)
          resultDiv.innerText = `Ваш средний процент попадания: ${answer}%`;
        if (startButton) {
          startButton.style.display = "block";
          startButton.disabled = false;
        }

        //sendForm
        // document.getElementById("avg_time").value = answer;
        // document.getElementById("score").value = answer;
        // document.getElementById("submit-button").click();
        //sendForm
      }
    }

    function loop() {
      if (context) context.clearRect(0, 0, canvas.width, canvas.height);
      circle();
      fixedPoint();
      updatePosition();
      pointDr();
      requestAnimationFrame(loop);
    }

    calculateFixedPoint();
    loop();

    if (startButton)
      startButton.addEventListener("click", function () {
        startButton.style.display = "none";
        startButton.disabled = true;
        count = 0;
        result = 0;
        const resultDivs = document.querySelectorAll("#result + div");
        resultDivs.forEach((div) => div.remove());
        const resultInput = document.getElementById(
          "result"
        ) as HTMLInputElement;
        if (resultInput) resultInput.innerText = "";
        calculateFixedPoint();
        loop();
      });

    document.addEventListener("keydown", (event) => {
      if (
        event.code === "Space" &&
        count < 10 &&
        startButton.disabled === true
      ) {
        spacePress();
      }
    });
  });
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/motionTest.css" />
      <button
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Document</title>
      <meta charSet="UTF-8" />
      <h1>Оценка точности реакции(простая)</h1>
      <button className="instructions-button" onClick={openModalW}>
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
            Для начала теста, нажмите кнопку "Начать". Нажимайте на пробел,
            когда точка будет находиться внутри круга. После 10 попыток тест
            завершится, и вы увидите ваш средний процент попадания в круг. Вы
            можете повторить тест несколько раз, чтобы улучшить свой результат.
          </p>
        </div>
      </div>
      <p>Нажимайте на пробел, когда точка будет находиться внутри круга. </p>
      <progress id="progress" value={0} max={100} />
      <p>
        <button id="startButton">Начать</button>
      </p>
      <p>
        <canvas id="canvas" width={380} height={380} />
      </p>
      <div id="resultAns" />
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Точность реакции (простая)"
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

export default tracking;

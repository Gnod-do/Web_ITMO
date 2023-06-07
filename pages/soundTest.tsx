import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const soundTest = () => {
  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }

  const delay = 1500;
  let timerId: any;
  let attempts = 0;
  const maxAttempts = 10;
  let totalReactionTime = 0;
  let averageReactionTime: number;
  let averagePercent;
  let average: any;

  function startTest() {
    let start = document.querySelector(".start") as HTMLInputElement;
    if(start) start.style.display = "none";
    // playSound();
    if (attempts === maxAttempts) {
      attempts = 0;
      totalReactionTime = 0;
      averageReactionTime = 0;
      average.innerText = "";
    }
    attempts++;
    let progress = document.getElementById("progress") as HTMLInputElement;
    progress.value = (attempts * 10).toFixed(2);
    if (attempts > maxAttempts) {
      return;
    }
    timerId = setTimeout(playSound, delay);
  }

  function playSound() {
    const audio = new Audio("./audio/sound1.wav");
    audio.play();
    const reactionStartTime = Date.now();
    const listener = function () {
      const reactionTime: any = Date.now() - reactionStartTime;
      const reactionTimeInput = document.getElementById("reactionTime") as HTMLInputElement;
      reactionTimeInput.innerHTML = `Ваше время реакции: ${reactionTime} миллисекунд`;
      totalReactionTime += reactionTime;
      averageReactionTime = totalReactionTime / attempts;
      document.removeEventListener("keydown", listener);
    };
    document.addEventListener("keydown", listener);
    if (attempts === maxAttempts) {
      average.innerText += ` Среднее время реакции: ${averageReactionTime.toFixed(
        2
      )} миллисекунд.`;
      averagePercent = ((averageReactionTime / delay) * 100).toFixed(2);


        const start = document.querySelector(".start") as HTMLInputElement;
        start.style.display = "block";

    //   //sendForm
    //   document.getElementById("total_time").value =
    //     totalReactionTime.toFixed(2);
    //   document.getElementById("avg_time").value =
    //     averageReactionTime.toFixed(2);
    //   document.getElementById("score").value = averagePercent;
    //   document.getElementById("submit-button").click();
    //   //sendForm
    } else {
      setTimeout(startTest, 2000);
    }
  }

  useEffect(() => {
    const windowClick = (even: any) => {
      const modal = document.getElementById("modal");
      if (modal && even.target === modal) {
        modal.style.display = "none";
      }
    };

    window.addEventListener("click", windowClick);
  });

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/sound.css" />
      {/* <button className="back-button" onClick="location.href='testPage.html'">Назад</button> */}
      <title>Document</title>
      <h1>Оценка скорости реакции на звук</h1>
      {/* <button className="instructions-button" onClick="openModalW()">Инструкция</button> */}
      <p></p>
      <div id="modal" className="modal">
        <div className="modal-content">
          {/* <span className="close" onclick="closeModalW()">×</span> */}
          <h2>Инструкция</h2>
          <p>
            Для начала теста, нажмите кнопку "Начать". Вы услышите звук, ваша
            задача как можно бысрее нажать на "пробел". Вы можете повторить тест
            несколько раз, чтобы улучшить свой результат.
          </p>
        </div>
      </div>
      <p>Вы услышите звук, ваша задача как можно бысрее нажать на "пробел". </p>
      <progress id="progress" value={0} max={100} />
      <button className="start" onClick={startTest}>
        Begin
      </button>
      <div id="reactionTime" />
      <p></p>
      <div id="average" />
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Звук"
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


export default soundTest;
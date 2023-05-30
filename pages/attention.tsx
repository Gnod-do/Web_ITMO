import React, { useEffect } from "react";

const attention = () => {
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

    const words = [
        "красный",
        "зеленый",
        "синий",
        "оранжевый",
        "желтый",
        "розовый",
      ];
      const colors = ["red", "green", "blue", "orange", "yellow", "pink"];
      let wordIndex: number;
      let colorIndex: any;
      let answer = "";
      let count: number = 0,
        correctAnswers: number = 0,
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
      let correctAnswers: number;
      let correctAnswersElement = document.getElementById(
        "correctAnswers"
      ) as HTMLInputElement;
      if (correctAnswersElement) {
        correctAnswersElement.innerHTML = "";
        correctAnswers = 0;
      }

      const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
      scoreMy.innerHTML = "";
      const progress = document.getElementById("progress") as HTMLInputElement;
      progress.value = "0";
      count = 0;
      correctReactionTime = 0;
      incorrectReactionTime = 0;
      averageReactionTime = 0;
      const result = document.getElementById("result") as HTMLInputElement;
      result.innerHTML = "";
      getNextWord();
    }

    function getNextWord() {
      wordIndex = Math.floor(Math.random() * words.length);
      colorIndex = Math.floor(Math.random() * colors.length);
      startTime = new Date().getTime();
      const word = document.getElementById("word") as HTMLInputElement;
      word.innerHTML = words[wordIndex];
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
      if (count >= 20) {
        const word = document.getElementById("word") as HTMLInputElement;
        word.innerHTML = "Тест завершен!";
        const start = document.getElementById("start") as HTMLInputElement;
        start.style.display = "block";
        const avgCorrectReactionTime = correctReactionTime / correctAnswers;
        const avgIncorrectReactionTime =
          incorrectReactionTime / (count - correctAnswers);
        const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
        scoreMy.innerHTML = `Среднее время реакции на правильные ответы: ${avgCorrectReactionTime.toFixed(
          2
        )} мс, на неправильные ответы: ${avgIncorrectReactionTime.toFixed(
          2
        )} мс`;
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
        result.innerHTML = `Правильно! Время реакции: ${reactionTime} мс`;
        correctAnswers ++;
        correctReactionTime += reactionTime;
        const correctAnswersElement = document.getElementById(
          "correctAnswers"
        ) as HTMLInputElement;
        correctAnswersElement.innerHTML = `Количество правильных ответов: ` + correctAnswers;
        // ${correctAnswers}
      } else {
        const result = document.getElementById("result") as HTMLInputElement;
        result.innerHTML = `Неправильно! Время реакции: ${reactionTime} мс`;
        incorrectReactionTime += reactionTime;
      }
      wordIndex = Math.floor(Math.random() * words.length);
      colorIndex = Math.floor(Math.random() * colors.length);
      startTime = new Date().getTime();
      const word = document.getElementById("word") as HTMLInputElement;
      word.innerHTML = words[wordIndex];
      word.style.color = colors[colorIndex];
      answer = "";
      const progressElement = document.getElementById(
        "progress"
      ) as HTMLInputElement;
      if (progressElement)
        progressElement.value = (count*100/20).toFixed(0);
    }
  });

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/attention.css" />
      <title>Document</title>
      <h1>Тест на внимание</h1>
      <button
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
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
            Вам нужно указать цвет, которым написано слово, само являющееся
            названием цвета. Название цвета (слово) может не совпадать с цветом,
            которым оно написано. Например, слово «зеленый» может быть написано
            красным цветом. Для большей ясности вот несколько примеров заданий и
            правильные ответы к ним:
          </p>
          <ul>
            <li style={{ color: "#B22222" }}>- правильный ответ «красный»</li>
            <li style={{ color: "#9ACD32" }}>- правильный ответ «зеленый»</li>
            <li style={{ color: "#FF69B4" }}>- правильный ответ «розовый»</li>
            <li style={{ color: "#FF8C00" }}>- правильный ответ «оранжевый»</li>
          </ul>
        </div>
      </div>
      <p>Нажимайте кнопку, обозначающую тот цвет, которым написано слово</p>
      <p>
        <progress id="progress" value={0} max={100} />
      </p>
      <p>
        <button id="start">Начать</button>
      </p>
      <p id="word" />
      <div className="answ-bottons">
        <button id="red" className="colorb" disabled>
          Красный
        </button>
        <button id="green" className="colorb" disabled>
          Зеленый
        </button>
        <button id="blue" className="colorb" disabled>
          Синий
        </button>
        <br />
        <button id="orange" className="colorb" disabled>
          Оранжевый
        </button>
        <button id="yellow" className="colorb" disabled>
          Желтый
        </button>
        <button id="pink" className="colorb" disabled>
          Розовый
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
          defaultValue="Внимание"
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

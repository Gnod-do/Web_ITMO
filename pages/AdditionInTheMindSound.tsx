import React, { useEffect } from "react";
import { getTestResult, setTestResult } from "../utils/globals";

const AdditionInTheMindSound = () => {
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
        resultDiv.innerText = "Ваш браузер не поддерживает голосовой синтез.";
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
        if (resultDiv) resultDiv.innerText = "А вот так вот не надо...";
      } else {
        if (resultDiv)
          resultDiv.innerText = `Ваше время реакции: ${time.toFixed(
            2
          )} миллисекунд.`;
        totalReactionTime += time;
      }
    } else {
      if (parseFloat(time.toFixed(2)) < 0) {
        if (resultDiv) resultDiv.innerText = "А вот так вот не надо...";
      } else {
        if (resultDiv) resultDiv.innerText = "Ошибочка(";
        wrong++;
      }
    }
    averageReactionTime = totalReactionTime / (attempts - wrong);
    percentage = (averageReactionTime / totalReactionTime) * 100;
    average = document.getElementById("average") as HTMLInputElement;
    if (attempts === maxAttempts) {
      if (average) {
        average.innerText += ` Среднее время реакции: ${averageReactionTime.toFixed(2)} миллисекунд.`;
      }
      // save score to global object
      const testId = 'additionInTheMindSound';
      setTestResult(testId, (averageReactionTime.toFixed(2).toString() + " millisecond"));
      // for test only
      getTestResult('additionInTheMindSound');

      let start = document.querySelector(".start") as HTMLInputElement;
      start.style.display = "block";

    } else {
      setTimeout(startTest, 2000);
    }
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
    <div style={{backgroundImage: 'linear-gradient(105.07deg, rgb(85, 211, 211) -64.38%, rgb(43, 58, 186) 138.29%)'}}>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/soundTest.css" />
      <button style={{display:'none'}}
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Document</title>
      <title>Звук чет/нечет</title>
      <meta charSet="UTF-8" />
      <h1 style={{marginTop: '0'}}>Оценка скорости реакции на сложение в уме(звук)</h1>
      <button className="instructions-button" onClick={openModalW} style={{display:'none'}}>
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
            Для начала теста, нажмите кнопку "Начать". Вы услышите два числа,
            ваша задача сложить их и определить, является ли результат четным
            или нечетным. Нажмите соответствующую кнопку, чтобы выбрать ответ.
            Вы можете повторить тест несколько раз, чтобы улучшить свой
            результат.
          </p>
        </div>
      </div>
      <p>Сложите числа и выберите результат. </p>
      <progress id="progress" value={0} max={100} />
      <button className="start" onClick={startTest} style={{borderRadius: '0', backgroundColor:'#00FF00', color:'black', marginBottom: '2%'}}>
        Начать
      </button>
      <p></p>
      <div id="question" />
      <button className="even" onClick={() => checkAnswer("четное")} style={{borderRadius: '0', backgroundColor:'#FFCC00', color:'black'}} >
        Четное
      </button>
      <button className="odd" onClick={() => checkAnswer("нечетное")} style={{borderRadius: '0', backgroundColor:'#CC3300', color:'black',textAlign:'center', padding:'20px 30px', marginLeft:'20px'}}>
        Нечетное
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
          defaultValue="Сложение (звук)"
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

export default AdditionInTheMindSound;

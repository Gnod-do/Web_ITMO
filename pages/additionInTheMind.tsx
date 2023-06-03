import React, { useEffect } from "react";

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
  let averageGood: HTMLInputElement;
  let averageBad: HTMLInputElement;
  let resultDiv: HTMLInputElement;
  let startTime: number;
  let a: number, b: number, answers: number;
  let attempts = 0;
  let totalReactionTime = 0;
  let totalReactionTimeBad = 0;
  const maxAttempts = 5;
  let averageReactionTimeGood: any;
  let averageReactionTimeBad: any;
  let percentageReactionTimeGood;
  let wrong = 0;

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
        resultDiv.innerText = `Ваше время реакции: ${time.toFixed(
          2
        )} миллисекунд.`;
      totalReactionTime += time;
    } else {
      if (resultDiv) resultDiv.innerText = "Ошибочка(";
      wrong++;
      totalReactionTimeBad += time;
    }
    answers++;
    let averageGoodTMP = parseInt((totalReactionTimeBad / wrong).toFixed(2));
    let averageBadTMP = parseInt((totalReactionTime / (attempts - wrong)).toFixed(2));
    if (averageReactionTimeBad)
      averageReactionTimeBad = (totalReactionTimeBad / wrong).toFixed(0);
    if (averageReactionTimeGood)
      averageReactionTimeGood = (
        totalReactionTime /
        (attempts - wrong)
      ).toFixed(0);
    if (attempts === maxAttempts) {
      if (averageGood)
        averageGood.innerText += ` Среднее время реакции (правильные ответы): ${averageGoodTMP} миллисекунд.`;
      if (averageBad)
        averageBad.innerText += ` Среднее время реакции (неправильные ответы): ${averageBadTMP} миллисекунд.`;
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
    //   if (total_time) total_time.value = totalReactionTime.toFixed(2);
    //   const correct = document.getElementById("correct") as HTMLInputElement;
    //   if (correct) correct.value = (maxAttempts - wrong).toFixed(0);
    //   const misses = document.getElementById("misses") as HTMLInputElement;
    //   if (misses) misses.value = wrong.toFixed(0);
    //   const score = document.getElementById("score") as HTMLInputElement;
    //   if (score) score.value = percentageReactionTimeGood.toFixed(0);
    //   const submitButton = document.getElementById(
    //     "submit-button"
    //   ) as HTMLInputElement;
    //   if (submitButton) submitButton.click();

      //sendForm
    } else {
      setTimeout(startTest, 2000);
    }
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
    <div style={{backgroundImage: 'linear-gradient(105.07deg, rgb(85, 211, 211) -64.38%, rgb(43, 58, 186) 138.29%)'}}>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/evenOddTest.css" />
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
      <h1 style={{marginTop: '0'}}>Оценка скорости реакции на сложение в уме(текст)</h1>
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
            Для начала теста, нажмите кнопку "Начать". Вы увидете два числа,
            ваша задача сложить их и определить, является ли результат четным
            или нечетным. Нажмите соответствующую кнопку, чтобы выбрать ответ.
            Вы можете повторить тест несколько раз, чтобы улучшить свой
            результат.
          </p>
        </div>
      </div>
      <p>Сложите числа и выберите результат. </p>
      <progress id="progress" value={0} max={100} />
      <p>
        <button className="start" onClick={startTest} style={{borderRadius: '0', backgroundColor:'#00FF00', color:'black', marginBottom: '2%'}}>
          Начать
        </button>
      </p>
      <p></p>
      <div id="question" />
      <button style={{borderRadius: '0', backgroundColor:'#FFCC00', color:'black'}} className="even" onClick={() => checkAnswer("четное")}>
        Четное
      </button>
      <button style={{borderRadius: '0', backgroundColor:'#CC3300', color:'black',textAlign:'center', padding:'20px 30px', marginLeft:'20px'}} className="odd" onClick={() => checkAnswer("нечетное")}>
        Нечетное
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
    </div>
  );
};

export default additionInTheMind;

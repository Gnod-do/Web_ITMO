import React, { useEffect } from "react";

const thinking = () => {
  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }

  let currentSequence = 0;
  const sequences = [
    generateSequence1,
    generateSequence2,
    generateSequence3,
    generateSequence4,
    generateSequence5,
    generateSequence6,
    generateSequence7,
    generateSequence8,
    generateSequence9,
    generateSequence10,
  ];

  let numCorrect = 0;
  let numDisplayed = 0;

  let answerInput;

  function start() {
    numCorrect = 0;
    numDisplayed = 0;
    currentSequence = 0;
    displaySequence();
    const answer = document.getElementById("answer") as HTMLInputElement;
    answer.value = "";
    const endTest = document.getElementById("end-test") as HTMLInputElement;
    if (endTest) endTest.style.display = "none";
    const startButton = document.getElementById(
      "start-button"
    ) as HTMLInputElement;
    if (startButton) startButton.style.display = "none";
    const answerInput = document.getElementById(
      "answer-input"
    ) as HTMLInputElement;
    if (answerInput) answerInput.style.display = "block";
    const next = document.getElementById("next") as HTMLInputElement;
    next.style.display = "block";
    const testEnd = document.getElementById("test-end") as HTMLInputElement;
    if (testEnd) testEnd.innerHTML = "";
    const result = document.getElementById("result") as HTMLInputElement;
    if (result) result.innerHTML = "";
    const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
    if (scoreMy) scoreMy.innerHTML = "";
    answer.disabled = false; // added this line
  }

  function endTestHandle() {
    const endTest = document.getElementById("end-test") as HTMLInputElement;
    endTest.style.display = "none";
    const startButton = document.getElementById(
      "start-button"
    ) as HTMLInputElement;
    if (startButton) startButton.style.display = "block"; // Отобразить кнопку "Начать"
    const percentage = Math.round((numCorrect / numDisplayed) * 100);
    const resultString = `${numCorrect} из ${numDisplayed} (${percentage}%) правильных ответов`;
    const testEnd = document.getElementById("test-end") as HTMLInputElement;
    if (testEnd)
      testEnd.innerHTML = `Тест завершен. Результат: ${resultString}.`;
    const sequence = document.getElementById("sequence") as HTMLInputElement;
    if (sequence) sequence.innerHTML = "";
    const answerInput = document.getElementById(
      "answer-input"
    ) as HTMLInputElement;
    if (answerInput) answerInput.style.display = "none";
    const answer = document.getElementById("answer") as HTMLInputElement;
    if (answer) answer.disabled = true;
    const next = document.getElementById("next") as HTMLInputElement;
    if (next) next.style.display = "none";
    if (endTest) endTest.style.display = "none";
    const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
    if (scoreMy) scoreMy.innerHTML = "";
    startButton.addEventListener("click", start);
    document.body.appendChild(startButton);
    //sendForm
    const correct = document.getElementById("correct") as HTMLInputElement;
    correct.value = percentage.toFixed(0);
    const score = document.getElementById("score") as HTMLInputElement;
    score.value = percentage.toFixed(0);
    const submitButton = document.getElementById(
      "submitButton"
    ) as HTMLInputElement;
    submitButton.click();
    //sendForm
  }
  function nextSequence() {
    currentSequence++;
    if (currentSequence >= sequences.length) {
      const percentage = Math.round((numCorrect / numDisplayed) * 100);
      const resultString = `${numCorrect} из ${numDisplayed}  (${percentage}%)`;
      const name = document.getElementById("name") as HTMLInputElement;
      name.innerHTML = `Продолжите текущую последовательность:`;
      const result = document.getElementById("result") as HTMLInputElement;
      result.innerHTML = resultString;
      const sequence = document.getElementById("sequence") as HTMLInputElement;
      sequence.innerHTML = "";
      const answer = document.getElementById("answer") as HTMLInputElement;
      answer.value = "";
      const answerInput = document.getElementById(
        "answerInput"
      ) as HTMLInputElement;
      answerInput.style.display = "block";
      answer.disabled = false;
      return;
    }
    displaySequence();
    if (currentSequence === sequences.length - 1) {
      const next = document.getElementById("next") as HTMLInputElement;
      next.style.display = "none";
      const endTest = document.getElementById("end-test") as HTMLInputElement;
      endTest.style.display = "block";
    }
  }

  function displaySequence() {
    const sequenceFunc = sequences[currentSequence];
    if (typeof sequenceFunc === "function") {
      const sequence = sequenceFunc();
      const sequenceString = sequence.join(", ");
      const sequenceInput = document.getElementById(
        "sequence"
      ) as HTMLInputElement;
      sequenceInput.innerHTML = ` ${currentSequence + 1}: ${sequenceString}...`;
      const answer = document.getElementById("answer") as HTMLInputElement;
      answer.value = "";
      const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
      scoreMy.innerHTML = `Правильных ответов: ${numCorrect}`;
      numDisplayed++;
      const progress = document.getElementById("progress") as HTMLInputElement;
      progress.value = ((numDisplayed / sequences.length) * 100).toFixed(0);
    }
  }

  function checkAnswer() {
    const answer = document.getElementById("answer") as HTMLInputElement;
    const userAnswer = parseInt(answer.value);
    let isCorrect = false;
    let correctAnswer;
    switch (currentSequence) {
      case 0:
        correctAnswer = correctAnswer1;
        break;
      case 1:
        correctAnswer = correctAnswer2;
        break;
      case 2:
        correctAnswer = correctAnswer3;
        break;
      case 3:
        correctAnswer = correctAnswer4;
        break;
      case 4:
        correctAnswer = correctAnswer5;
        break;
      case 5:
        correctAnswer = correctAnswer6;
        break;
      case 6:
        correctAnswer = correctAnswer7;
        break;
      case 7:
        correctAnswer = correctAnswer8;
        break;
      case 8:
        correctAnswer = correctAnswer9;
        break;
      case 9:
        correctAnswer = correctAnswer10;
        break;
    }
    if (userAnswer === correctAnswer) {
      const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
      scoreMy.innerHTML = "Правильно!";
      numCorrect++;
      isCorrect = true;
    } else {
      const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
      scoreMy.innerHTML = `Неправильно. Правильный ответ: ${correctAnswer}`;
    }
    return isCorrect;
  }

  let correctAnswer1: number = 0;
  function generateSequence1() {
    const sequence = [];
    const start = Math.floor(Math.random() * 100);
    let x = start % 2 === 0 ? start + 1 : start;
    sequence.push(x);
    for (let i = 1; i < 9; i++) {
      x += 2;
      if (i === 8) {
        correctAnswer1 = x;
      } else {
        sequence.push(x);
      }
    }
    return sequence;
  }
  let correctAnswer2: number = 0;
  function generateSequence2() {
    const sequence = [];
    const start = Math.floor(Math.random() * 100);
    let x = start % 2 === 0 ? start + 1 : start;
    sequence.push(x);
    for (let i = 1; i < 9; i++) {
      x += 3;
      if (i === 8) {
        correctAnswer2 = x;
      } else {
        sequence.push(x);
      }
    }
    return sequence;
  }
  let correctAnswer3: number = 0;
  function generateSequence3() {
    const sequence = [];
    const start = Math.floor(Math.random() * 100);
    let x = start % 2 === 0 ? start + 1 : start;
    sequence.push(x);
    for (let i = 0; i < 9; i++) {
      x *= 2;
      if (i === 8) {
        correctAnswer3 = x;
      } else {
        sequence.push(x);
      }
    }
    return sequence;
  }
  let correctAnswer4: number = 0;
  function generateSequence4() {
    const sequence = [0, 1];
    let x = 1;
    for (let i = 2; i < 9; i++) {
      x = sequence[i - 2] + sequence[i - 1];
      if (i === 8) {
        correctAnswer4 = x;
      } else {
        sequence.push(x);
      }
    }
    return sequence;
  }
  let correctAnswer5: number = 0;
  function generateSequence5() {
    const sequence = [1];
    let x = 1;
    for (let i = 1; i < 4; i++) {
      x = (x + 1) * (x + 1);
      if (i === 3) {
        correctAnswer5 = x;
      } else {
        sequence.push(x);
      }
    }
    return sequence;
  }
  function isPrime(num: number) {
    if (num <= 1) return false;
    if (num === 2 || num === 3) return true;
    if (num % 2 === 0) return false;
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  let correctAnswer6: number = 0;

  function generateSequence6() {
    const sequence = [];
    let x = 2;
    while (sequence.length < 8) {
      if (isPrime(x)) {
        sequence.push(x);
      }
      x++;
    }
    correctAnswer6 = 23;
    return sequence;
  }

  let correctAnswer7: number = 0;
  function generateSequence7() {
    const sequence = [];
    const start = Math.floor(Math.random() * 100);
    let x = start;
    sequence.push(x);
    for (let i = 1; i < 9; i++) {
      x -= 7;
      if (i === 8) {
        correctAnswer7 = x;
      } else {
        sequence.push(x);
      }
    }
    return sequence;
  }

  let correctAnswer8: number = 0;
  function generateSequence8() {
    const sequence = [];
    let sum = 0;
    const n = 4;
    for (let i = 1; i <= n; i++) {
      sum += i;
      sequence.push(sum);
    }
    correctAnswer8 = sum + (n + 1);
    return sequence;
  }
  let correctAnswer9: number = 0;

  function generateSequence9() {
    const sequence = [0, 1, 1];
    for (let i = 3; i < 9; i++) {
      const sum = sequence[i - 1] + sequence[i - 2] + sequence[i - 3];
      if (i === 8) {
        correctAnswer9 = 81;
      }
      sequence.push(sum);
    }
    return sequence;
  }

  let correctAnswer10: number = 0;
  function generateSequence10() {
    const sequence = [];
    for (let i = 0; i < 9; i++) {
      const powerOfTwo = Math.pow(2, i);
      if (i === 8) {
        correctAnswer10 = powerOfTwo;
      } else {
        sequence.push(powerOfTwo);
      }
    }
    return sequence;
  }

  useEffect(() => {
    answerInput = document.getElementById("answer-input") as HTMLInputElement;
    if (answerInput) answerInput.style.display = "none";
    const next = document.getElementById("next") as HTMLInputElement;
    next.style.display = "none";
    const endTest = document.getElementById("end-test") as HTMLInputElement;
    if (endTest) endTest.style.display = "none";

    const windowClick = (event: any) => {
      const modal = document.getElementById("modal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    };
    window.addEventListener("click", windowClick);
  });
  return (
    <div style={{backgroundImage: 'linear-gradient(105.07deg, rgb(85, 211, 211) -64.38%, rgb(43, 58, 186) 138.29%)'}}>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/logicTest.css" />
      <button style={{display:'none'}}
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Document</title>
      <meta charSet="UTF-8" />
      <h1 style={{margin: '0'}}>Тест на мышление</h1>
      <button style={{display:'none'}}
        className="instructions-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Инструкция
      </button>
      <div id="modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModalW}>
            ×
          </span>
          <h2>Инструкция</h2>
          <p>
            Вам будут представлены последовательности чисел, заданные в
            определённом порядке <br />
            Ваша задача - проанализировать, как задана последовательность и в
            поле ввода написать число, котрое является следующим в данной вам
            последовательности. <br />
            Например, последовательность: 2,4,6... Правильный ответ: 8<br />
            После того как в ввели значение, нажмите кнопку "Проверить".
            <br />
            Если вы не знаете ответа, вы можете пропустить тест, нажав кнопку
            "Далее".
          </p>
        </div>
      </div>
      <p>Укажите "следующее" число в последовательности</p>
      <p>
        <progress id="progress" value={0} max={100} />
      </p>
      <div className="container">
        <button id="start-button" onClick={start} style={{left: 'calc(50% - 86px)', padding:'20px 60px',borderRadius: '0', backgroundColor:'#00FF00', color:'black'}}>
          Начать
        </button>
      </div>
      <div id="sequence" className="test-text" />
      <p></p>
      <div
        id="answer-input"
        style={{ display: "none" }}
        className="answer-string"
      >
        <input type="text" id="answer" />
        <button id="check" onClick={checkAnswer}>
          Проверить
        </button>
        <div className="container">
          <button
            id="end-test"
            onClick={endTestHandle}
            style={{ display: "none" }}
          >
            Завершить тест
          </button>
        </div>
      </div>
      <div id="scoreMy" />
      <div id="result" />
      <br />
      <div id="testEnd" />
      <div className="container">
        <button onClick={nextSequence} id="next" style={{ display: "none" }}>
          Далее
        </button>
      </div>
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Мышление"
        />
        <input type="hidden" name="avg_time" id="avg_time" />
        <input type="hidden" name="total_time" id="total_time" />
        <input type="hidden" name="correct" id="correct" />
        <input type="hidden" name="misses" id="misses" />
        <input type="hidden" name="score" id="score" />
        <input
          id="submitButton"
          type="submit"
          defaultValue="Submit"
          style={{ display: "none" }}
        />
      </form>
    </div>
  );
};

export default thinking;

import React, { useEffect } from "react";
import {
  openModalW,
  closeModalW,
} from "../components/lightTest/modalWindowController";
import LightReaction from "../components/lightTest/squareLight";

const lightTest = () => {
  useEffect(() => {
    const arg1 = document.querySelectorAll("#test .field .square");
    const arg2 = document.querySelector("#test .btn");
    const arg3 = document.querySelector("#test .result");
    const arg4 = document.getElementById("progress");

    const t = new LightReaction(arg1, arg2, arg3, arg4);

    const windowClick = (event: any) => {
      const modal = document.getElementById("modal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    };

    //блокировать нажатие на кнопку при нажатии пробела или enter
    const keydownEvent = (event: any) => {
      console.log(event.code);
      if (event.code === "Space" || event.code == "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", keydownEvent);

    window.addEventListener("click", windowClick);
    
  }, []);

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <button
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Тест на свет</title>
      <h1>Тест на свет</h1>
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
            Для начала теста, нажмите кнопку "Начать тест". <br />
            Квадраты начнут менять цвет. <br />
            Вам надо как можно быстрее нажимать "пробел", когда вы увидите, что
            какой-то квадрат сменил цвет.
          </p>
        </div>
      </div>
      <p>Нажимайте "пробел", когда квадрат сменит цвет!</p>
      <progress id="progress" value={0} max={100} />
      <div className="test" id="test">
        <div className="field">
          <div className="square" />
          <div className="square" />
          <div className="square" />
        </div>
        <button className="btn start">Начать тест</button>
        <div className="result">Здесь будет отображен результат</div>
      </div>
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Свет"
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

export default lightTest;

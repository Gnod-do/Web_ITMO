import React, { useEffect } from "react";
import {
  openModalW,
  closeModalW,
} from "../components/lightTest/modalWindowController";
import { moveBall2 } from "../components/analogStalking/analogPurs";

const analogStalking = () => {
  useEffect(() => {
    const windowClick = (event: any) => {
      const modal = document.getElementById("modal");
      if (modal && event.target === modal) {
        modal.style.display = "none";
      }
    };

    const keydownEvent = (event: any) => {
      if (event.key === "ArrowLeft") {
        moveBall2("left");
      } else if (event.key === "ArrowRight") {
        moveBall2("right");
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
      <link rel="stylesheet" href="css/analogPurs.css" />
      <button className="back-button">Назад</button>
      <title>Document</title>
      <h1>Аналоговое преследование</h1>
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
            влево и вправо. Ваша задача - управлять синим шариком с помощью
            клавиш "влево" и "вправо", чтобы держать его как можно ближе к
            красному шарику.
          </p>
        </div>
      </div>
      <p>Управляйте синим шариком с помощью клавиш "влево" и "вправо". </p>
      <progress id="progress" value={0} max={30} />
      <div id="container">
        <div id="ball1" />
        <div id="ball2" />
      </div>
      <button id="startButton">Начать</button>
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

export default analogStalking;

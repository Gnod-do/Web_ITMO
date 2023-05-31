import React, { useEffect } from "react";

const thePursuit = () => {
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
  });
  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/motionHardTest.css" />
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
      <h1>Оценка точности реакции(сложная)</h1>
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
            Для начала теста, нажмите кнопку "Начать". Нажимайте на цифры:
            (1-первый круг, 2-второй круг, 3-третий круг), когда точки будут
            находиться внутри круов. После 10 попыток тест завершится(для
            каждого круга), и вы увидите ваш средний процент попадания в круги.
            Вы можете повторить тест несколько раз, чтобы улучшить свой
            результат.
          </p>
        </div>
      </div>
      <p>
        Нажимайте на цифры: (1-первый круг, 2-второй круг, 3-третий круг), когда
        точки будут находиться внутри круга.{" "}
      </p>
      <progress id="progress1" value={0} max={100} />
      <p></p>
      <div>
        Ваш процент попадания для 1 круга: <span id="result1" />
      </div>
      <p>
        <progress id="progress2" value={0} max={100} />
      </p>
      <div>
        Ваш процент попадания для 2 круга: <span id="result2" />
      </div>
      <p>
        <progress id="progress3" value={0} max={100} />
      </p>
      <div>
        Ваш процент попадания для 3 круга: <span id="result3" />
      </div>
      <p>
        <button id="startButton">Начать</button>
      </p>
      <div id="result" />
      <div></div>
      <p>
        <canvas id="canvas" width={1200} height={360} />
      </p>
      <form id="sendForm">
        <input
          type="hidden"
          name="test_name"
          id="test_name"
          defaultValue="Точность реакции (сложная)"
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

export default thePursuit;

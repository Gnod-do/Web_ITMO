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
    <div style={{backgroundImage: 'linear-gradient(105.07deg, rgb(85, 211, 211) -64.38%, rgb(43, 58, 186) 138.29%)'}}>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <button
        className="back-button" style={{display:'none', width: '6%', backgroundColor:'#990000', color:'white',borderTopLeftRadius: '100%', borderBottomLeftRadius: '100%'}}
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Тест на свет</title>
      <h1 style={{marginTop: '0'}}>Тест на свет</h1>
      <button className="instructions-button" onClick={openModalW} style={{display: 'none', width:'16%', height: '30px', padding:'0', margin:'4vh 0', backgroundColor: '#FFFF00', color:'black', borderRadius: '0'}}>
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
      <progress id="progress" value={0} max={100} style={{marginBottom: '0'}}/>
      <div className="test" id="test">
        <div className="field">
          <div className="square" style={{borderRadius:'50%'}}/>
          <div className="square" style={{borderRadius:'50%'}}/>
          <div className="square" style={{borderRadius:'50%'}}/>
        </div>
        <button className="btn start" style={{borderRadius: '0', backgroundColor:'#00FF00', color:'black'}}>Начать тест</button>
        <div className="result" style={{display:'block', textAlign: 'center', width:'100%', height:'50px', paddingLeft:'0', margin: '4% 4% 0 0'}}>Здесь будет отображен результат</div>
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

import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const soundTest = () => {

  const { data: session }: any = useSession();
  let email: any;
  function openModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "block";
  }

  function closeModalW() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
  }

  function showNotification() {
    const message = "Your result saved!"; // Thông báo bạn muốn hiển thị
    const notification = document.createElement("div"); // Tạo một thẻ div mới
    notification.innerText = message; // Thiết lập nội dung thông báo
    notification.classList.add("notification"); // Thêm class để tùy chỉnh thông báo
    document.body.appendChild(notification); // Thêm thông báo vào DOM

    // Đợi 3 giây rồi xóa thông báo khỏi DOM
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }

  // Lắng nghe sự kiện click trên nút

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
    if (start) start.style.display = "none";
    // playSound();
    if (attempts === maxAttempts) {
      attempts = 0;
      totalReactionTime = 0;
      averageReactionTime = 0;
      average.innerText = "";
    }
    attempts++;
    let progress = document.getElementById("progress") as HTMLInputElement;
    if (progress) progress.value = (attempts * 10).toFixed(2);
    if (attempts > maxAttempts) {
      return;
    }
    timerId = setTimeout(playSound, delay);
  }

  function playSound() {
    const audio = new Audio("https://bigsoundbank.com/UPLOAD/mp3/1417.mp3");
    audio.play();
    const reactionStartTime = Date.now();
    const listener = function () {
      const reactionTime: any = Date.now() - reactionStartTime;
      const reactionTimeInput = document.getElementById(
        "reactionTime"
      ) as HTMLInputElement;
      if (reactionTimeInput)
        reactionTimeInput.innerHTML = `Your time reaction: ${reactionTime} ms`;
      totalReactionTime += reactionTime;
      averageReactionTime = totalReactionTime / attempts;
      document.removeEventListener("keydown", listener);
    };
    document.addEventListener("keydown", listener);
    if (attempts === maxAttempts) {
      if (average)
        average.innerText += ` Average time reaction: ${averageReactionTime.toFixed(
          2
        )} ms.`;
      averagePercent = ((averageReactionTime / delay) * 100).toFixed(2);

      const start = document.querySelector(".start") as HTMLInputElement;
      start.style.display = "block";

      //sendForm
      const total_time = document.getElementById(
        "total_time"
      ) as HTMLInputElement;
      if (total_time) total_time.value = totalReactionTime.toFixed(2);
      const avg_time = document.getElementById("avg_time") as HTMLInputElement;
      if (avg_time) avg_time.value = averageReactionTime.toFixed(2);
      const score = document.getElementById("score") as HTMLInputElement;
      if (score) score.value = averagePercent;
      const submitButton = document.getElementById(
        "submit-button"
      ) as HTMLInputElement;
      if (submitButton) submitButton.click();
      //sendForm
      const data = {
        email: session?.user?.email,
        testNumber: "test11",
        percent: (parseFloat(averagePercent)/10).toFixed(2) + "%",
        speed: averageReactionTime.toFixed(2) + "ms",
      };
      console.log(email);
      console.log("1233");
      axios
        .post("http://localhost:3000/api/auth/updateResult", data)
        .then((response) => {
          // Xử lý phản hồi từ server sau khi cập nhật thành công
          console.log(response.data); // In ra phản hồi từ server (tùy chỉnh theo yêu cầu)
        })
        .catch((error: AxiosError) => {
          // Xử lý lỗi trong quá trình gửi request
          console.error(error);
        });
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

    const button = document.querySelector("button");
    if (button) button.addEventListener("click", showNotification);

    window.addEventListener("click", windowClick);
  });

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(105.07deg, rgb(85, 211, 211) -64.38%, rgb(43, 58, 186) 138.29%)",
      }}
    >
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/sound.css" />
      {/* <button className="back-button" onClick="location.href='testPage.html'">Назад</button> */}
      <title>Document</title>
      <h1>Evaluation of the speed of reaction to sound</h1>
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
      <p>
        You will hear a sound, your task is to press the "space" as quickly as
        possible. When completing the test, click the Submit button, your data
        is stored{" "}
      </p>
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

      <button
        className="btn start"
        style={{
          borderRadius: "0",
          backgroundColor: "#00FF00",
          color: "black",
        }}
        onClick={showNotification}
      >
        Submit
      </button>
    </div>
  );
};

export default soundTest;

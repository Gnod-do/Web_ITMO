import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const thePursuit = () => {
  const { data: session }: any = useSession();
  const [resultData, setResultData] = useState<string>("");

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

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context1 = canvas.getContext("2d");
    const context2 = canvas.getContext("2d");
    const context3 = canvas.getContext("2d");
    const progress1 = document.getElementById("progress1") as HTMLInputElement;
    const progress2 = document.getElementById("progress2") as HTMLInputElement;
    const progress3 = document.getElementById("progress3") as HTMLInputElement;
    const startButton = document.getElementById(
      "startButton"
    ) as HTMLInputElement;
    let theResult;
    const circleX1 = 200;
    const circleY1 = 200;
    const circleX2 = 600;
    const circleY2 = 200;
    const circleX3 = 1000;
    const circleY3 = 200;
    const circleRadius = 150;
    const pointRadius = 10;
    let totalAccuracy1 = 0;
    let totalAttempts1 = 0;
    let totalAccuracy2 = 0;
    let totalAttempts2 = 0;
    let totalAccuracy3 = 0;
    let totalAttempts3 = 0;
    const point1 = {
      x: circleX1 + circleRadius,
      y: circleY1,
    };
    const point2 = {
      x: circleX2 + circleRadius,
      y: circleY2,
    };
    const point3 = {
      x: circleX3 + circleRadius,
      y: circleY3,
    };
    let fixedPointX1: number;
    let fixedPointY1: number;
    let fixedPointX2: number;
    let fixedPointY2: number;
    let fixedPointX3: number;
    let fixedPointY3: number;

    let count1 = 0;
    let totalDistance1 = 0;
    let theResult1 = 0;
    let count2 = 0;
    let totalDistance2 = 0;
    let theResult2 = 0;
    let count3 = 0;
    let totalDistance3 = 0;
    let theResult3 = 0;

    function calculateFixedPoint() {
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      const angle3 = Math.random() * Math.PI * 2;
      fixedPointX1 = circleX1 + Math.cos(angle1) * circleRadius;
      fixedPointY1 = circleY1 + Math.sin(angle1) * circleRadius;
      fixedPointX2 = circleX2 + Math.cos(angle2) * circleRadius;
      fixedPointY2 = circleY2 + Math.sin(angle2) * circleRadius;
      fixedPointX3 = circleX3 + Math.cos(angle3) * circleRadius;
      fixedPointY3 = circleY3 + Math.sin(angle3) * circleRadius;
    }

    function drawCircle() {
      if (context1) {
        context1.beginPath();
        context1.arc(circleX1, circleY1, circleRadius, 0, Math.PI * 2);
        context1.strokeStyle = "blue";
        context1.stroke();
      }
      if (context2) {
        context2.beginPath();
        context2.arc(circleX2, circleY2, circleRadius, 0, Math.PI * 2);
        context2.strokeStyle = "orange";
        context2.stroke();
      }

      if (context3) {
        context3.beginPath();
        context3.arc(circleX3, circleY3, circleRadius, 0, Math.PI * 2);
        context3.strokeStyle = "red";
        context3.stroke();
      }
    }

    function drawPoint() {
      if (context1) {
        context1.beginPath();
        context1.arc(point1.x, point1.y, pointRadius, 0, Math.PI * 2);
        context1.fillStyle = "orange";
        context1.fill();
      }
      if (context2) {
        context2.beginPath();
        context2.arc(point2.x, point2.y, pointRadius, 0, Math.PI * 2);
        context2.fillStyle = "green";
        context2.fill();
      }

      if (context3) {
        context3.beginPath();
        context3.arc(point3.x, point3.y, pointRadius, 0, Math.PI * 2);
        context3.fillStyle = "blue";
        context3.fill();
      }
    }

    function drawFixedPoint() {
      if (context1) {
        context1.beginPath();
        context1.arc(fixedPointX1, fixedPointY1, pointRadius, 0, Math.PI * 2);
        context1.stroke();
      }

      if (context2) {
        context2.beginPath();
        context2.arc(fixedPointX2, fixedPointY2, pointRadius, 0, Math.PI * 2);
        context2.stroke();
      }

      if (context3) {
        context3.beginPath();
        context3.arc(fixedPointX3, fixedPointY3, pointRadius, 0, Math.PI * 2);
        context3.stroke();
      }
    }

    function updatePointPosition() {
      const angle1 = performance.now() / 600;
      point1.x = circleX1 + Math.cos(angle1) * circleRadius;
      point1.y = circleY1 + Math.sin(angle1) * circleRadius;
      const angle2 = performance.now() / 300;
      point2.x = circleX2 + Math.cos(angle2) * circleRadius;
      point2.y = circleY2 + Math.sin(angle2) * circleRadius;
      const angle3 = performance.now() / 100;
      point3.x = circleX3 + Math.cos(angle3) * circleRadius;
      point3.y = circleY3 + Math.sin(angle3) * circleRadius;
    }

    function firstCircle() {
      const distance = Math.sqrt(
        (point1.x - fixedPointX1) ** 2 + (point1.y - fixedPointY1) ** 2
      );
      totalDistance1 += distance;
      count1++;
      if (progress1) progress1.value = ((count1 / 7) * 10).toFixed(2);
      showResult1();
    }

    function secondCircle() {
      const distance = Math.sqrt(
        (point2.x - fixedPointX2) ** 2 + (point2.y - fixedPointY2) ** 2
      );
      totalDistance2 += distance;
      count2++;
      if (progress2) progress2.value = ((count2 / 23) * 20).toFixed(2);
      showResult2();
    }

    function thirdCircle() {
      const distance = Math.sqrt(
        (point3.x - fixedPointX3) ** 2 + (point3.y - fixedPointY3) ** 2
      );
      totalDistance3 += distance;
      count3++;
      if (progress3) progress3.value = (count3 * 3).toFixed(2);
      showResult3();
    }

    function showOverallResult() {
      const averageAccuracy = (
        (theResult1 + theResult2 + theResult3) /
        90
      ).toFixed(0);
      const result = document.getElementById("result") as HTMLInputElement;
      result.innerText = `Ваша средняя точность: ${averageAccuracy}%`;
      startButton.style.display = "block";
      startButton.disabled = false;
      setResultData(averageAccuracy.toString() + "%");
      //sendForm
      // document.getElementById("avg_time").value = averageAccuracy;
      // document.getElementById("score").value = averageAccuracy;
      // document.getElementById("submit-button").click();
      //sendForm
    }

    function showResult1() {
      const averageDistance1 = totalDistance1;
      totalDistance1 = 0;
      let accuracy;
      accuracy = 100 - (averageDistance1 / circleRadius) * 100;
      if (accuracy < 0) {
        accuracy = 0;
      }
      theResult1 = theResult1 + accuracy;
      totalAccuracy1 += accuracy;
      totalAttempts1++;
      const averageAccuracy1 = totalAccuracy1 / totalAttempts1;
      const result1 = document.getElementById("result1") as HTMLInputElement;
      if (result1) result1.innerText = `${accuracy.toFixed(0)}%`;
      if (count1 === 70 && count2 === 115 && count3 === 300) {
        showOverallResult();
        result1.innerText = `${averageAccuracy1.toFixed(0)}%`;
      }
    }

    function showResult2() {
      const averageDistance2 = totalDistance2;
      totalDistance2 = 0;
      let accuracy;
      accuracy = 100 - (averageDistance2 / circleRadius) * 100;
      if (accuracy < 0) {
        accuracy = 0;
      }
      theResult2 = theResult2 + accuracy;
      totalAccuracy2 += accuracy;
      totalAttempts2++;
      const averageAccuracy2 = totalAccuracy2 / totalAttempts2;
      const result2 = document.getElementById("result2") as HTMLInputElement;
      result2.innerText = `${accuracy.toFixed(0)}%`;
      if (count1 === 70 && count2 === 115 && count3 === 300) {
        showOverallResult();
        result2.innerText = `${averageAccuracy2.toFixed(0)}%`;
      }
    }

    function showResult3() {
      const averageDistance1 = totalDistance3;
      totalDistance3 = 0;
      let accuracy;
      accuracy = 100 - (averageDistance1 / circleRadius) * 100;
      if (accuracy < 0) {
        accuracy = 0;
      }
      theResult3 = theResult3 + accuracy;
      totalAccuracy3 += accuracy;
      totalAttempts3++;
      const averageAccuracy3 = totalAccuracy3 / totalAttempts3;
      const result3 = document.getElementById("result3") as HTMLInputElement;
      if (result3) result3.innerText = `${accuracy.toFixed(0)}%`;
      if (count1 === 70 && count2 === 115 && count3 === 300) {
        showOverallResult();
        result3.innerText = `${averageAccuracy3.toFixed(0)}%`;
      }
    }
    function loop() {
      if (context1) context1.clearRect(0, 0, 400, canvas.height);
      if (context2) context2.clearRect(400, 0, 800, canvas.height);
      if (context3) context3.clearRect(800, 0, 1200, canvas.height);
      drawCircle();
      drawFixedPoint();
      updatePointPosition();
      drawPoint();
      requestAnimationFrame(loop);
    }

    calculateFixedPoint();
    loop();

    startButton.addEventListener("click", function () {
      startButton.style.display = "none";
      startButton.disabled = true;
      // count = 0;
      theResult = 0;
      totalAccuracy1 = 0;
      totalAttempts1 = 0;
      totalAccuracy2 = 0;
      totalAttempts2 = 0;
      totalAccuracy3 = 0;
      totalAttempts3 = 0;
      count1 = 0;
      totalDistance1 = 0;
      theResult1 = 0;
      count2 = 0;
      totalDistance2 = 0;
      theResult2 = 0;
      count3 = 0;
      totalDistance3 = 0;
      theResult3 = 0;
      calculateFixedPoint();
      drawCircle();
      drawFixedPoint();
      updatePointPosition();
      drawPoint();
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.code === "Digit1" &&
        count1 < 70 &&
        startButton.disabled === true
      ) {
        firstCircle();
      }
      if (
        event.code === "Digit2" &&
        count2 < 115 &&
        startButton.disabled === true
      ) {
        secondCircle();
      }
      if (
        event.code === "Digit3" &&
        count3 < 300 &&
        startButton.disabled === true
      ) {
        thirdCircle();
      }
    });
  });
  function updateRs() {
    const correctInput = document.getElementById("correct") as HTMLInputElement;
    if (correctInput) correctInput.value = resultData;
    const data = {
      email: session?.user?.email,
      testNumber: 'test7',
      percent: resultData,
      speed: resultData,
    };
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
  }
  return (
    <div style={{ backgroundImage: 'linear-gradient(105.07deg, rgb(85, 211, 211) -64.38%, rgb(43, 58, 186) 138.29%)' }}>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/motionHardTest.css" />
      <button style={{ display: 'none' }}
        className="back-button"
        onClick={() => {
          location.href = "http://localhost:3000/";
        }}
      >
        Назад
      </button>
      <title>Document</title>
      <meta charSet="UTF-8" />
      <h1 style={{ marginTop: '0' }}>Оценка точности реакции(сложная)</h1>
      <button className="instructions-button" onClick={openModalW} style={{ display: 'none' }}>
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
        <button id="startButton" style={{ borderRadius: '0', backgroundColor: '#00FF00', color: 'black', marginTop: '2%' }}>Начать</button>
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
      <button
        className="btn start"
        style={{
          borderRadius: "0",
          backgroundColor: "#00FF00",
          color: "black",
        }}
        onClick={updateRs}
      >
        Submit
      </button>
    </div>
  );
};

export default thePursuit;

import React from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const rows = 8;
const cols = 12;
const minValue = 0.01;
const maxValue = 0.1;

const arr: number[][] = [];

for (let i = 0; i < rows; i++) {
  arr[i] = new Array(cols);

  for (let j = 0; j < cols; j++) {
    const randomValue = Math.random() * (maxValue - minValue) + minValue;
    arr[i][j] = Number(randomValue.toFixed(2));
  }
}

let sum1: any = 0;
let sum2: any = 0;
let sum3: any = 0;
let sum4: any = 0;
let sum5: any = 0;
let sum6: any = 0;
let sum7: any = 0;
let sum8: any = 0;

let sum11: any = 0;
let sum21: any = 0;
let sum31: any = 0;
let sum41: any = 0;
let sum51: any = 0;
let sum61: any = 0;
let sum71: any = 0;
let sum81: any = 0;

let sum12: any = 0;
let sum22: any = 0;
let sum32: any = 0;
let sum42: any = 0;
let sum52: any = 0;
let sum62: any = 0;
let sum72: any = 0;
let sum82: any = 0;

let lastSum1: any = 0;
let lastSum2: any = 0;
let lastSum3: any = 0;

let tmp: string = "";

// function sumProcess(sums: number[], arr: number[][]){
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr[i].length; j++) {
//       sums[j] += arr[i][j];
//     }
//   }
// }

export default function resultCard() {
  const { data: session }: any = useSession() ?? { data: null };
  function dataProcess(arr: number[][]) {
    arr[0][0] = Number(
      (session?.user?.result?.test1?.coefficient * (6 + 7 + 5.5)).toFixed(2)
    );
    arr[0][1] = Number(
      (session?.user?.result?.test2?.coefficient * (6 + 7 + 5.5)).toFixed(2)
    );
    arr[0][2] = Number(
      (session?.user?.result?.test3?.coefficient * (6 + 7 + 5.5)).toFixed(2)
    );
    arr[1][6] = Number(
      (session?.user?.result?.test7?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[1][7] = Number(
      (session?.user?.result?.test8?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[1][10] = Number(
      (session?.user?.result?.test11?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[2][5] = Number(
      (session?.user?.result?.test6?.coefficient * (9 + 7 + 8)).toFixed(2)
    );
    arr[2][9] = Number(
      (session?.user?.result?.test10?.coefficient * (9 + 7 + 8)).toFixed(2)
    );
    arr[3][3] = Number(
      (session?.user?.result?.test4?.coefficient * (7 + 7 + 9)).toFixed(2)
    );
    arr[3][6] = Number(
      (session?.user?.result?.test7?.coefficient * (7 + 7 + 9)).toFixed(2)
    );
    arr[3][11] = Number(
      (session?.user?.result?.test12?.coefficient * (7 + 7 + 9)).toFixed(2)
    );
    arr[4][3] = Number(
      (session?.user?.result?.test4?.coefficient * (7 + 8 + 9)).toFixed(2)
    );
    arr[4][8] = Number(
      (session?.user?.result?.test9?.coefficient * (7 + 8 + 9)).toFixed(2)
    );
    arr[4][11] = Number(
      (session?.user?.result?.test12?.coefficient * (7 + 8 + 9)).toFixed(2)
    );
    arr[5][4] = Number(
      (session?.user?.result?.test5?.coefficient * (9 + 5.5 + 7)).toFixed(2)
    );
    arr[5][8] = Number(
      (session?.user?.result?.test9?.coefficient * (9 + 5.5 + 7)).toFixed(2)
    );
    arr[5][10] = Number(
      (session?.user?.result?.test11?.coefficient * (9 + 5.5 + 7)).toFixed(2)
    );
    arr[6][9] = Number(
      (session?.user?.result?.test10?.coefficient * (7 + 5.5 + 9)).toFixed(2)
    );
    arr[6][10] = Number(
      (session?.user?.result?.test11?.coefficient * (7 + 5.5 + 9)).toFixed(2)
    );
    arr[7][1] = Number(
      (session?.user?.result?.test2?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[7][2] = Number(
      (session?.user?.result?.test3?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[7][6] = Number(
      (session?.user?.result?.test7?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[7][7] = Number(
      (session?.user?.result?.test8?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[7][11] = Number(
      (session?.user?.result?.test12?.coefficient * (6 + 7)).toFixed(2)
    );
    return arr;
  }
  sum1 =
    arr[0][0] +
    arr[0][1] +
    arr[0][2] +
    arr[0][3] +
    arr[0][4] +
    arr[0][5] +
    arr[0][6] +
    arr[0][7] +
    arr[0][8] +
    arr[0][9] +
    arr[0][10] +
    arr[0][11];
  sum2 =
    arr[1][0] +
    arr[1][1] +
    arr[1][2] +
    arr[1][3] +
    arr[1][4] +
    arr[1][5] +
    arr[1][6] +
    arr[1][7] +
    arr[1][8] +
    arr[1][9] +
    arr[1][10] +
    arr[1][11];
  sum3 =
    arr[2][0] +
    arr[2][1] +
    arr[2][2] +
    arr[2][3] +
    arr[2][4] +
    arr[2][5] +
    arr[2][6] +
    arr[2][7] +
    arr[2][8] +
    arr[2][9] +
    arr[2][10] +
    arr[2][11];
  sum4 =
    arr[3][0] +
    arr[3][1] +
    arr[3][2] +
    arr[3][3] +
    arr[3][4] +
    arr[3][5] +
    arr[3][6] +
    arr[3][7] +
    arr[3][8] +
    arr[3][9] +
    arr[3][10] +
    arr[3][11];
  sum5 =
    arr[4][0] +
    arr[4][1] +
    arr[4][2] +
    arr[4][3] +
    arr[4][4] +
    arr[4][5] +
    arr[4][6] +
    arr[4][7] +
    arr[4][8] +
    arr[4][9] +
    arr[4][10] +
    arr[4][11];
  sum6 =
    arr[5][0] +
    arr[5][1] +
    arr[5][2] +
    arr[5][3] +
    arr[5][4] +
    arr[5][5] +
    arr[5][6] +
    arr[5][7] +
    arr[5][8] +
    arr[5][9] +
    arr[5][10] +
    arr[5][11];
  sum7 =
    arr[6][0] +
    arr[6][1] +
    arr[6][2] +
    arr[6][3] +
    arr[6][4] +
    arr[6][5] +
    arr[6][6] +
    arr[6][7] +
    arr[6][8] +
    arr[6][9] +
    arr[6][10] +
    arr[6][11];
  sum8 =
    arr[7][0] +
    arr[7][1] +
    arr[7][2] +
    arr[7][3] +
    arr[7][4] +
    arr[7][5] +
    arr[7][6] +
    arr[7][7] +
    arr[7][8] +
    arr[7][9] +
    arr[7][10] +
    arr[7][11];

  sum11 = sum1;
  sum21 = sum2;
  sum31 = sum3;
  sum41 = sum4;
  sum51 = sum5;
  sum61 = sum6;
  sum71 = sum7;
  sum81 = sum8;

  lastSum1 =
    sum1 * 0.8 +
    sum2 * 0.6 +
    sum3 * 0.7 +
    sum4 * 0.6 +
    sum5 * 0.8 +
    sum6 * 0.9 +
    sum7 * 0.7 +
    sum8 * 0.7;
  lastSum2 =
    sum1 * 0.8 +
    sum2 * 0.6 +
    sum3 * 0.7 +
    sum4 * 0.7 +
    sum5 * 0.8 +
    sum6 * 0.9 +
    sum7 * 0.8 +
    sum8 * 0.8;
  lastSum3 =
    sum1 * 0.9 +
    sum2 * 0.8 +
    sum3 * 1 +
    sum4 * 0.8 +
    sum5 * 0.9 +
    sum6 * 1 +
    sum7 * 0.9 +
    sum8 * 0.9;

  let max = Math.max(lastSum1, lastSum2, lastSum3);

  if (max === lastSum1) {
    tmp =
      "Поздравляю Вас с выбором профессии ИНДИ РАЗРАБОТЧИК! Это замечательный выбор для тех, кто увлечен программированием и разработкой программного обеспечения. Ваш творческий подход и страсть к технологиям помогут создавать уникальные и ценные продукты для пользователей. Я уверен, что Ваша профессиональность и высокое качество работы будут признаны в индустрии. Удачи Вам в работе и достижении новых вершин в своей карьере!";
  }

  if (max === lastSum2) {
    tmp =
      "Поздравляю Вас с выбором профессии MOBILE РАЗРАБОТЧИК! Это отрасль с огромными перспективами и быстрым развитием, где Вы можете создавать уникальные и полезные мобильные приложения для пользователей. С крепкими знаниями в программировании и практическим опытом, я уверен, что Вы создадите прорывные продукты и сможете удовлетворить все более высокие требования рынка.";
  }

  if (max === lastSum3) {
    tmp =
      "Поздравляю Вас с выбором профессии DATA SCIENTIST! Это отрасль с огромными перспективами и быстрым развитием, где Вы можете применять методы анализа данных для поиска важной и полезной информации для бизнеса.";
  }

  sum12 = sum1;
  sum22 = sum2;
  sum32 = sum3;
  sum42 = sum4;
  sum52 = sum5;
  sum62 = sum6;
  sum72 = sum7;
  sum82 = sum8;

  dataProcess(arr);

  const pStyle: React.CSSProperties = {
    color: "black",
    textAlign: "left",
    fontSize: 14,
    padding: 10,
    border: "1px solid black",
    marginTop: 7,
    width: "90%",
    display: "inline-flex",
    justifyContent: "space-between",
  };
  const btnStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "-40px",
    padding: "12px",
    borderRadius: "50px",
    width: "200px",
  };
  // FOR CAT ALERT
  const handleClick = () => {
    Swal.fire({
      title: tmp,
      width: 600,
      padding: "3em",
      color: "#716add",
      background:
        "#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.tenor.com/-AyTtMgs2mMAAAAi/nyan-cat-nyan.gif")
        left top
        no-repeat
      `,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: 100,
        paddingBottom: 100,
      }}
    >
      {/* COL 1*/}
      <div style={{ width: "350px", height: "600px", backgroundColor: "#fff" }}>
        <div>
          <p
            style={{
              color: "black",
              textAlign: "left",
              fontSize: 14,
              padding: 10,
            }}
          >
            <b>ИНДИ-РАЗРАБОТЧИК</b> <br /> <br />
            Профессия ИНДИ-РАЗРАБОТЧИК требует знаний в области программирования
            (например, Java, Python, C++, JavaScript, Ruby и т.д.) и других
            инструментов разработки программного обеспечения. Также важным
            является умение изучать и применять новые технологии, а также
            способность решать задачи и работать самостоятельно.
          </p>
        </div>
        <div>
          <div style={pStyle}>
            <div>• Внимательность</div>
            {
              (sum1 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum1 * 0.8).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Выносливость</div>
            {
              (sum2 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum2 * 0.6).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Ёмкость памяти</div>
            {
              (sum3 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum3 * 0.7).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Многозадачность</div>
            {
              (sum4 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum4 * 0.6).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Наблюдательность</div>
            {
              (sum5 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum5 * 0.8).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Мышление</div>
            {
              (sum6 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum6 * 0.9).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Переключаемость внимания</div>
            {
              (sum7 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum7 * 0.7).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Реакция</div>
            {
              (sum8 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum8 * 0.7).toFixed(2)}</div>
              ))
            }
          </div>
        </div>
      </div>
      {/* COL 2 */}
      <div style={{ width: "350px", height: "600px", backgroundColor: "#fff" }}>
        <div style={{ marginBottom: 15 }}>
          <p
            style={{
              color: "black",
              textAlign: "left",
              fontSize: 14,
              padding: 10,
            }}
          >
            <b>МОБИЛЬНЫЙ РАЗРАБОТЧИК</b> <br /> <br />
            Профессия MOBILE РАЗРАБОТЧИК требует творческого мышления, умения
            решать проблемы и исследовать новые возможности, в сочетании с
            умением использовать необходимые технологии и инструменты.
          </p>
        </div>
        <div>
          <div style={pStyle}>
            <div>• Внимательность</div>
            {
              (sum11 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum11 * 0.8).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Выносливость</div>
            {
              (sum21 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum21 * 0.6).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Ёмкость памяти</div>
            {
              (sum31 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum31 * 0.7).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Многозадачность</div>
            {
              (sum41 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum41 * 0.7).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Наблюдательность</div>
            {
              (sum51 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum51 * 0.8).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Мышление</div>
            {
              (sum61 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum61 * 0.9).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Переключаемость внимания</div>
            {
              (sum71 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum71 * 0.8).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Реакция</div>
            {
              (sum81 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum81 * 0.8).toFixed(2)}</div>
              ))
            }
          </div>
        </div>
      </div>
      {/* COL 3 */}
      <div style={{ width: "350px", height: "600px", backgroundColor: "#fff" }}>
        <div style={{ marginBottom: 63 }}>
          <p
            style={{
              color: "black",
              textAlign: "left",
              fontSize: 14,
              padding: 10,
            }}
          >
            <b>УЧЕНЫЙ ПО ДАННЫМ</b> <br /> <br />
            Профессия DATA SCIENTIST требует творческого мышления, умения решать
            проблемы и использовать современные технологии и инструменты анализа
            данных.
          </p>
        </div>
        <div>
          <div style={pStyle}>
            <div>• Внимательность</div>
            {
              (sum12 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum12 * 0.9).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Выносливость</div>
            {
              (sum22 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum22 * 0.8).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Ёмкость памяти</div>
            {
              (sum32 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum32 * 1).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Многозадачность</div>
            {
              (sum42 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum42 * 0.8).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Наблюдательность</div>
            {
              (sum52 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum52 * 0.9).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Мышление</div>
            {
              (sum62 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum62 * 1).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Переключаемость внимания</div>
            {
              (sum72 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum72 * 0.9).toFixed(2)}</div>
              ))
            }
          </div>
          <div style={pStyle}>
            <div>• Реакция</div>
            {
              (sum82 = 0 ? (
                <div>Retrieving data from API...</div>
              ) : (
                <div>{(sum82 * 0.9).toFixed(2)}</div>
              ))
            }
          </div>
        </div>
      </div>
      <button style={btnStyle} onClick={handleClick}>
        Let's see last result
      </button>
    </div>
  );
}

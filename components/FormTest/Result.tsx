import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type ResultData = {
  First: boolean;
  Second: boolean;
  Third: boolean;
  Fourth: boolean;
  Fifth: boolean;
  Sixth: boolean;
  Seventh: boolean;
  Eighth: boolean;
  Ninth: boolean;
  Tenth: boolean;
  Eleventh: boolean;
  Twelfth: boolean;
  Thirteenth: boolean;
  Fourteenth: boolean;
  Fifteenth: boolean;
};
type ResultProps = ResultData & {
  setShow: () => void;
};

export function Result(props: ResultProps) {
  const { setShow } = props;
  const test = Object.values(props);
  const anser1 = [1, 3, 5, 7, 15];
  const anser2 = [2, 4, 6, 8, 14];
  const anser3 = [9, 10, 11, 12, 13];

  let result1 = 0,
    result2 = 0,
    result3 = 0;
  anser1.forEach((item) => {
    if (test[item - 1]) {
      result1++;
    }
  });
  anser2.forEach((item) => {
    if (test[item - 1]) {
      result2++;
    }
  });
  anser3.forEach((item) => {
    if (test[item - 1]) {
      result3++;
    }
  });
  console.log((result1 * 100) / anser1.length + "%");
  const data = {
    labels: [
      "ИНДИ РАЗРАБОТЧИК",
      "MOBILE РАЗРАБОТЧИК",
      "DATA SCIENTIST",
      "Другой",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [
          (result1 * 100) / test.length,
          (result2 * 100) / test.length,
          (result3 * 100) / test.length,
          100 -
            (result1 * 100) / test.length -
            (result2 * 100) / test.length -
            (result3 * 100) / test.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const a: number = (result1 * 100) / test.length;
  const b: number = (result2 * 100) / test.length;
  const c: number = (result3 * 100) / test.length;
  const max: number = Math.max(a, b, c);
  return (
    <div
      className={"result"}
      style={{ backgroundColor: "#fff", marginTop: "0" }}
    >
      {/* we got 1: {(result1 * 100) / test.length + '%'} */}
      {/* we got 2: {(result2 * 100) / test.length + '%'} */}
      {/* we got 3: {(result3 * 100) / test.length + '%'} */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "30px", color: "green" }}>
          Результат тестирования
        </p>
        <Doughnut data={data} />
      </div>
      <div style={{ width: "50%", marginLeft: "4%" }}>
        <ul
          style={{
            color: "black",
            marginLeft: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <li>
            ИНДИ РАЗРАБОТЧИК -{" "}
            <span>{(result1 * 100) / test.length + "%"}</span>
          </li>
          <li style={{ margin: "16px 0" }}>
            MOBILE РАЗРАБОТЧИК -{" "}
            <span>{(result2 * 100) / test.length + "%"}</span>
          </li>
          <li>
            DATA SCIENTIST - <span>{(result3 * 100) / test.length + "%"}</span>
          </li>
        </ul>
        {max === a && (
          <>
            <h3 style={{ color: "black", margin: "40px 0 16px 0" }}>
              Вы Инди-разработчик.
            </h3>
            <p
              style={{
                color: "black",
                marginBottom: "16px",
                textAlign: "justify",
              }}
            >
              Это специалист, который занимается самостоятельной разработкой игр
              или входит в состав небольшой команды без финансовой поддержки
              какого-либо издания. В его обязанности входит полная разработка
              проекта: от проработки сюжета и арт-концептов до игровых механик.
            </p>
          </>
        )}
        {max === b && (
          <>
            <h3 style={{ color: "black", margin: "40px 0 16px 0" }}>
              Вы разработчик
            </h3>
            <p
              style={{
                color: "black",
                marginBottom: "16px",
                textAlign: "justify",
              }}
            >
              Специалист, который создает программные приложения для телефонов,
              планшетов и других мобильных устройств. Помимо непосредственно
              программирования он часто ведет коммуникацию с другими отделами по
              продукту, проводит финальное ревью и заливает на нужные платформы.
            </p>
          </>
        )}
        {max === c && (
          <>
            <h3 style={{ color: "black", margin: "40px 0 16px 0" }}>
              Вы Data Scientist.
            </h3>
            <p
              style={{
                color: "black",
                marginBottom: "16px",
                textAlign: "justify",
              }}
            >
              Специалист, который работает с данными из различных источников:
              собирает их, структурирует, выделяет их и занимается машинным
              обучением. Ему нужно знать аналитические методы, алгоритмы
              машинного обучения и уметь работать с базами данных.
            </p>
          </>
        )}
        <button
          style={{ width: "120px", height: "32px", fontSize: "18px" }}
          onClick={() => setShow()}
        >
          BACK
        </button>
      </div>
    </div>
  );
}

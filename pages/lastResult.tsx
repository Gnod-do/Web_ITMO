import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";

const LastResult = () => {
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);

  const { data: session }: any = useSession();

  function compoundInterest(
    principal: any,
    rate: any,
    years: any,
    compoundPerYear: any,
    contribution: any
  ) {
    const r = rate / 100;
    const n = compoundPerYear;
    const t = years;
    const P = principal;
    const c = contribution;

    const A = P * Math.pow(1 + r / n, n * t);
    const S = (c * (Math.pow(1 + r / n, n * t) - 1) * (1 + r / n)) / (r / n);
    const F = A + S;

    return F.toFixed(2); // Làm tròn đến 2 chữ số thập phân
  }

  let tmp1: number = 0;
  let tmp2: number = 0;
  let tmp3: number = 0;
  let lastResult1: number = 0;
  let lastResult2: number = 0;
  let lastResult3: number = 0;

  function getAnswer() {
    let result1: any;
    let result2: any;
    let result3: any;

    result1 = session?.user.test1.percent;
    const percentNumber1 = parseFloat(result1) / 100;
    result2 = session?.user.test2.percent;
    const percentNumber2 = parseFloat(result2) / 100;
    result2 = session?.user.test3.percent;
    const percentNumber3 = parseFloat(result3) / 100;

    if (percentNumber1 < 40) {
      tmp1 += 5;
    } else if (percentNumber1 < 80) {
      tmp2 += 5;
    } else {
      tmp3 += 5;
    }

    if (percentNumber2 < 40) {
      tmp1 += 5;
    } else if (percentNumber2 < 80) {
      tmp2 += 5;
    } else {
      tmp3 += 5;
    }

    if (percentNumber3 < 40) {
      tmp1 += 5;
    } else if (percentNumber3 < 80) {
      tmp2 += 5;
    } else {
      tmp3 += 5;
    }

    lastResult1 =
      (percentNumber1 / (percentNumber1 + percentNumber2 + percentNumber3)) *
      100;
    lastResult2 =
      (percentNumber2 / (percentNumber1 + percentNumber2 + percentNumber3)) *
      100;
    lastResult3 =
      (percentNumber3 / (percentNumber1 + percentNumber2 + percentNumber3)) *
      100;
  }

  useEffect(() => {
    const generateRandomData = () => {
      const randomProfessions = [
        {
          name: "Инди-разработчик",
          percentage: Math.floor(Math.random() * 100),
        },
        {
          name: "Специалист по данным",
          percentage: Math.floor(Math.random() * 100),
        },
        {
          name: "Инди-разработчик",
          percentage: Math.floor(Math.random() * 100),
        },
      ];

      const randomQualities = [
        { name: "Внимание", percentage: Math.floor(Math.random() * 100) },
        { name: "Логика", percentage: Math.floor(Math.random() * 100) },
        {
          name: "Стрессоустойчивость",
          percentage: Math.floor(Math.random() * 100),
        },
      ];

      setProfessions(randomProfessions);
      setQualities(randomQualities);
    };

    generateRandomData();
  }, []);

  const listStyles = {
    padding: 0,
    listStyleType: "none",
  };

  const itemStyles = {
    marginBottom: "8px",
    textAlign: "left",
    paddingLeft: 150,
  };

  const professionStyles = {
    fontWeight: "bold",
    marginRight: "8px",
  };

  return (
    <div
      style={{
        minWidth: 500,
        minHeight: 600,
        marginTop: 10,
        backgroundColor: "white",
        color: "black",
        backgroundImage:
          "linear-gradient(105.07deg, rgb(85, 211, 211) -64.38%, rgb(43, 58, 186) 138.29%)",
      }}
    >
      <div>
        <div sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <h1
            style={{
              textAlign: "left",
              paddingLeft: 100,
              paddingBottom: 50,
              paddingTop: 100,
            }}
          >
            Ваши результаты
          </h1>
        </div>
        <div>{session?.user.fullName}</div>
        <div variant="h5" component="div"></div>
        <div sx={{ mb: 1.5 }} color="text.secondary">
          <h2 style={{ textAlign: "left", paddingLeft: 100 }}>Работа:</h2>
          <ul style={listStyles}>
            {professions.map((profession, index) => (
              <li key={index} style={itemStyles}>
                <span
                  style={professionStyles}
                >{`${profession.percentage}%`}</span>
                {profession.name}
              </li>
            ))}
          </ul>
        </div>
        <div sx={{ mb: 1.5 }} color="text.secondary">
          <h2 style={{ textAlign: "left", paddingLeft: 100 }}>
            Top 3 Qualities:
          </h2>
          <ul style={listStyles}>
            {qualities.map((quality, index) => (
              <li key={index} style={itemStyles}>
                <span style={professionStyles}>{`${quality.percentage}%`}</span>
                {quality.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div style={{ textAlign: "center", marginTop: 100 }}>
          Для развития других навыков можно пройти тесты
        </div>
        мышление, Добавление, Память,
      </div>
    </div>
  );
};

export default LastResult;

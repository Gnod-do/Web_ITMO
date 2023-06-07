import React from "react";

type Props = {};

const grade = (props: Props) => {
  return (
    <>
      <p
        style={{
          textAlign: "center",
          margin: "10px 0",
          fontSize: "28px",
          fontWeight: "600",
        }}
      >
        РЕЗУЛЬТАТЫ
      </p>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{
            backgroundImage: "linear-gradient(to top, #2d3b72, #62c9ca)",
            borderRadius: "4px",
            paddingBottom: "20px",
            width: "30%",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "20px",
              color: "white",
              paddingTop: "15px",
            }}
          >
            ИНДИ РАЗРАБОТЧИК
          </p>
          <div style={{ display: "flex" }}>
            <div
              style={{
                margin: "10px 15px 0 4px",
                borderRight: "2px solid #ffffff",
              }}
            >
              <ul
                style={{
                  color: "white",
                  fontSize: "16px",
                  lineHeight: "30px",
                  marginRight: "15px",
                  marginLeft: "24px",
                }}
              >
                <li>Самостоятельность</li>
                <li>
                  Способность организовать свою деятельность в условиях большого
                  потока информации и разнообразия поставленных задач
                </li>
                <li>Способность к зрительным представлениям</li>
                <li>Креативность</li>
                <li>Объём внимания</li>
              </ul>
            </div>
            <div
              style={{
                color: "white",
                lineHeight: "30px",
                marginTop: "10px",
                paddingRight: "12px",
                textAlign: "center",
              }}
            >
              <span>
                9<br></br>
              </span>
              <span>
                7<br></br>
              </span>
              <span style={{ display: "block", marginTop: "90px" }}>
                5,5<br></br>
              </span>
              <span style={{ display: "block", marginTop: "32px" }}>
                7<br></br>
              </span>
              <span style={{ display: "block", marginTop: "2px" }}>
                6<br></br>
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundImage: "linear-gradient(to top, #2d3b72, #62c9ca)",
            borderRadius: "4px",
            paddingBottom: "20px",
            width: "30% ",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "20px",
              color: "white",
              paddingTop: "15px",
            }}
          >
            MOBILE РАЗРАБОТЧИК
          </p>
          <div style={{ display: "flex" }}>
            <div
              style={{
                margin: "10px 15px 0 4px",
                borderRight: "2px solid #ffffff",
              }}
            >
              <ul
                style={{
                  color: "white",
                  fontSize: "16px",
                  lineHeight: "30px",
                  marginRight: "15px",
                  marginLeft: "24px",
                }}
              >
                <li>Старательность, исполнительность</li>
                <li>Экстернальность</li>
                <li>Переключаемость внимания</li>
                <li>Аналитичность</li>
                <li>Способность к воссозданию образа по словесному описанию</li>
              </ul>
            </div>
            <div
              style={{
                color: "white",
                lineHeight: "30px",
                marginTop: "12px",
                paddingRight: "12px",
                textAlign: "center",
              }}
            >
              <span>
                7<br></br>
              </span>
              <span>
                6<br></br>
              </span>
              <span>
                6,5<br></br>
              </span>
              <span>
                8<br></br>
              </span>
              <span>
                9<br></br>
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundImage: "linear-gradient(to top, #2d3b72, #62c9ca)",
            borderRadius: "4px",
            paddingBottom: "20px",
            width: "30%",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "20px",
              color: "white",
              paddingTop: "15px",
            }}
          >
            DATA SCIENTIST
          </p>
          <div style={{ display: "flex" }}>
            <div
              style={{
                margin: "10px 15px 0 4px",
                borderRight: "2px solid #ffffff",
              }}
            >
              <ul
                style={{
                  color: "white",
                  fontSize: "16px",
                  lineHeight: "30px",
                  marginRight: "15px",
                  marginLeft: "24px",
                }}
              >
                <li>
                  Способность представлять себе новое явление, раннее не
                  встречающееся
                </li>
                <li>Логичность</li>
                <li>Синтетичность</li>
                <li>
                  Способность к распределению внимания между несколькими
                  объектами или видами деятельности
                </li>
                <li>Ответственность</li>
              </ul>
            </div>
            <div
              style={{
                color: "white",
                lineHeight: "30px",
                marginTop: "10px",
                paddingRight: "12px",
                textAlign: "center",
              }}
            >
              <span>
                8<br></br>
              </span>
              <span style={{ display: "block", marginTop: "60px" }}>
                10<br></br>
              </span>
              <span>
                6,5<br></br>
              </span>
              <span>
                8<br></br>
              </span>
              <span style={{ display: "block", marginTop: "90px" }}>
                7<br></br>
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
              className="btn start"
              style={{
                borderRadius: "0",
                backgroundColor: "#00FF00",
                color: "black",
              }}
              onClick={() => {
                location.href = "http://localhost:3000/lastResult";
              }}
            >
              Let see your result!
            </button>
    </>
  );
};

export default grade;

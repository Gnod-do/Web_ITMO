import React from 'react';
import Swal from 'sweetalert2';

export default function resultCard() {
  const pStyle: React.CSSProperties = {
    color: 'black',
    textAlign: 'left',
    fontSize: 14,
    padding: 10,
    border: '1px solid black',
    marginTop: 7,
    width: '90%',
    display: 'inline-flex',
    justifyContent: 'space-between'
  };
  const btnStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-40px',
    padding: '12px',
    borderRadius: '50px',
    width: '200px',
  };
  // FOR CAT ALERT
  const handleClick = () => {
    Swal.fire({
      title: 'Data set here',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.tenor.com/-AyTtMgs2mMAAAAi/nyan-cat-nyan.gif")
        left top
        no-repeat
      `
    });
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 100, paddingBottom: 100 }}>
      {/* COL 1*/}
      <div style={{ width: '350px', height: '600px', backgroundColor: '#fff' }}>
        <div>
          <p style={{ color: 'black', textAlign: 'left', fontSize: 14, padding: 10 }}>
            <b>ИНДИ-РАЗРАБОТЧИК</b> <br /> <br />
            Поздравляю Вас с выбором профессии ИНДИ РАЗРАБОТЧИК!
            Это замечательный выбор для тех, кто увлечен программированием
            и разработкой программного обеспечения. Ваш творческий подход и страсть к
            технологиям помогут создавать уникальные и ценные продукты для пользователей.
            Я уверен, что Ваша профессиональность и высокое качество работы будут признаны в
            индустрии. Удачи Вам в работе и достижении новых вершин в своей карьере!
          </p>
        </div>
        <div>
          <div style={pStyle}>
            <div>•	Внимательность</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Выносливость</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Ёмкость памяти</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Многозадачность</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Наблюдательность</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Мышление</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Переключаемость внимания</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Реакция</div>
            <div> %</div>
          </div>
        </div>
      </div>
      {/* COL 2 */}
      <div style={{ width: '350px', height: '600px', backgroundColor: '#fff' }}>
        <div style={{ marginBottom: 15 }}>
          <p style={{ color: 'black', textAlign: 'left', fontSize: 14, padding: 10 }}>
            <b>МОБИЛЬНЫЙ РАЗРАБОТЧИК</b> <br /> <br />
            Поздравляю Вас с выбором профессии MOBILE РАЗРАБОТЧИК!
            Это отрасль с огромными перспективами и быстрым развитием,
            где Вы можете создавать уникальные и полезные мобильные приложения
            для пользователей. С крепкими знаниями в программировании и практическим
            опытом, я уверен, что Вы создадите прорывные продукты и сможете удовлетворить
            все более высокие требования рынка.
          </p>
        </div>
        <div>
          <div style={pStyle}>
            <div>•	Внимательность</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Выносливость</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Ёмкость памяти</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Многозадачность</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Наблюдательность</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Мышление</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Переключаемость внимания</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Реакция</div>
            <div> %</div>
          </div>
        </div>
      </div>
      {/* COL 3 */}
      <div style={{ width: '350px', height: '600px', backgroundColor: '#fff' }}>
        <div style={{ marginBottom: 63 }}>
          <p style={{ color: 'black', textAlign: 'left', fontSize: 14, padding: 10 }}>
            <b>УЧЕНЫЙ ПО ДАННЫМ</b> <br /> <br />
            Поздравляю Вас с выбором профессии DATA SCIENTIST! Это отрасль
            с огромными перспективами и быстрым развитием, где Вы можете применять
            методы анализа данных для поиска важной и полезной информации для бизнеса.
          </p>
        </div>
        <div>
          <div style={pStyle}>
            <div>•	Внимательность</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Выносливость</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Ёмкость памяти</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Многозадачность</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Наблюдательность</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Мышление</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Переключаемость внимания</div>
            <div> %</div>
          </div>
          <div style={pStyle}>
            <div>•	Реакция</div>
            <div> %</div>
          </div>
        </div>
      </div>
      <button style={btnStyle} onClick={handleClick}>Click me</button>
    </div>
  );
}



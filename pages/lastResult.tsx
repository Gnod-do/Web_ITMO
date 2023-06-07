import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const LastResult = () => {
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);

  useEffect(() => {
    const generateRandomData = () => {
      const randomProfessions = [
        { name: 'Инди-разработчик', percentage: Math.floor(Math.random() * 100) },
        { name: 'Специалист по данным', percentage: Math.floor(Math.random() * 100) },
        { name: 'Инди-разработчик', percentage: Math.floor(Math.random() * 100) }
      ];

      const randomQualities = [
        { name: 'Внимание', percentage: Math.floor(Math.random() * 100) },
        { name: 'Логика', percentage: Math.floor(Math.random() * 100) },
        { name: 'Стрессоустойчивость', percentage: Math.floor(Math.random() * 100) }
      ];

      setProfessions(randomProfessions);
      setQualities(randomQualities);

      generateRandomData();
    }, []);

    const listStyles = {
        padding: 0,
        listStyleType: 'none'
      };


      const itemStyles = {
        marginBottom: '8px',
        textAlign: 'left',
        paddingLeft: 150
      };

      const professionStyles = {
        fontWeight: 'bold',
        marginRight: '8px'
      };
    
      return (
        <div>

<Card sx={{ minWidth: 275, marginTop: 10 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <h1 style={{ textAlign: 'left', paddingLeft: 100, paddingBottom: 50 }}>Ваши результаты</h1>
          </Typography>
          <Typography variant="h5" component="div">
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <h3 style={{ textAlign: 'left', paddingLeft: 100 }}>Работа:</h3>
            <ul style={listStyles}>
              {professions.map((profession, index) => (
                <li key={index} style={itemStyles}>
                  <span style={professionStyles}>{`${profession.percentage}%`}</span>
                  {profession.name}
                </li>
              ))}
            </ul>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <h3 style={{ textAlign: 'left', paddingLeft: 100 }}>Top 3 Qualities:</h3>
            <ul style={listStyles}>
              {qualities.map((quality, index) => (
                <li key={index} style={itemStyles}>
                  <span style={professionStyles}>{`On ${quality.percentage}%`}</span>
                  {quality.name}
                </li>
              ))}
            </ul>
          </Typography>
        </CardContent>
        <CardActions>
          <h3 style={{ textAlign: 'center' }}>Для развития других навыков можно пройти тесты: </h3>
          мышление, Добавление, Память,

        </CardActions>
      </Card>
    </div >
  );
};


export default LastResult;
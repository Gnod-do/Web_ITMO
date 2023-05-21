import React, { useState, useEffect, useCallback } from 'react';

const ColorBox = () => {
    const [color, setColor] = useState('');
    const [correctCount, setCorrectCount] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [count, setCount] = useState(0);
    const [progressBarWidth, setProgressBarWidth] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            showColor();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const showColor = () => {
        const colors = ['red', 'green', 'blue'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);
        setStartTime(Date.now());
        setCount(count + 1);
        if (count === 6) {
            setProgressBarWidth(100);
            setCount(0);
            document.body.innerHTML = '';
            showCongratulation();
        } else {
            setProgressBarWidth(count * 20);
        }
    };

    const showAlert = () => {
        const elapsedTime = Date.now() - startTime;
        const message = `Correct! You took ${elapsedTime}ms.`;
        const alertBox = document.createElement('div');
        alertBox.innerHTML = message;
        alertBox.style.backgroundColor = 'green';
        alertBox.style.color = 'white';
        alertBox.style.padding = '10px';
        alertBox.style.borderRadius = '5px';
        alertBox.style.position = 'fixed';
        alertBox.style.top = '50%';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(alertBox);
        setTimeout(() => {
            alertBox.remove();
        }, 1000);
    };

    const showAlertFail = () => {
        const message = `Opps! wrong color`;
        const alertBox = document.createElement('div');
        alertBox.innerHTML = message;
        alertBox.style.backgroundColor = 'green';
        alertBox.style.color = 'white';
        alertBox.style.padding = '10px';
        alertBox.style.borderRadius = '5px';
        alertBox.style.position = 'fixed';
        alertBox.style.top = '50%';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(alertBox);
        setTimeout(() => {
            alertBox.remove();
        }, 1000);
    };

    const showCongratulation = () => {
        const congratulation = document.createElement('div');
        congratulation.innerHTML = `Congratulations! You have completed 5 tests! Correct Count: ${correctCount}`;
        congratulation.style.backgroundColor = 'green';
        congratulation.style.color = 'white';
        congratulation.style.padding = '10px';
        congratulation.style.borderRadius = '5px';
        congratulation.style.position = 'fixed';
        congratulation.style.top = '50%';
        congratulation.style.left = '50%';
        congratulation.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(congratulation);
    };

    const checkAnswer = (cl: string) => {
        if (color === cl) {
            setCorrectCount(correctCount + 1);
            showAlert();
        } else {
            showAlertFail();
        }
    };

    return (
        <>
            <div
                id="progress-bar"
                style={{
                    width: `${progressBarWidth}%`,
                    backgroundColor: 'red',
                    height: '20px',
                    transition: 'width 0.5s ease-in-out',
                }}></div>
            <div
                id="color-box"
                style={{ backgroundColor: color, height: '20px' }}></div>
            <div id="button-container">
                <button
                    id="red-button"
                    onClick={() => checkAnswer('red')}
                    style={{ backgroundColor: 'red', color: 'white' }}>
                    Red
                </button>
                <button
                    id="green-button"
                    onClick={() => checkAnswer('green')}
                    style={{ backgroundColor: 'green', color: 'white' }}>
                    Green
                </button>
                <button
                    id="blue-button"
                    onClick={() => checkAnswer('blue')}
                    style={{ backgroundColor: 'blue', color: 'white' }}>
                    Blue
                </button>
            </div>
        </>
    );
};

export default ColorBox;

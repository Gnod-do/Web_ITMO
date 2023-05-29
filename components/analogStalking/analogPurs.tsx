class analogPurs {
    
}
const ball1 = document.getElementById("ball1") as HTMLInputElement;
const ball2 = document.getElementById("ball2") as HTMLInputElement;
const startButton = document.getElementById("startButton") as HTMLInputElement;
const scoreMy = document.getElementById("scoreMy") as HTMLInputElement;
const reaction = document.getElementById("reaction") as HTMLInputElement;
let lastDirectionChangeTime = 0;
let ball2Position = 0;
let ball1Position = 0;
let ball1Direction = "right";
let startTime = 0;
let testTime = 30000;
let reactionTime = 0;
export const startTest = () => {
    const progress = document.getElementById("progress") as HTMLInputElement;

    let value = 0 ;
    const intervalId = setInterval(() => {
        value++;
        progress.value = value.toString();

        if (value === 30) {
            clearInterval(intervalId);
        }
    }, 1000);
    startButton.style.display = "none";
    lastDirectionChangeTime = 0;
    startTime = new Date().getTime();
    const scores: number[] = [];
    const reactions: number[] = [];
    setInterval(() => {
        const rand = Math.random();
        if (rand > 0.5) {
            ball1Direction = ball1Direction === "right" ? "left" : "right";
            const elapsedTime = new Date().getTime() - startTime;
            const reactionTime = elapsedTime - lastDirectionChangeTime;
            reactions.push(reactionTime);
        }
    }, 2000);
    setTimeout(() => {
        clearInterval(ball1MoveInterval);
        clearInterval(ball1DirectionChangeInterval);
        clearInterval(checkCollisionInterval);
        startButton.style.display = "block";
        startButton.disabled = false;

        const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
        const avgReaction = (reactions.reduce((a, b) => a + b, 0) / reactions.length / 1000).toFixed(2);
        scoreMy.innerText = `Среднее значение совпадения с шариком: ${avgScore}%`;
        reaction.innerText = `Среднее значение скорости реакции на изменение движения шарика: ${avgReaction} с/шарик`;
        //sendForm
        // const avg: string,
        // const total: any,
        // const correct: any,
        // const misses: any,
        // const score: string
        const avg_time = document.getElementById("avg_time") as HTMLInputElement;
        if (avg_time) avg_time.value = avgReaction;
      
        const correct = document.getElementById("correct") as HTMLInputElement;
        if (correct) correct.value = avgScore;

        const score = document.getElementById("score") as HTMLInputElement;
        if (score) score.value = avgScore;
      
        const submitButtonInput = document.getElementById(
          "submitButton"
        ) as HTMLInputElement;
        if (submitButtonInput) submitButtonInput.click();
        //sendForm
    }, testTime);
    startButton.style.display = "none";
    const ball1MoveInterval = setInterval(() => {
        const container = document.getElementById("container") as HTMLInputElement
        if (ball1Direction === "right") {
            ball1Position += 10;
            if (ball1Position >= container.clientWidth - 50) {
                ball1Direction = "left";
            }
        } else {
            ball1Position -= 10;
            if (ball1Position <= 0) {
                ball1Direction = "right";
            }
        }
        ball1.style.left = ball1Position + "px";
    }, 50);

    const ball1DirectionChangeInterval = setInterval(() => {
        const rand = Math.random();
        if (rand > 0.5) {
            ball1Direction = ball1Direction === "right" ? "left" : "right";
            const elapsedTime = new Date().getTime() - startTime;
            const percentMatch = ((elapsedTime / testTime) * 100).toFixed(2);
            scores.push(Math.max(parseInt(percentMatch), 0));
            lastDirectionChangeTime = elapsedTime;
        }
    }, 2000);

    const checkCollisionInterval = setInterval(() => {
        const ball1Position = ball1?.offsetLeft;
        const ball2Position = ball2?.offsetLeft;
        if (ball1Position === ball2Position) {
            const elapsedTime = new Date().getTime() - startTime;
            const reactionTime = elapsedTime - lastDirectionChangeTime;
            const speed = (reactionTime / 1000).toFixed(2);
            const percentMatch = ((elapsedTime / testTime) * 100).toFixed(2);
            scoreMy.innerText = `Совпадение с шариком: ${Math.max(parseInt(percentMatch), 0)}%`;
            reaction.innerText = `Cкорость реакции на изменение движения шарика: ${speed} с/шарик`;
            lastDirectionChangeTime = elapsedTime;
        }


    }, 50);
};
export const moveBall2 = (direction: string) => {
    const containerWidth = ball2.parentElement?.clientWidth;
    const ball2Width = ball2?.clientWidth;
    let newBall2Position = ball2Position;

    if (direction === "right") {
        newBall2Position += 10;
        if (newBall2Position + ball2Width > (containerWidth ?? 0)  ) {
            newBall2Position = containerWidth !== undefined ? - ball2Width : 0;
        }
    } else if (direction === "left") {
        newBall2Position -= 10;
        if (newBall2Position < 0) {
            newBall2Position = 0;
        }
    }
    ball2Position = newBall2Position;
    ball2.style.left = ball2Position + "px";
};

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveBall2("left");
    } else if (event.key === "ArrowRight") {
        moveBall2("right");
    }
});
ball1.addEventListener("click", () => {
    ball1Direction = ball1Direction === "right" ? "left" : "right";
    reactionTime = new Date().getTime() - startTime;
});

startButton.addEventListener("click", startTest);
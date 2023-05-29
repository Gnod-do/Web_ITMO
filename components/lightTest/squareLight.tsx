
import SquareBase, { Result, getRandomInt } from "./squareBase";

class LightReaction extends SquareBase {
	public results: any;
	public attachTest: any;
	public setEndMessage: any;
	public listener: any;
	public reset: any;
	public colors: any;
	public amount: any;
	public step: any;
	public end: any;
	public checkCurrentSquare: any;
	public setLabel: any;
	public incorrect: any;
	public correct: any;
	public updateTime: any;
	public changeCurrentSquareColor: any;
	public baseColor: any;
	public num: any;
	public getAverageTime: any;
	public chooseResult: any;

	constructor(squares: NodeListOf<Element>, startButton: any, resultLabel: any, progressBar: HTMLElement | null, amount = 10) {
		super(squares, startButton, resultLabel, progressBar, amount)
		this.results = [
			new Result(0, 300, "У вас отличная простая реакция!"),
			new Result(300, 400, "У вас хорошая простая реакция!"),
			new Result(400, 600, "У вас удовлетворительная простая реакция!"),
			new Result(800, 10000, "У вас неудовлетворительная простая реакция!"),
		]
		
		this.attachTest(this.start.bind(this))
		this.setMessage(this.getMessage)
		this.setEndMessage(this.getEndMessage)
        this.listener = (event: { code: string; }) => {
			if (event.code !== "Space") {
				return;
			}
			this.clickHandler()
		}
	}

	start() {
		this.reset()

        const color = this.colors[getRandomInt(0, this.colors.length)]
		let time = 1000

		for (let i = 0; i < this.amount; i++) {
			time = time + getRandomInt(1000, 2000)
			this.step(color, time)
		}

		document.addEventListener("keydown", this.listener)
		this.end(time + 2000)
	}

	clickHandler() {
		if (!this.checkCurrentSquare()) {
            this.setLabel("Вы нажали слишком рано!")
            this.incorrect++
			return
		}
		this.correct++
		this.updateTime()
		this.changeCurrentSquareColor(this.baseColor)
	}

	getMessages() {
		return `Пройдено: ${this.num}/${this.amount}. Среднее время реакции: ${this.getAverageTime()} мс`
	}

	getEndMessage() {
		return `Поздравляем: ${this.chooseResult(this.results, this.getAverageTime())} (${this.getAverageTime()} мс)`
	}
}


export default LightReaction;

// function getRandomInt(arg0: number, length: any) {
// 	throw new Error("Function not implemented.");
// }

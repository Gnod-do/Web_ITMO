import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

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
    console.log((result1 * 100) / anser1.length + '%');
    const data = {
        labels: ['Nghề 1', 'Nghề 2', 'Nghề 3', 'Nghề khác'],
        datasets: [
            {
                label: '# of Votes',
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
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className={'result'}>
            we got 1: {(result1 * 100) / test.length + '%'}
            we got 2: {(result2 * 100) / test.length + '%'}
            we got 3: {(result3 * 100) / test.length + '%'}
            <Doughnut data={data} />
            <button onClick={() => setShow()}>quay về</button>
        </div>
    );
}

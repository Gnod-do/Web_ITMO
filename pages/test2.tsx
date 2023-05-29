import React from 'react';
// import MovingObjectComponent, {
//     Circle,
//     MovingObject,
// } from '../components/Test2';
import Canvas from '../components/Test2';

const test2 = () => {
    // const circle: Circle = {
    //     center: { x: 0, y: 0 },
    //     radius: 10,
    // };

    // const object: MovingObject = {
    //     circle,
    //     velocity: 0,
    //     acceleration: 2,
    //     time: 0,
    //     destination: { x: 20, y: 0 },
    // };
    return (
        <svg viewBox="-50 -50 100 100" width="500" height="500">
            <Canvas />
        </svg>
    );
};

export default test2;

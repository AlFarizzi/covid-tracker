import React from 'react';
import {Line} from 'react-chartjs-2';
import {data} from '../Cards/data';

function ChartGlobal(props) {
    return (
        <div className="mt-5">
            <Line data={data}/>
        </div>
    );
}

export default ChartGlobal
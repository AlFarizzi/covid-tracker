import React from 'react';
import Card from './Components/Cards/Cards';

function App(props) {
    return (

            <div>
                <img src="/covid-tracker/asset/img/logo.png" alt="corona logo" className="mt-3 mx-auto d-block" />
                <Card/>
            </div>
    );
}

export default App;
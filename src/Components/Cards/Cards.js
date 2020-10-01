import React, {useState, useEffect} from 'react';
import CountUp from 'react-countup';
import axios from 'axios';
import {Switch, Route, useHistory} from 'react-router-dom';
import ChartGlobal from '../Chart/ChartGlobal';
import ChartCountry from '../Chart/ChartCountry';

function Cards(props) {

    const [confirmed, setConfirmed] = useState('');
    const [recovered, setRecovered] = useState('');
    const [deaths, setDeaths] = useState('');
    const [countries, setCountries] = useState([]);
    const [option, setOption] = useState('');
    // const [dailyC, setDailyC] = useState([]);
    let history = useHistory();

    const getOld = () => {
        let old = sessionStorage.getItem('country');
        if (old === null) {
            old = "global"
            setOption(old);
        } else {
            setOption(old);
        }
    }

    const getData = async () => {
        try {
            let data = await axios('https://covid19.mathdro.id/api');
            setConfirmed(data.data.confirmed.value);
            setRecovered(data.data.recovered.value);
            setDeaths(data.data.deaths.value);
            console.log(data.data.recovered.value);
        } catch (error) {
            throw error.message;
        }
    }

    const getCountry = async () => {
        try {
            let data = await axios('https://covid19.mathdro.id/api/countries');
            setCountries(data.data.countries);
        } catch (error) {
            throw error.message;
        }
    }

    const changeHandler = (e) => {
        let old = sessionStorage.setItem('country', e.target.value);
        setOption(old)
        console.log('bisa');
        if (e.target.value === "global") {
            history.replace('/covid-tracker');
            history.go('/covid-tracker');
        } else {
            let a = e.target.value;
            axios
                .get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
                .then(data => {
                    setConfirmed(data.data.confirmed.value);
                    setRecovered(data.data.recovered.value);
                    setDeaths(data.data.deaths.value);
                    history.push(`/${a}`)
                })
        }
    }

    useEffect(() => {
        getData();
        getCountry();
        getOld();
    }, [])

    return (
        <div className="container mx-auto d-block mt-5">
            <div className="row">
                {/* <NavLink to="/c/asd">asd</NavLink> */}
                <div className="mt-2 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="card bg-danger img-card box-primary-shadow">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="text-white">
                                    <p className="text-white mb-0">Total Positif</p>
                                    <h2 className="mb-0 number-font"><CountUp end={confirmed}/></h2>
                                    <p className="text-white mb-0">Orang</p>
                                </div>
                                <div className="ml-auto">
                                    <img src="/covid-tracker/asset/img/sad.png" alt="Positif" width="50" height="50"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-2 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="card bg-success img-card box-secondary-shadow">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="text-white">
                                    <p className="text-white mb-0">Total Sembuh</p>
                                    <h2 className="mb-0 number-font"><CountUp end={recovered}/></h2>
                                    <p className="text-white mb-0">Orang</p>
                                </div>
                                <div className="ml-auto">
                                    <img src="/covid-tracker/asset/img/happy.png" alt="Sembuh" width="50" height="50"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-2 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="card bg-secondary img-card box-success-shadow">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="text-white">
                                    <p className="text-white mb-0">Total Meninggal</p>
                                    <h2 className="mb-0 number-font"><CountUp end={deaths}/></h2>
                                    <p className="text-white mb-0">Orang</p>
                                </div>
                                <div className="ml-auto">
                                    <img src="/covid-tracker/asset/img/dead.png" alt="Meninggal" width="50" height="50"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-group mt-2">
                <select className="form-control" onChange={changeHandler} value={option}>
                    <option value="global">Global</option>
                    {
                        countries.map((ct, index) => {
                            return (<option value={ct.iso3} key={index}>{ct.name}</option>)
                        })
                    }
                </select>
            </div>

            <Switch>
                <Route exact="exact" path="/covid-tracker">
                    <ChartGlobal/>
                </Route>
                <Route path="/:iso">
                    <ChartCountry/>
                </Route>
            </Switch>

        </div>
    );
}

export default Cards;
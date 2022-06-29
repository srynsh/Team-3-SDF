import "./Graphs.css";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'


// let data = [];
// for(let num = 30; num >= 0; num--){
//     data.push(
//         {
//             date: subDays(new Date(), num).toISOString().substr(0,10),
//             cases: 5 + Math.floor(Math.random()*3),
//             cumulative_cases: 0
//         }
//     )
// }

// for (let num = 0; num <= 30; num++){
//     const datef = parseISO(data[num].date)
//        data[num].date = format(datef, "MMM d");
      
// }

export function NormCasesGraph() {
  const [cases, setCases] = useState([]);
  useEffect(() => {
    getCases();
  }, []
  );

  const getCases = async () => {
    const response = await axios.get('http://192.168.51.73:5002/CovidData/Daily');
    setCases(response.data);
  }
  

    return (
      <AreaChart
        width={700}
        height={200}
        data={cases}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="dateToday"/>
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="newCases" stroke="#327d2d" fill="#45b03e" />
      </AreaChart>
    );
  }
  

export function CumCasesGraph() {
  const [cumcases, setCumCases] = useState();
  useEffect(() => {
    getCumCases();
  }, []
  );
  const getCumCases = async () => {
    const response = await axios.get('http://192.168.51.73:5002/CovidData/Cummilative');
    setCumCases(response.data);
}

    return (
      <AreaChart
        width={700}
        height={200}
        data={cumcases}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date"/>
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="newCases" stroke="#a89f52" fill="#decc2f" />
      </AreaChart>
    );
  }

export class CasesGraphs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : 1
        }
    }

    render(){
        if(this.state.value === 1){
        return(
            <div className="module">
            <div className="buttons1">
        <button onClick={() => this.setState({value : 1})} className="btn btn-success">Daily Cases</button>
        <button onClick={() => this.setState({value : 2})} className="btn btn-warning">Cumulative Cases</button>
            </div>
            <div className="NormCasesGraph">
                <NormCasesGraph/>
            </div>
            </div>
        );
        }

        else{
            return(
                <div className="module">
                <div className="buttons1">
            <button onClick={() => this.setState({value : 1})} className="btn btn-success">Daily Cases</button>
            <button onClick={() => this.setState({value : 2})} className="btn btn-warning">Cumulative Cases</button>
                </div>
                <div className="CumCasesGraph">
                    <CumCasesGraph/>
                </div>
                </div>
            );
        }
    }
}

export function NormRecoveredGraph() {
  const [recovered, setRecovered] = useState([]);
  useEffect(() => {
    getRecovered();
  }, []
  );

  const getRecovered = async () => {
    const response = await axios.get('http://192.168.51.73:5002/CovidData/Daily');
    setRecovered(response.data);
  }
  

    return (
      <AreaChart
        width={700}
        height={200}
        data={recovered}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="dateToday"/>
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="newRecovered" stroke="#050e80" fill="#121fcc" />
      </AreaChart>
    );
  }
  
export function CumRecoveredGraph() {
    const [cumrecovered, setCumRecovered] = useState();
    useEffect(() => {
      getCumRecovered();
    }, []
    );
    const getCumRecovered = async () => {
      const response = await axios.get('http://192.168.51.73:5002/CovidData/Cummilative');
      setCumRecovered(response.data);
  }
  
      return (
        <AreaChart
          width={700}
          height={200}
          data={cumrecovered}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 10
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="date"/>
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="newRecovered" stroke="#121fcc" fill="#1ecfeb" />
        </AreaChart>
      );
}


export class RecoveredGraphs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : 1
        }
    }

    render(){
        if(this.state.value === 1){
        return(
            <div className="module">
            <div className="buttons2">
        <button onClick={() => this.setState({value : 1})} className="btn btn-primary">Daily Recovered</button>
        <button onClick={() => this.setState({value : 2})} className="btn btn-info">Cumulative Recovered</button>
            </div>
            <div className="NormRecoveredGraph">
                <NormRecoveredGraph/>
            </div>
            </div>
        );
        }

        else{
            return(
                <div className="module">
                <div className="buttons2">
            <button onClick={() => this.setState({value : 1})} className="btn btn-primary">Daily Recovered</button>
            <button onClick={() => this.setState({value : 2})} className="btn btn-info">Cumulative Recovered</button>
                </div>
                <div className="CumRecoveredGraph">
                    <CumRecoveredGraph/>
                </div>
                </div>
            );
        }
    }
}

export function NormDeathsGraph() {
  const [deaths, setDeaths] = useState([]);
  useEffect(() => {
    getDeaths();
  }, []
  );

  const getDeaths = async () => {
    const response = await axios.get('http://192.168.51.73:5002/CovidData/Daily');
    setDeaths(response.data);
  }
  

    return (
      <AreaChart
        width={700}
        height={200}
        data={deaths}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="dateToday"/>
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="newDeaths" stroke="#801d14" fill="#c21d0e" />
      </AreaChart>
    );
  }

  export function CumDeathsGraph() {
    const [cumdeaths, setCumDeaths] = useState();
    useEffect(() => {
      getCumDeaths();
    }, []
    );
    const getCumDeaths = async () => {
      const response = await axios.get('http://192.168.51.73:5002/CovidData/Cummilative');
      setCumDeaths(response.data);
  }
  
      return (
        <AreaChart
          width={700}
          height={200}
          data={cumdeaths}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 10
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="date"/>
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="newDeaths" stroke="#c21d0e" fill="#f27d72" />
        </AreaChart>
      );
}

export class DeathGraphs extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          value : 1
      }
  }

  render(){
      if(this.state.value === 1){
      return(
          <div className="module">
          <div className="buttons2">
      <button onClick={() => this.setState({value : 1})} className="btn btn-danger">Daily Deaths</button>
      <button onClick={() => this.setState({value : 2})} className="btn btn-secondary">Cumulative Deaths</button>
          </div>
          <div className="NormDeathsGraph">
              <NormDeathsGraph/>
          </div>
          </div>
      );
      }

      else{
          return(
              <div className="module">
              <div className="buttons2">
          <button onClick={() => this.setState({value : 1})} className="btn btn-danger">Daily Deaths</button>
          <button onClick={() => this.setState({value : 2})} className="btn btn-secondary">Cumulative Deaths</button>
              </div>
              <div className="CumDeathsGraph">
                  <CumDeathsGraph/>
              </div>
              </div>
          );
      }
  }
}

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
import 'bootstrap/dist/css/bootstrap.css'

let data = [];
for(let num = 30; num >= 0; num--){
    data.push(
        {
            date: subDays(new Date(), num).toISOString().substr(0,10),
            cases: 5 + Math.floor(Math.random()*3),
            cumulative_cases: 0
        }
    )
}

for (let num = 0; num <= 30; num++){
    const datef = parseISO(data[num].date)
       data[num].date = format(datef, "MMM d");
      
}

export function NormGraph() {
    return (
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"/>
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="cases" stroke="#327d2d" fill="#45b03e" />
      </AreaChart>
    );
  }
  
for (let num = 0; num <= 30; num++){
    
    if(num === 0) {data[num].cumulative_cases = data[num].cases;}
    else {data[num].cumulative_cases  = data[num].cases + data[num-1].cumulative_cases;}
}


export function CumGraph() {
    return (
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"/>
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="cumulative_cases" stroke="#a89f52" fill="#decc2f" />
      </AreaChart>
    );
  }

export default class Graphs extends React.Component {
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
            <div className="buttons">
        <button onClick={() => this.setState({value : 1})} className="btn btn-success">Daily Cases</button>
        <button onClick={() => this.setState({value : 2})} className="btn btn-warning">Cumulative Cases</button>
            </div>
            <div className="NormGraph">
                <NormGraph/>
            </div>
            </div>
        );
        }

        else{
            return(
                <div className="module">
                <div className="buttons">
            <button onClick={() => this.setState({value : 1})} className="btn btn-success">Daily Cases</button>
            <button onClick={() => this.setState({value : 2})} className="btn btn-warning">Cumulative Cases</button>
                </div>
                <div className="CumGraph">
                    <CumGraph/>
                </div>
                </div>
            );
        }
    }

}
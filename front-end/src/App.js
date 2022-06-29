import React from 'react';
import './App.css';
import { CasesGraphs, RecoveredGraphs, DeathGraphs } from  './components/Graphs.jsx';

export default class App extends React.Component {
    render(){
      return (
        <>
          <CasesGraphs/>
          <RecoveredGraphs/>
          <DeathGraphs/>
        </>
      );
    }
  }

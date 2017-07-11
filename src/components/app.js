import React, { Component } from 'react';
import axios from 'axios';
import CamperListItem from './camper_list_item.js';
export default class App extends Component {
  constructor (props){
    super(props);
    this.state ={
      recentCampers:[],
      allTimeCampers:[],
      currentView: 'recentCampers'
    };
  }
  componentWillMount(){
    axios.all([this.fetchRecentCampers(),this.fetchAllTimeCampers()])
      .then(axios.spread((recentCampers,allTimeCampers)=>{
        this.setState({
          recentCampers: recentCampers.data,
          allTimeCampers: allTimeCampers.data
        });

      }));
  }
  fetchRecentCampers(){
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }
  fetchAllTimeCampers(){
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
  }
changeView(currentView){
  this.setState({
    currentView
  })
}
arrow(current){
  if(current==this.state.currentView){
    return(<span className='inline'>↑</span>);

  }
  else{
    return (<div ></div>)
  }
}
camperList=()=>{
  const Items= this.state[this.state.currentView].map((camper,index)=>{
    return<CamperListItem key={index} camper={camper} number={index+1} />;
  })
    return(
      <div>
  <table className='table table-striped'>
  <thead>
  <tr>
  <th>#</th>
  <th>username</th>
  <th>img</th>
  <th><a onClick={()=>this.changeView('recentCampers')} > last 30 Days {this.arrow('recentCampers')} </a></th>
  <th>  <a onClick={()=>this.changeView('allTimeCampers')} > All time Points {this.arrow('allTimeCampers')} </a>
 </th>
   <th>Total Points</th>
  </tr>
  </thead>
  <tbody>
  </tbody>
  {Items}
  </table>

      </div>
    );
}
  render() {
    return (
      <div>
      <h2>{`Veiwing Top ${this.state.currentView}`}</h2>



        {this.camperList()}
      </div>

    );
  }
}

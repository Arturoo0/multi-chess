import React from 'react';
import './CSS/Home.css';
import { JoinCard, CreateCard } from '../components';

const Home = () => {
  return (
    <div id='home-root-container'>
      <i class="fas fa-chess" style={{color : 'white', fontSize : '10rem', marginBottom : '20px'}}></i>
      <div className='home-choice-card'>
        <JoinCard />
      </div>
      <div className='home-choice-card'>
        <CreateCard />
      </div>
    </div>
  );
}

export default Home;
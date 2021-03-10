import React from 'react';
import './CSS/Home.css';
import { JoinCard } from '../components';

const Home = () => {
  return (
    <div id='home-root-container'>
      <div className='home-choice-card'>
        <JoinCard />
      </div>
      <div className='home-choice-card'>
        <JoinCard />
      </div>
    </div>
  );
}

export default Home;
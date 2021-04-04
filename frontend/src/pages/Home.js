import React from 'react';
import './CSS/Home.css';
import { JoinCard, CreateCard } from '../components';

const Home = () => {
  return (
    <div id='home-root-container'>
      <div className='home-choice-card'>
        <CreateCard />
      </div>
      <div className='home-choice-card'>
        <JoinCard />
      </div>
    </div>
  );
}

export default Home;
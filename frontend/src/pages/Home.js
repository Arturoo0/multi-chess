import React from 'react';
import './CSS/Home.css';

const Home = () => {
  return (
    <div id='home-root-container'>
      <div className='home-choice-card'>
        <p>Create Match</p>
      </div>
      <div className='home-choice-card'>
        <p>Join Match</p>
      </div>
    </div>
  );
}

export default Home;
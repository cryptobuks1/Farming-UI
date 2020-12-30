import React from 'react';
import './HomePage.scss';

export const HomePage = () => {
  const value = '0.00000000';
  return (
    <>
      <div className='cardContainer'>
        <div className='card card1'>
          <div className='cardSubContainer'>
            <div className='value'>{value}</div>
            <div className='valueName'>Sushi status</div>
            <div className='btnContainer'>
              <button className='btn card1Btn'>Harvest</button>
            </div>
          </div>
        </div>
        <div className='card card2'>
          <div className='cardSubContainer'>
            <div className='value'>{value}</div>
            <div className='valueName'>Sushi status</div>
            <div className='btnContainer'>
              <button className='btn card2Btn'>Approve SUSHI-ETH SLP</button>
            </div>
          </div>
        </div>
      </div>
      <div className='footNoteContainer'>
        <div className='footNote'>Get VNTW LP token on Uniswap</div>
      </div>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import './HomePage.scss';
import swal from 'sweetalert';
import { Card, InputNumber, Button } from 'antd';
import Telegram from '../../Images/telegram.png';
import Annoncement from '../../Images/telegram.png';
import Facebook from '../../Images/facebook.png';
import Linkedin from '../../Images/linkedin.png';
import Twitter from '../../Images/twitter.png';
import Medium from '../../Images/medium.png';
import WriteUs from '../../Images/writeUs.png';
import Uniswap from '../../Images/uniswap.png';

export const HomePage = ({
  deposit,
  harvest,
  unstake,
  getpendingrewards,
  farmcontractinfo,
  loading,
  account,
  farmcontract,
}) => {
  const value = '0.00000000';

  // console.log(intervalId);
  const [inputval, setinputval] = useState(10);
  const onchangeinputval = (e) => {
    setinputval(e.target.value);
  };

  const onsubmitapprove = () => {
    // window.alert(inputval);

    if (inputval <= 0) {
      swal('input some value');
    } else {
      deposit(inputval);
    }
  };

  const [inputvalunstake, setinputvalunstake] = useState(1);
  const onchangeinputvalunstake = (e) => {
    setinputvalunstake(e.target.value);
  };

  const onsubmitunstake = () => {
    // window.alert(inputvalunstake);

    if (inputvalunstake <= 0) {
      swal('input some value');
    } else {
      unstake(inputvalunstake);
    }
  };

  return (
    <div className='allContainer'>
      <div className='cardContainer'>
        <div className='card card1'>
          <div className='cardSubContainer'>
            <div className='value'>{farmcontractinfo.farmpendingrewards}</div>
            <div className='valueName'>Pending Rewards</div>
            <div className='btnContainer'>
              <button className='btn card1Btn' onClick={harvest}>
                Harvest
              </button>
              <br></br>
              <button className='btn card1Btn' onClick={onsubmitunstake}>
                Unstake
              </button>
            </div>
            <input
              type='number'
              min='1'
              value={inputvalunstake}
              onChange={onchangeinputvalunstake}
              className='inputBox'
            />
            {/* <div> userinfoamount: {farmcontractinfo.farmuserinfoamount}</div>

            <div>
              {" "}
              userinforewarddebt:{farmcontractinfo.farmuserinforewarddebt}
            </div>

            <div>pendingrewards :{farmcontractinfo.farmpendingrewards}</div> */}
          </div>
        </div>
        <div className='card card2'>
          <div className='cardSubContainer'>
            <div className='value'>{farmcontractinfo.farmuserinfoamount} </div>
            <div className='valueName'>LP depsoited</div>
            <div className='btnContainer'>
              <button className='btn card2Btn' onClick={onsubmitapprove}>
                Deposit ETH_VNTW SLP
              </button>
            </div>

            <input
              type='number'
              min='1'
              value={inputval}
              onChange={onchangeinputval}
              className='inputBox'
            />
          </div>
        </div>
      </div>
      <div className='footNoteContainer'>
        <div className='footNote'>
          <a
            target='_blank'
            href='https://app.uniswap.org/#/add/ETH/0xd0f05D3D4e4d1243Ac826d8c6171180c58eaa9BC'
          >
            {' '}
            Get VNTW LP token on Uniswap
          </a>
        </div>
        <div className='uniswapContainer'>
          <a href='https://app.uniswap.org/#/add/ETH/0xd0f05D3D4e4d1243Ac826d8c6171180c58eaa9BC'>
            {' '}
            <button className='uniswapBtn'>
              <div>
                <img src={Uniswap} alt='uniswap' height='25px' />
              </div>
              <div className='uniswapName'>
                <div>Uniswap</div>
              </div>
            </button>
          </a>
        </div>
      </div>
      <footer className='footer'>
        <div>
          <button className='socialMediaBtn'>
            <div className='socialMediaImg'>
              <img src={Telegram} alt='telegram' height='35px' />
            </div>
            <div className='socialMediaName'>
              <a href='https://t.me/valuenetworkchat'>COMMUNITY</a>{' '}
            </div>
          </button>
        </div>
        <div>
          <button className='socialMediaBtn'>
            <div className='socialMediaImg'>
              <img src={Telegram} alt='telegram' height='35px' />
            </div>
            <div className='socialMediaName'>
              <a href='https://t.me/valuenetworklive'>ANNOUNCEMENT</a>{' '}
            </div>
          </button>
        </div>
        <div>
          <button className='socialMediaBtn'>
            <div className='socialMediaImg'>
              <img src={Facebook} alt='telegram' height='35px' />
            </div>
            <div className='socialMediaName'>
              <a href='https://www.facebook.com/valuenetworklive/'> FACEBOOK</a>
            </div>
          </button>
        </div>
        <div>
          <button className='socialMediaBtn'>
            <div className='socialMediaImg'>
              <img src={Linkedin} alt='telegram' height='35px' />
            </div>
            <div className='socialMediaName'>
              <a href='https://www.linkedin.com/company/valuenetworklive'>
                {' '}
                LINKEDIN
              </a>
            </div>
          </button>
        </div>
        <div>
          <button className='socialMediaBtn'>
            <div className='socialMediaImg'>
              <img src={Twitter} alt='telegram' height='35px' />
            </div>
            <div className='socialMediaName'>
              <a href='https://twitter.com/vntwdefi'>TWITTER</a>
            </div>
          </button>
        </div>
        <div>
          <button className='socialMediaBtn'>
            <div className='socialMediaImg'>
              <img src={Medium} alt='telegram' height='35px' />
            </div>
            <div className='socialMediaName'>
              <a href='https://valuenetworklive.medium.com/'> MEDIUM</a>
            </div>
          </button>
        </div>
        <div>
          <button className='socialMediaBtn writeToUs'>
            <div className='socialMediaImg'>
              <img src={WriteUs} alt='telegram' height='35px' />
            </div>
            <div className='socialMediaName'>WRITE US SOMETHING</div>
          </button>
        </div>
      </footer>
      <footer className='footer2'>
        <div>Copyright &copy; 2020 Value Network</div>
      </footer>
    </div>
  );
};

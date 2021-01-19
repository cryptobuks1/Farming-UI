import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import swal from "sweetalert";
import { Card, InputNumber, Button } from "antd";

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
  const value = "0.00000000";

  // console.log(intervalId);
  const [inputval, setinputval] = useState(10);
  const onchangeinputval = (e) => {
    setinputval(e);
  };

  const onsubmitapprove = () => {
    // window.alert(inputval);

    if (inputval <= 0) {
      swal("input some value");
    } else {
      deposit(inputval);
    }
  };

  const [inputvalunstake, setinputvalunstake] = useState(1);
  const onchangeinputvalunstake = (e) => {
    setinputvalunstake(e);
  };

  const onsubmitunstake = () => {
    // window.alert(inputvalunstake);

    if (inputvalunstake <= 0) {
      swal("input some value");
    } else {
      unstake(inputvalunstake);
    }
  };

  return (
    <>
      <div className="cardContainer">
        <div className="card card1">
          <div className="cardSubContainer">
            <div className="value">{farmcontractinfo.farmpendingrewards}</div>
            <div className="valueName">Pending Rewards</div>
            <div className="btnContainer">
              <button className="btn card1Btn" onClick={harvest}>
                Harvest
              </button>
              <br></br>
              <button className="btn card1Btn" onClick={onsubmitunstake}>
                unstake
              </button>
            </div>
            <InputNumber
              min={1}
              value={inputvalunstake}
              onChange={onchangeinputvalunstake}
              className="inputBox"
            />
            {/* <div> userinfoamount: {farmcontractinfo.farmuserinfoamount}</div>

            <div>
              {" "}
              userinforewarddebt:{farmcontractinfo.farmuserinforewarddebt}
            </div>

            <div>pendingrewards :{farmcontractinfo.farmpendingrewards}</div> */}
          </div>
        </div>
        <div className="card card2">
          <div className="cardSubContainer">
            <div className="value">{farmcontractinfo.farmuserinfoamount} </div>
            <div className="valueName">LP depsoited</div>
            <div className="btnContainer">
              <button className="btn card2Btn" onClick={onsubmitapprove}>
                deposit ETH_VNTW SLP
              </button>
            </div>

            <InputNumber
              min={1}
              value={inputval}
              onChange={onchangeinputval}
              className="inputBox"
            />
          </div>
        </div>
      </div>
      <div className="footNoteContainer">
        <div className="footNote">
          <a
            target="_blank"
            href="https://app.uniswap.org/#/add/ETH/0xd0f05D3D4e4d1243Ac826d8c6171180c58eaa9BC"
          >
            {" "}
            Get VNTW LP token on Uniswap
          </a>
        </div>
      </div>
    </>
  );
};

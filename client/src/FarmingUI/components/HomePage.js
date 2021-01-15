import React, { useState } from "react";
import "./HomePage.scss";
import swal from "sweetalert";
import { Card, InputNumber, Button } from "antd";

export const HomePage = ({
  deposit,
  harvest,
  unstake,
  getpendingrewards,
  farmcontractinfo,
}) => {
  const value = "0.00000000";

  // console.log(intervalId);
  const [inputval, setinputval] = useState(100);
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
    window.alert(inputvalunstake);

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
            <div className="valueName">Sushi status</div>
            <div className="btnContainer">
              <button className="btn card1Btn" onClick={harvest}>
                Harvest
              </button>
              <br></br>
              <button className="btn card1Btn" onClick={onsubmitunstake}>
                unstake
              </button>
              <InputNumber
                min={1}
                value={inputvalunstake}
                onChange={onchangeinputvalunstake}
                className="inputBox"
              />
            </div>
            <div> userinfoamount: {farmcontractinfo.farmuserinfoamount}</div>

            <div>
              {" "}
              userinforewarddebt:{farmcontractinfo.farmuserinforewarddebt}
            </div>

            <div>pendingrewards :{farmcontractinfo.farmpendingrewards}</div>
          </div>
        </div>
        <div className="card card2">
          <div className="cardSubContainer">
            <div className="value">{farmcontractinfo.farmuserinfoamount} </div>
            <div className="valueName">Sushi status</div>
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
        <div className="footNote">Get VNTW LP token on Uniswap</div>
      </div>
    </>
  );
};

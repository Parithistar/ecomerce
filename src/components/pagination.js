import React, { useState, useEffect } from "react";
const Pagination = ({showPerPage ,total , onPaginationChange}) => {
    const [counter, setCounter] = useState(1);
    const numberOfButtons= Math.ceil(total / showPerPage)
  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, );
  const pagenumber =[]
  for(let i=1;i<=numberOfButtons;i++){
    pagenumber.push(i)
  }
  const onButtonClick = (type) => {
        if (type === "prev") {
          if (counter === 1) {
            setCounter(1);
          } else {
            setCounter(counter - 1);
          }
        } else if (type === "next") {
          if (numberOfButtons === counter) {
            setCounter(counter);
          } else {
            setCounter(counter + 1);
          }
        }
      };
    return (
        <div className='pagebody'>
            <div onClick={() => onButtonClick("prev")}><svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.65349 13.3066L8.21704 11.7431L3.13828 6.65324L8.21704 1.56339L6.65349 -0.000160066L9.11406e-05 6.65324L6.65349 13.3066Z" fill="#4D4D4D" />
            </svg>
            </div>
             {
                pagenumber.map((page,idx)=>{
                    return (
                        <span key={idx} className={counter===idx+1 ? "blue" : "grey"}>{page}</span>
                    )
                })
             }
            <div  onClick={() => onButtonClick("next")}>
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.56379 0L0.000244141 1.56355L5.07901 6.6534L0.000244141 11.7433L1.56379 13.3068L8.21719 6.6534L1.56379 0Z" fill="#4D4D4D" />
                </svg>
            </div>
        </div>
    )
}

export default Pagination
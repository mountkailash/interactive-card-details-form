import React, { useState } from "react";
import complete from "../images/icon-complete.svg";
import './card.css';



export default function Card () {
    const [isActive, setIsActive] = useState(false);
    const [cardHolder, setCardHolder] = useState("");
    const [cardError, setCardError] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardNumberError, setCardNumberError] = useState('')
    const [cardMonth, setCardMonth] = useState("");
    const [cardMonthError, setCardMonthError] = useState('');
    const [cardYear, setCardYear] = useState("");
    const [cardYearError, setCardYearError] = useState('');
    const [cardCvc, setCardCvc] = useState("");
    const [cardCvcError, setCardCvcError] = useState('');
    
    const [cardSuccess, setCardSuccess] = useState("");
    const [activeInput, setActiveInput] = useState("");
    const [confirmed, setConfirmed] = useState("");
    const [formVisible, setFormVisible] = useState(true);

    const handleCardholderChange = (e) => {
        const value = e.target.value;
        setCardHolder(value);
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          setCardError("Text only");
        } else {
          setCardError("");
        }
      };

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);
        if (!/^[0-9]+$/.test(e.target.value)) {
          setCardNumberError("Wrong format, numbers only");
        } else {
          setCardNumberError("");
        }
      };

    const handleCardMonthChange = (e) => {
        const value = e.target.value;
        setCardMonth(value);
        if (!/^\d*$/.test(e.target.value)) {
          setCardMonthError("Can't be blank");
        } else if (value > 12) {
          setCardMonthError("Numbers from 1 to 12")
        } 
        else {
          setCardMonthError("");
        }
      };

    const handleCardYearChange = (e) => {
        const value = e.target.value;
        setCardYear(value);
        if (!/^\d*$/.test(e.target.value)) {
          setCardYearError("Can't be blank");
        } else {
          setCardYearError("");
        }
      };
      
    const handleCardCvcChange = (e) => {
        const value = e.target.value;
        setCardCvc(value);
        if (!/^\d*$/.test(e.target.value)) {
          setCardCvcError("Can't be blank");
        } else {
          setCardCvcError("");
        }
      };

    const handleFocus = (inputName) => {
        setIsActive(true);
        setActiveInput(inputName);
    }

    const handleBlur = (inputName) => {
        if (!cardError) {
            setIsActive(false);
            setActiveInput("");
          }
    }
    
    const getInputClassName = (inputName) => {
      if (activeInput === inputName) {
        return cardError ? 'active-input error' : 'active-input';
      } else {
        return cardError && activeInput !== inputName ? 'default-input error' : 'default-input';
      }
    };

    const handleConfirm = () => {
        if (
          cardHolder &&
          cardNumber &&
          cardMonth &&
          cardYear &&
          cardCvc
        ) {
          setCardSuccess(true);
          setConfirmed(true);
        } else {
          setCardSuccess(false);
          setCardError("All fields are required");
        }
        
      };

      const handleContinue = () => {
    // Reset form state and proceed to the next step
    setCardHolder('');
    setCardError('');
    setCardNumber('');
    setCardNumberError('')
    setCardMonth('');
    setCardMonthError('');
    setCardYear('');
    setCardYearError('');
    setCardCvc('');
    setCardCvcError('');
    setCardSuccess(false);
    setConfirmed(false);
    setFormVisible(true);
  };

      if (confirmed) {
          return (
              <div className="card-wrapper">
              <div className="card-1">
                <div className="card-front">
                    <div className="logo-container">
                    <div className="circle-logo"></div>
                    <div className="circle-small"></div>
                    <div className="num-container">
                        <p>{cardNumber  &&
                            cardNumber
                              .match(/.{1,4}/g)
                              .join(" ")
                              .trim()}
                        </p>
                    </div>
                    <div className="name-container">
                        <p className="name">{cardHolder || "JANE APPLESEED"}</p>
                        <p className="date">{`${cardMonth || "00"}/${cardYear || "00"}`}</p>
                    </div>
                    </div>
                </div>
                <div className="card-back">
                    <p className="cvv">{cardCvc || "000"}</p>
                </div>
                </div>
                
              <div className="thankyou-container">  
              <img src={complete} alt="complete-logo" className="icon-complete"/>
              <h3>Thank you!</h3>
              <p>we've added your card details</p>
              <button onClick={handleContinue} className="continue">Continue</button>
              </div>
              </div>
    );
  }


    return (
        <div className="card-wrapper">
            <div className="card-1">
                <div className="card-front">
                    <div className="logo-container">
                    <div className="circle-logo"></div>
                    <div className="circle-small"></div>
                    <div className="num-container">
                        <p>{cardNumber  &&
                            cardNumber
                              .match(/.{1,4}/g)
                              .join(" ")
                              .trim()}
                        </p>
                    </div>
                    <div className="name-container">
                        <p className="name">{cardHolder || "JANE APPLESEED"}</p>
                        <p className="date">{`${cardMonth || "00"}/${cardYear || "00"}`}</p>
                    </div>
                    </div>
                </div>
                <div className="card-back">
                    <p className="cvv">{cardCvc || "000"}</p>
                </div>
                
            </div>
            <div className="input-wrapper">
                    <div className="input-container">
                        <label>CARDHOLDER NAME<br></br>
                        <input 
                        type="text" 
                        placeholder="e.g Jane Appleseed" 
                        className= {`holder-name ${getInputClassName('holder-name')}`}
                        style={{border: cardError ? '2px solid hsl(0, 100%, 66%)' : ""}}
                        onFocus={ () => handleFocus('holder-name')}
                        onBlur={() => handleBlur('holder-name')}
                        onChange={handleCardholderChange}
                        />
                       { cardError && <div className="error-message">{cardError}</div> }
                        </label>
                        <br></br>

                        <label className="card">CARD NUMBER<br></br>
                        <input 
                        type="text" 
                        placeholder="e.g 1234 5678 9123 0000" 
                        className={`card-number ${getInputClassName('card-number')}`}
                        style={{border: cardNumberError ? '2px solid hsl(0, 100%, 66%)' : ""}}
                        onFocus={ () => handleFocus('card-number')}
                        onBlur={() => handleBlur('card-number')}    
                        onChange={handleCardNumberChange}                    
                        />
                        {cardNumberError && <div className="error-message">{cardNumberError}</div>}
                        </label>
                        <br></br>

                        <div className="month-container">
                          
                        <label id="exp">EXP. DATE   <br></br>
                        <input 
                        type="text" 
                        placeholder="MM" 
                        className= {`month ${getInputClassName('month')}`}
                        style={{border: cardMonthError ? '2px solid hsl(0, 100%, 66%)' : ""}}
                        onFocus={ () => handleFocus('month')}
                        onBlur={() => handleBlur('month')}
                        onChange={handleCardMonthChange}
                        />
                        {cardMonthError && <div className="error-message">{cardMonthError}</div>}
                        </label>
                        

                        <label id="mm">  (MM/YY)<br></br>
                        <input 
                        type="text" 
                        placeholder="YY"  
                        className={`year ${getInputClassName('year')}`}
                        style={{border: cardYearError ? '2px solid hsl(0, 100%, 66%)' : ""}}
                        onFocus={ () => handleFocus('year')}                       
                        onBlur={() => handleBlur('year')}
                        onChange={handleCardYearChange}
                        />
                        {cardYearError && <div className="error-message">{cardYearError}</div>}
                        </label>

                        <label id="cvv">CVC<br></br>
                        <input 
                        type="text" 
                        placeholder="e.g 123" 
                        className={`cvc ${getInputClassName('cvc')}`}
                        style={{border: cardCvcError ? '2px solid hsl(0, 100%, 66%)' : ""}}
                        onFocus={ () => handleFocus('cvc')}                       
                        onBlur={() => handleBlur('cvc')}
                        onChange={handleCardCvcChange}
                        />
                        {cardCvcError && <div className="error-message">{cardCvcError}</div>}
                        </label>
                        </div>
                        <div>
                          
                        {cardSuccess && <p>Thank you, we've added your card details.</p>}
                        <button type="submit" className="btn-confirm" onClick={handleConfirm}>Confirm</button>
                        
                        
                        </div>
                    </div>
                </div>
        </div>
    )
}
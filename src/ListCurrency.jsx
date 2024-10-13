import React, { useState, useEffect } from 'react';
import './ListCurrency.css'; // Import the CSS file

function ListCurrency({ currency }) {
  const [value, setValue] = useState(0); // for taking text field value
  const [From, setFromCurrency] = useState('USD');
  const [To, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState(null);
  const [showAmount, setShowAmount] = useState(false);

  const fromCurrency = (event) => {
    setFromCurrency(event.target.value);
  };

  const toCurrency = (event) => {
    setToCurrency(event.target.value);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const swapCurrency = () => {
    const temp = From;
    setFromCurrency(To);
    setToCurrency(temp);
  };

  useEffect(() => {
    const currencyRates = async () => {
      const res = await fetch(`https://api.frankfurter.app/latest?from=${From}&to=${To}&amount=${value}`);
      const data = await res.json();
      setAmount(data.rates[To]);
      setShowAmount(false);
    };
    currencyRates();
  }, [From, To, value]);

  return (
    <div className="container">
      <div className="dropdown-container">
        <div>
          <div>From:</div>
          <select className="dropdown" value={From} onChange={fromCurrency}>
            {Object.keys(currency).map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>

        <div>
          <div>To:</div>
          <select className="dropdown" value={To} onChange={toCurrency}>
            {Object.keys(currency).map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="button-container">
        <button className="button" onClick={swapCurrency}>Swap</button>
      </div>

      <div className="input-container">
        <div>Amount:</div>
        <input
          type="number"
          className="input-field"
          value={value}
          step="1"
          onChange={handleInputChange}
        />
      </div>

      <div className="button-container">
        <button className="button" onClick={() => setShowAmount(true)}>Convert {From} to {To}</button>
      </div>

      {showAmount && amount !== null && (
        <div className="converted-amount">
          <p>Converted Amount: {amount} {To}</p>
        </div>
      )}
    </div>
  );
}

export default ListCurrency;

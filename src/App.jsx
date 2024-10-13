import { useState, useEffect } from 'react'
import ListCurrency from './ListCurrency'

function App() {
  
  const API_Currencies = 'https://api.frankfurter.app/currencies'
 

  const [currency, setCurrency] = useState({})
  useEffect(()=>{

    const fetchcurrencies = async ()=>{
      const response = await fetch(API_Currencies);
      const data = await response.json()
      setCurrency(data);
    }
    fetchcurrencies();
    
  },[])
  return (
    <>
    <div>
        <h1 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#333',
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #f0f8ff, #e0ffff)',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Arial, sans-serif'
      }}>Currency Converter</h1>
        <ListCurrency currency= {currency}/>
    </div>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Transactioncard from '../components/Transactioncard';
import { useNavigate } from 'react-router-dom';
  
export function Transactions(){
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const handlenavigate =()=>{
    navigate('/dashboard')
  }

    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            // Retrieve token from local storage
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('No token found in local storage');
            }
    
            // Make API request with authorization header
            const response = await axios.get('https://payments-app-psi.vercel.app/api/v1/account/transactions', {
            // const response = await axios.get('http://localhost:3000/api/v1/account/transactions', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            // Set the transactions state with response data
            setTransactions(response.data);
          } catch (err) {
            // Handle errors (e.g., network errors, authorization errors)
            setError(err.message);
          }
        };
    
        fetchTransactions();
      }, []); // Empty dependency array means this effect runs once on mount
    
        return (
            <>
            <div className='flex justify-between'>
            <div className='text-black-200 font-bold text-xl pb-4 pl-3 col-span-3'>Transactions History</div>
            <div><button className='text-gray-400 underline pt-1 text-xl pr-3'onClick={handlenavigate}>dashboard</button></div></div>
            <div> { transactions.map(transaction=>
            <Transactioncard username={transaction.username} amount ={transaction.amount} date={transaction.date}></Transactioncard>)}
            </div>
            
            </>
        );
    };

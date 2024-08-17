import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from 'axios';
require('dotenv').config();
  async function fetchAccountBalance() {
  try {
    
    const token = localStorage.getItem('token');

    
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    // const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
      const response = await axios.get(`${process.env.baseUrl}api/v1/account/balance`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.balance;  
  } catch (error) {
    console.error('Error fetching account balance:', error);
  }
}

export const Dashboard =  () => {

    const[balance,Setbalance] = useState(0);
    useEffect(()=>{
        async function loadbalance(){
            const bal = await fetchAccountBalance()
            Setbalance(bal)
        }
        loadbalance();
    },[balance])
    return <div>
        <Appbar />
        <div className="m-8">

            <Balance value = {balance} />
            <Users />
        </div>
    </div>
}
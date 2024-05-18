import Layout from '@/components/Layout'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function PaymentPage() {

const [payments,setPayments] = useState([]);
  const [search, setSearch] = useState('');
  console.log(search);

  useEffect(() => {
    axios.get('/api/payments').then(response => {
      setPayments(response.data);
    });
  }, []);  

  const deletePaymentHandler = async (id) => {
    await axios.delete(`/api/payments?id=${id}`);
    const updatedPayments = payments.filter(payments => payments._id !== id);
    setPayments(updatedPayments);
  };

    return (
        <Layout>
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800">Payment Management</h1>
                <p className="text-gray-500">This is the payment management page.</p>
            </div>

            <form>
          <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="search" style={{marginTop:'40px', maxWidth:'977px', marginLeft:'16px',border:'none',outline:'none'}}/>
        </form>
        <section className='body'>
          <table className="basic m-4">
          <thead>
            <tr style={{fontWeight:'bolder'}}>
              <td>Name</td>
              <td >Card No</td>
            </tr>
          </thead>
          <tbody>
          {payments.filter((payment)=>{
            return payment.Name.toLowerCase().includes(search.toLowerCase());
          }).map(payment => (
            <tr key={payment._id}>
              <td>{payment.Name}</td>
              <td>{payment.CardNo}</td>
              
              <td>
                <button className="btn-red" onClick={() => deletePaymentHandler(payment._id)} style={{ fontSize: '15px', backgroundColor: 'red', color: 'white', borderRadius: '5px',marginLeft:'10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        </section>
        </Layout>
 );
}
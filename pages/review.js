import Layout from "@/components/Layout";
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Review() {
  const [review,setReview] = useState([]);
  const [search, setSearch] = useState('');
  console.log(search);

  useEffect(() => {
    axios.get('/api/review').then(response => {
      setReview(response.data);
    });
  }, []);

  const deleteReviewHandler = async (id) => {
    await axios.delete(`/api/review?id=${id}`);
    const updatedReviews = review.filter(review => review._id !== id);
    setReview(updatedReviews);
  };


    return (
        <Layout>
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-semibold text-gray-800" >Support</h1>
            </div>

            <form>
          <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="search" style={{marginTop:'40px', maxWidth:'977px', marginLeft:'16px',border:'none',outline:'none'}}/>
        </form>
        <section className='body'>
          <table className="basic m-4">
          <thead>
            <tr>
              <td>Review</td>
              <td>Summary</td>
              <td>Review</td>
            </tr>
          </thead>
          <tbody>
          {review.filter((review)=>{
            return review.name.toLowerCase().includes(search.toLowerCase());
          }).map(review => (
            <tr key={review._id}>
              <td>{review.name}</td>
              <td>{review.summary}</td>
              <td>{review.review}</td>
              <td>
                <button className="btn-red" onClick={() => deleteReviewHandler(review._id)} style={{ fontSize: '15px', padding: '5px', backgroundColor: 'red', color: 'white', borderRadius: '5px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        </section>
            
        </Layout>
    )
}
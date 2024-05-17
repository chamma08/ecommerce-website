import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Define the deleteOrder function
async function deleteOrder(id) {
  await mongooseConnect();
  await Order.deleteOne({ _id: id });
}

// Define the OrdersPage component
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const {id} = router.query;

  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);

  async function deleteOrderHandler(id) {
    try {
      await axios.delete(`/api/orders/${id}`);
      const updatedOrders = orders.filter(order => order._id !== id);
      setOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.streetAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <h1>Orders</h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ padding: '5px', fontSize: '16px', width: '300px' }}
        />
      </div>

      <div style={{ maxHeight: '1400px', overflowY: 'auto' }}>
        <table className="basic" style={{ width: '100%', maxWidth: '1100px', padding: '10px', position: 'elative' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Paid</th>
              <th>Recipient</th>
              <th>Products</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder).map(order => (
              <tr key={order._id}>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td className={order.paid? 'text-green-600' : 'text-red-600'}>
                  {order.paid? 'YES' : 'NO'}
                </td>
                <td>
                  {order.name} {order.email}<br />
                  {order.city} {order.postalCode} {order.country}<br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map(l => (
                    <>
                      {l.price_data?.product_data.name} x
                      {l.quantity}<br />
                    </>
                  ))}
                </td>
                <td>
                  <button onClick={() => deleteOrderHandler(order._id)} style={{ fontSize: '15px', padding: '5px', backgroundColor: 'red', color: 'white', borderRadius: '5px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <button disabled={currentPage === 1} onClick={prevPage} style={{ fontSize: '15px', padding: '5px', backgroundColor: '#ccc', color: 'black', borderRadius: '5px', marginRight: '10px' }}>Previous</button>
          {pageNumbers.map(number => (
            <button key={number} disabled={number === currentPage} onClick={() => changePage(number)} style={{ fontSize: '15px', padding: '5px', backgroundColor: number === currentPage? '#333' : '#ccc', color: 'white', borderRadius: '5px', marginLeft: '5px', marginRight: '5px' }}>{number}</button>
          ))}
          <button disabled={indexOfLastOrder >= orders.length} onClick={nextPage} style={{ fontSize: '15px', padding: '5px', backgroundColor: '#ccc', color: 'black', borderRadius: '5px', marginLeft: '10px' }}>Next</button>
        </div>
      </div>
    </Layout>
  );
}
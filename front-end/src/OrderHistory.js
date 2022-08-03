import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { store } from './Store';


const OrderHistory = () => {
    ///////////////////////////////////////////////////////
    const {state} = useContext(store);
    const {userInfo} = state;
    const [orders , setOrder] = useState([]);
    /////////////////////////////////////////////////////////

    useEffect(()=>{
        const fetchData = async ()=>{
            const {data} = await axios.get('http://localhost:8001/api/orders/my',
            { headers: { authorization:userInfo.token }}
            )
            setOrder(data);

        }
    })

  return (
    <div>
        <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>

      <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default OrderHistory
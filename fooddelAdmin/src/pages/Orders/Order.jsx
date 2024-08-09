import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../../../front_end/src/assets/assets';

const Order = ({ url }) => {
    const [orders, setOrders] = useState([]);

   

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                setOrders(response.data.data);
                console.log(response.data.data);
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error('Error fetching orders:', error);
        }
    };

const statusHandler=async(event,orderId)=>{
  const response=await axios.post(`${url}/api/order/status`,{
    orderId,
    status:event.target.value
  })
 if(response.data.success)
 {
  fetchAllOrders();
 }
{

}
}
    useEffect(() => {
      fetchAllOrders();
  }, []);

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item, index) => (
                                    index === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity},`
                                ))}
                            </p>
                            <p className='order-item-name'>{order.address.firstname + " " + order.address.lastname}</p>
                            <div className="order-item-address">
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event)=>statusHandler(event,order._id)}value={order.status}>
                            <option value="food processing">Food Processing</option>
                            <option value="out of delivery">Out of Delivery</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;

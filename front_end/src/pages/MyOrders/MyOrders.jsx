import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import './MyOrders.css';  // Ensure this path is correct

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my_orders'>
            <h2>My Orders</h2>
            <div className='my-orders container'>
                {data.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src='/path/to/parcel_icon' alt="Parcel Icon" />
                        <p>
                            {order.items.map((item, index) => (
                                index === order.items.length - 1 ? `${item.name} X ${item.quantity}` : `${item.name} X ${item.quantity},`
                            ))}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;

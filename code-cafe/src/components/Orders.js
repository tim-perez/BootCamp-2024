import PropTypes from 'prop-types';
import Pocketbase from 'pocketbase';
import { useState, useEffect } from 'react';
import ItemType from '../types/item';
import './Orders.css';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';

function Orders({ items }) {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useCurrentUserContext();

  useEffect(() => {
    const pb = new Pocketbase();
    async function getOrders() {
      try {
        const records = await pb.collection('orders').getFullList({
          sort: '-created',
        });
        setOrders(records);
      } catch (error) {
        console.error(error);
      }
    }
    if (currentUser.access === 'associate') {
      pb.collection('orders').subscribe('*', (e) => {
        console.log(e.record);
        console.log(e.action);
      });
      getOrders();
      return () => {
        pb.collection('orders').unsubscribe();
        setOrders([]);
      };
    }
    return () => { };
  }, [currentUser]);

  const deleteOrder = async (order) => {
    const pb = new Pocketbase();
    try {
      await pb.collection('orders').delete(order.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="orders-component">
      <h2>Existing Orders</h2>
      {orders.length === 0
        ? (
          <div>
            {currentUser.access === 'associate'
              ? 'No Orders'
              : 'Access Denied'}
          </div>
        )
        : orders.map((order) => (
          <div className="order" key={order.id}>
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>ZIP Code</th>
                  {order.phone && <th>Phone</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.name}</td>
                  <td>{order.zipCode}</td>
                  {order.phone && <td>{order.phone}</td>}
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.quantity}</td>
                    <td>{items.find((i) => i.itemId === item.itemId)?.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={() => deleteOrder(order)}
            >
              Delete Order
            </button>
          </div>
        ))}
    </div>
  );
}

Orders.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Orders;

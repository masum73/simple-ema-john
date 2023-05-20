import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
const Orders = () => {
    const SavedCart = useLoaderData();
    const [cart, setCart] = useState(SavedCart);

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    //console.log(SavedCart);
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                    key={product._id}
                    product={product}
                    handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart 
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to='/checkout'>
                        <button className='btn-proceed'>Proceed Checkout <FontAwesomeIcon icon={faCalendarAlt} /></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;
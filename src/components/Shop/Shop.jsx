import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data));

    }, [])

    useEffect(() => {
        //console.log('products', products);
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id
        for (const id in storedCart) {
            //console.log(id);
            // step 2: get the product by using id
            const addedProduct = products.find(product => product._id === id);
            ///console.log(addedProduct);
            if (addedProduct) {
                // step 3: get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                //console.log(addedProduct);
                // step 4: add the added product to saved cart
                savedCart.push(addedProduct);
            }

        }
        // step 5: set the cart
        setCart(savedCart);
        //console.log(storedCart);
    }, [products])

    const handleAddToCart = (product) => {
        //cart.push(product); JS style
        //const newCart = [...cart, product];
        let newCart = [];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        } else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }
        setCart(newCart);
        addToDb(product._id);
    }
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to='/orders'>
                        <button className='btn-proceed'>Review Order <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};
import './Shop.css'
import { Link } from 'react-router-dom';
export default Shop;
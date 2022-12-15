import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

function ReactStripe(props) {

    const [product, setProduct] = useState({
        name:"React from Fb",
        price:100,
        productBy:"Facebook",
    });

    const makePayment = (token) => {
        const body = {
            token,
            product
        }

        const headers = {
            "Content-Type": "application/json"
        }

        return fetch('/api/payment', {
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log("RESPONSE ", response)
            const {status} = response
            console.log("STATUS ",status)
        })
    }

    return (
        <div>
            <center>
            <h1>Stripe Checkout Using MERN.</h1>
            <StripeCheckout
                stripeKey='pk_test_51K9OorSHWdNs9aoMm08bVrEX3CUzGFEsm9a81NvrUaQbmVJQquusNRxTChBPb9a4VRrFBy0pOFm2b5oic9m3W7lz00GBQPnjc1'
                token={makePayment}
                name='BUY REACT'
                amount={product.price * 100}
                currency="INR"
            />
            </center>
        </div>
    );
}

export default ReactStripe;
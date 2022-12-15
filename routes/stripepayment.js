const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51K9OorSHWdNs9aoM0OmiyxfH58RaBpY2QERDBVDHMyTbjJCpjAyOS9oqnCNeBpbmbBGmeIT8KfNKeYbf1jlJR1E000UfIAlq0j');
const { v4: uuidv4 } = require('uuid');


router.post('/', (req,res) => {
    const  { product, token } = req.body;
    const idempotencyKey = uuidv4();

    console.log(product)
    console.log(token)

    return stripe.customers.create({
        email: token.email,
        source: token.id,
      })
        .then(customer => {
            stripe.charges.create({
                amount: product.price * 100,
                currency:'INR',
                customer:customer.id,
                receipt_email: token.email,
                description: "puchase of product",
                shipping: {
                    name:token.card.name,
                    address: {
                        country: token.card.address_country
                    }
                }

            }, {idempotencyKey})
                .then(result => res.status(200).json(result))
                .catch(err => {
                    console.log(err)
                    res.status(400).json(err)
                })
        })
        .catch(error => {
            console.error(error)
        });

})

module.exports = router;
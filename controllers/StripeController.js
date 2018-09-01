var mongoose = require('mongoose')
const keyPublishable = "pk_test_qglYITXHpo49PPtffT2vQEcg"
const keySecret = "sk_test_LTTqOg3xhsQgzJiFL7Ui1VOg"

var stripe = require("stripe")(keySecret);

exports.createPayment = (req, res) => {
  console.log("entered")
  let amount = 356;

  stripe.charges.create({
    amount: req.body.amount,
    source: req.body.token,
    currency: req.body.currency,
    description: req.body.description
  })
  .then(successMsg => {
    res.json(successMsg)
  })
}

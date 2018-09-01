var mongoose = require('mongoose')
const keyPublishable = "pk_test_qglYITXHpo49PPtffT2vQEcg"
const keySecret = "zf66Fic9htXi5nhoWfGAeQcwSkkAAJ5lofnJEEAK8zP+Sio7LiyLNiSkL3ML9Zw0hKxaDHebcdiIX2hBzph7cLej85fG82NIBrxki60XTkZrY4qLHAcA0TuT7Ts2tyrb"

var stripe = require("stripe")(keySecret);

exports.createPayment = (req, res) => {
  let amount = 356;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: "Tuition Fee",
       currency: "cad",
       customer: customer.id
  }))
  .then(res => res.json(res))
}

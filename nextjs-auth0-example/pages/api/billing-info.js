import auth0 from '../../lib/auth0';

export default auth0.requireAuthentication(async function billingInfo(req, res) {
  const { user } = await auth0.getSession(req);
  res.json({
    email: user.email,
    country: 'United States',
    paymentMethod: 'Paypal'
  })
});

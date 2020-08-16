/* eslint-disable indent-legacy */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Product from './templates/product';
import {graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {createCheckout, checkoutLineItemsReplace} from './templates/checkout'


class App extends Component {
  constructor() {
    super()
    this.state = {
      checkout: {},
      lineItems: []
    }
    this.addVariant = this.addVariant.bind(this)
  }

  addVariant(variantId) {
    this.props.checkoutLineItemsReplace({
      variables: {
        checkoutId: this.state.checkout.id,
        lineItems: [{"variantId": variantId, "quantity": 1}]
      }
    }).then(res => this.setState({checkout: res.data.checkoutLineItemsReplace.checkout,
    lineItems: res.data.checkoutLineItemsReplace.checkout.lineItems.edges}))

  }

  componentDidMount() {
    this.props.createCheckout({
      variables: {
        input: {
          lineItems: this.state.lineItems
        }
      }
    })
    .then(res => this.setState({checkout: res.data.createCheckout.checkout}))
  }
  render() {
      return (
            <Router>
                <Route
                path="/products/:handle"
                exact
                render={(props) => <Product {...props} addVariant = {this.addVariant}/>}
                >

                </Route>
            </Router>
      );
    }
}

const AppWithData = compose(
  graphql(createCheckout, {name: 'createCheckout'}),
  graphql(checkoutLineItemsReplace, {name: 'checkoutLineItemsReplace'})
)(App)

export default AppWithData;

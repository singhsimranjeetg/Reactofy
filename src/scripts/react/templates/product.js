/* eslint-disable no-negated-condition */
/* eslint-disable shopify/prefer-early-return */
/* eslint-disable space-before-blocks */
/* eslint-disable indent-legacy */
/* eslint-disable no-multiple-empty-lines */
import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

class Product extends Component {

  createProductQuery() {
    return gql`
    query {
      shop
       {
         name
      } 
    }
    
  `;
  }
  


  render() {
    return (
      
      
        <Query query={this.createProductQuery()}>
          {
            ({loading, err, data}) => {
              console.log({data})
              console.log({err})
              if (!loading){
                const shopName = data.shop.name;
                return (
                  <div>
                    <h1>your shop name is: {shopName}</h1>
                  </div>
                )
                
                /*
                const product = data.shop.productByhandle;
                console.log(product);
                console.log(err)
                return (
                  <div>
                    <h3>{product.title}</h3>
                  </div>
                );*/
                
              }
              else {
                return (
                  <div>Loading....</div>
                )          
              }

            }}

        </Query>
        
      );
  }
}

export default Product;





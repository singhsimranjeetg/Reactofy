import gql from 'graphql-tag'

const CheckoutFragment = gql`
  fragment CheckoutFragment on Checkout {
    id
    webUrl
    totalTax
    subtotalPrice
    totalPrice
    note
    lineItems(first: 250) {
      edges {
        node {
          id
          title
          variant {
            id
            title
            image {
              src
              transformedSrc(
                maxWidth: 150
                maxHeight: 150
                crop: CENTER
                scale: 1
                preferredContentType: JPG
              )
            }
            price
          }
          quantity
        }
      }
    }
  }
`;


/**
 * Create a new Checkout Instance with Line Items
 * @param {object} variables 
   {
     variables: {
          input: { lineItems: lineItems }  
        }
   }
 * @return {object} Checkout object as defined by fragment
 */
export const createCheckout = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        ...CheckoutFragment
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }${CheckoutFragment}
`;


export const checkoutLineItemsReplace = gql`
  mutation checkoutLineItemsReplace(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        ...CheckoutFragment
      }
      userErrors {
        message
        field
      }
    }
  }
  ${CheckoutFragment}
`;
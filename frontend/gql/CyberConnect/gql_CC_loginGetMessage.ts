export const gql_CC_loginGetMessage = gql`
  mutation loginGetMessage($domain:String!,$address:AddressEVM!) {
    loginGetMessage(input:{
        domain: $domain,
        address: $address
    }) {
      message
    }
  }
`

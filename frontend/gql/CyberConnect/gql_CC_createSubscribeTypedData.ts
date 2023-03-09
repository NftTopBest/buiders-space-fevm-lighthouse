export const gql_CC_createSubscribeTypedData = gql`
  mutation createSubscribeTypedData($input: CreateSubscribeTypedDataInput!) {
    createSubscribeTypedData(input: $input) {
      typedData {
        id
        sender
        data
        nonce
      }
    }
  }
`

export const gql_CC_createCollectEssenceTypedData = gql`
  mutation CreateCollectEssenceTypedData(
    $input: CreateCollectEssenceTypedDataInput!
  ) {
    createCollectEssenceTypedData(input: $input) {
      typedData {
        id
        sender
        data
        nonce
      }
    }
  }
`

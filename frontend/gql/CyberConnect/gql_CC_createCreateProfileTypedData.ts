export const gql_CC_createCreateProfileTypedData = gql`
mutation createCreateProfileTypedData(
    $input: CreateCreateProfileTypedDataInput!
  ) {
    createCreateProfileTypedData(input: $input) {
      typedDataID
    }
  }
`

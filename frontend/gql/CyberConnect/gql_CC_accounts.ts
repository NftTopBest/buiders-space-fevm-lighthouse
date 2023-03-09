export const gql_CC_accounts = gql`
  query Accounts($address: AddressEVM!) {
    address(address: $address) {
      wallet {
        profiles {
          totalCount
          edges {
            node {
              id
              profileID
              handle
              metadata
              avatar
              isPrimary
            }
          }
        }
      }
    }
  }
`

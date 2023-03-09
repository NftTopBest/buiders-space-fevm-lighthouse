export const gql_CC_essences = gql`
query getCollectedEssencesByAddressEVM($address: AddressEVM!){
  address(address: $address) {
    wallet {
      collectedEssences(first: 4){
        edges{
          node{
            tokenID
            wallet{
              address
              
            }
            essence{
              essenceID
              contractAddress
              id
              name
              tokenURI
              createdBy{
                profileID
                handle
              }
            }
          }
        }
      }
    }
  }
}
`

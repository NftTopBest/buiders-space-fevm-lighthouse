export const gql_CC_essenceByFilter = gql`
  query essenceByFilter($metadataID: String, $me: AddressEVM!) {
    essenceByFilter(metadataID: $metadataID) {
      collectedBy {
        edges {
          node {
            mintingBlock
            tokenID
            transferBlock
            wallet {
              address
              chainID
            }
            essence {
              contractAddress
              isCollectedByMe(me: $me)
            }
          }
        }
      }
    }
  }
`

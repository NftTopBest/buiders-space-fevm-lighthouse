export const gql_CC_relayActionStatus = gql`
  query relayActionStatus($relayActionId: ID!) {
    relayActionStatus(relayActionId: $relayActionId) {
      ... on RelayActionStatusResult {
        returnData {
          ... on RegisterEssenceReturnData {
            essenceID
            essenceMw
            essenceTokenURI
            name
            prepareReturnData
            profileID
            symbol
          }
          ... on CollectEssenceReturnData {
            collector
            essenceId
            postData
            preData
            profileId
            tokenId
          }
        }
        txHash
        txStatus
      }
      ... on RelayActionError {
        reason
        lastKnownTxHash
      }
      ... on RelayActionQueued {
        queuedAt
      }
    }
  }
`

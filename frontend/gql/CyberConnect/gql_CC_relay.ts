export const gql_CC_relay = gql`
  mutation relay($input: RelayInput!) {
    relay(input: $input) {
      relayActionId
    }
  }
`

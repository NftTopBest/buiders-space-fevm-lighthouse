export const gql_CC_ = gql`
  mutation relay($input: RelayInput!) {
    relay(input: $input) {
      relayActionId
    }
  }
`

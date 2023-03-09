export const gql_CC_profileHandleEligibility = gql`
  query profileHandleEligibility($handle: String!) {
    profileHandleEligibility(handle: $handle) {
      status
    }
  }
`

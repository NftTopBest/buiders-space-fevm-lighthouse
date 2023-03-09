export const gql_CC_getProfileByHandle = gql`
  query getProfileByHandle($handle: String!) {
    profileByHandle(handle: $handle) {
      profileID
      avatar
    }
  }
`

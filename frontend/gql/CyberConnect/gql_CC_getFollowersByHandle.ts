export const gql_CC_getFollowersByHandle = gql`
  query getFollowersByHandle($handle: String!, $me: AddressEVM!) {
    profileByHandle(handle: $handle) {
      followerCount
      isFollowedByMe(me: $me)
      followers {
        totalCount
        pageInfo {
          hasPreviousPage
          startCursor
          hasNextPage
        }
        edges {
          node {
            profile {
              avatar
              owner {
                address
              }
              handle
            }
          }
        }
      }
    }
  }
`

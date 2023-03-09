export const gql_CC_getSubscribersByProfile = gql`
  query getSubscribersByProfile($address: AddressEVM!, $me: AddressEVM!){
      address(address: $address) {
        wallet {
          profiles(first:1) {
            edges {
              node {
                id
                profileID
                isPrimary
                handle
                avatar
                owner {
                  address
                }
                subscribers(first:5) {
                  totalCount
                  edges {
                    node {
                      profile {
                        handle
                        avatar
                      }
                      wallet {
                        address
                      }
                    }
                  }
                }
                isSubscribedByMe(me: $me)
              }
            }
          }
        }
      }
    }
`

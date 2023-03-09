export const gql_CC_post = gql`
query getPostByAddress(
  $address: AddressEVM!
) {
  address(address: $address) {
    wallet {
     primaryProfile {
       posts {
         edges {
           node {
             ... on Post {
              contentID
              authorHandle
             }
           }
         }
       }
       } 
    }
  }
}
`

export const gql_CC_comment_by_id = gql`
query getContentInfo($contentId: String!, $me: AddressEVM!, $handle: String!) {
  content(id: $contentId) {
    contentID
    ... on Post {
      authorHandle
      body
      commentCount
      likeCount
      likedStatus(me: $me) {
        liked
      }
      comments {
        edges {
          node {
            ...on Comment {
              contentID
              authorHandle
            }
          }
        }
      }
    }
  }
  profileByHandle(handle: $handle) {
    avatar
    handle
  }
}
`

export const getQl = (isPost = true) => {
  let type = 'Comment'
  if (isPost)
    type = 'Post'

  return gql`
  query getContentInfo($contentId: String!, $me: AddressEVM!, $handle: String!) {
    content(id: $contentId) {
      contentID
      ... on ${type} {
        authorHandle
        body
        updatedAt
        commentCount
        likeCount
        likedStatus(me: $me) {
          liked
        }
        comments {
          edges {
            node {
              ...on Comment {
                contentID
                authorHandle
              }
            }
          }
        }
      }
    }
    profileByHandle(handle: $handle) {
      avatar
      handle
    }
  }
  `
}

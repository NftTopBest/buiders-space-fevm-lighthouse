export const gql_CC_loginVerify = gql`
  mutation LoginVerify($input: LoginVerifyInput!) {
    loginVerify(input: $input) {
      accessToken
    }
  }
`

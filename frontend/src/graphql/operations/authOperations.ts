import { gql } from '@apollo/client';

const AuthOperations = {
    SignUp: gql`
 mutation signUp($email: String!,$password: String!) {

signUp(
    user: {
        email: $email
        password: $password
    }
) {
    _id
}
}
`, SignIn: gql`

mutation signIn($email: String!, $password: String!) {
           signIn(
               user: { 
                   email: $email, 
                   password: $password 
                   }) {
               _id
           }
   }
`,
    checkUser: gql`
query CheckUser{
  checkUser
}
`
}




export default AuthOperations;
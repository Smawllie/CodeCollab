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
    email
}
}
`, SignIn: gql`

mutation signIn($email: String!, $password: String!) {
           signIn(user: { email: $email, password: $password }) {
               _id
               email

           }
   }


`
}




export default AuthOperations;
import { gql } from "@apollo/client";

const queryOperations = {
    getUserProjects: gql`
        query getUserProjects($id: String!) {
            getUserById(id: $id) {
                sharedProjects {
                    _id
                    name
                }
                createdProjects {
                    _id
                    name
                }
            }
        }
    `,
};

export default queryOperations;

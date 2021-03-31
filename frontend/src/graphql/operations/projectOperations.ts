import { gql } from "@apollo/client";

const projectOperations = {
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
    createProject: gql`
        mutation createProject($name: String!) {
            createProject(project: { name: $name }) {
                _id
            }
        }
    `,
};

export default projectOperations;

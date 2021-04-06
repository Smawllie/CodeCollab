import { gql } from "@apollo/client";

const projectOperations = {
    getUserProjects: gql`
        query getUserProjects {
            getCurrentUser {
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
    getCurrentUser: gql`
        query getCurrentUser {
            getCurrentUser {
                _id
                email
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
    getProjectById: gql`
        query getProjectById($id: String!) {
            getProjectById(id: $id) {
                _id
                name
                html
                css
                js
                owner {
                    _id
                    email
                }
            }
        }
    `,
    subscribeProjectById: gql`
        subscription subscribeProjectById($id: String!) {
            subscribeProjectById(id: $id) {
                _id
                name
                html
                css
                js
            }
        }
    `,
};

export default projectOperations;

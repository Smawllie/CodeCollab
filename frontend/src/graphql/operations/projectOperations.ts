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
            }
        }
    `,
    saveWebProject : gql`
     mutation saveWebProject($projectId:String!,$html:String!,$css:String!,$js:String!){
         saveWebProject(project:{projectId:$projectId,html:$html,css:$css,js:$js}){
            _id
         }
      
     }
    
    `
};

export default projectOperations;

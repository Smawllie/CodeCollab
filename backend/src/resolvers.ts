import { NonEmptyArray } from "type-graphql";

// Authentication Resolvers
import { SignUpResolver } from "./modules/authentication/signUp.resolver";
import { SignInResolver } from "./modules/authentication/signIn.resolver";
import { SignOutResolver } from "./modules/authentication/signOut.resolver";

// Project resolvers
import { CreateProjectResolver } from "./modules/project/createProject.resolver";
import { ProjectFieldResolver } from "./entities/project.entity";
import { AddCollaboratorResolver } from "./modules/project/addCollaborator.resolver";
import { GetProjectResolver } from "./modules/project/getProject.resolver";
import { DeleteProjectResolver } from "./modules/project/deleteProject.resolver";
import { GetProjectRoles } from "./modules/authorization/getProjectRoles.resolver";

// User resolvers
import { GetUserResolver } from "./modules/user/getUser.resolver";
import { UserFieldResolver } from "./entities/user.entity";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    // Authentication Resolvers
    SignUpResolver,
    SignInResolver,
    SignOutResolver,

    // Project Resolvers
    CreateProjectResolver,
    ProjectFieldResolver,
    GetProjectResolver,
    AddCollaboratorResolver,
    DeleteProjectResolver,
    GetProjectRoles,

    // User Resolvers
    GetUserResolver,
    UserFieldResolver,
];

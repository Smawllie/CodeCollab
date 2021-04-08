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
// import { SaveWebProjectResolver } from "./modules/project/saveWebProject.resolver";

// User resolvers
import { GetUserResolver } from "./modules/user/getUser.resolver";
import { UserFieldResolver } from "./entities/user.entity";

// File resolvers
import { WriteFileResolver } from "./modules/file/writeFile.resolver";
import { AddFileResolver } from "./modules/file/addFile.resolver";
import { GetFileResolver } from "./modules/file/getFile.resolver";
import { FileFieldResolver } from "./entities/file.entity";
import { DeleteFileResolver } from "./modules/file/deleteFile.resolver";

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
    // SaveWebProjectResolver,

    // User Resolvers
    GetUserResolver,
    UserFieldResolver,
    // DeleteUserResolver,

    // File resolvers
    AddFileResolver,
    FileFieldResolver,
    WriteFileResolver,
    GetFileResolver,
    DeleteFileResolver,
];

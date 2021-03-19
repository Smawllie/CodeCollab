import { NonEmptyArray } from "type-graphql";

// Authentication Resolvers
import { SignUpResolver } from "./modules/authentication/signUp.resolver";
import { SignInResolver } from "./modules/authentication/signIn.resolver";
import { SignOutResolver } from "./modules/authentication/signOut.resolver";

// Project resolvers
import { CreateProjectResolver } from "./modules/project/createProject.resolver";
import { ProjectFieldResolver } from "./entities/project.entity";

// User resolvers
import { GetUserResolver } from "./modules/user/getUser.resolver";
import { UserFieldResolver } from "./entities/user.entity";

// Resource resolvers
import { ResourceFieldResolver } from "./entities/resource.entity";

// Directory resolvers
import { DirectoryFieldResolver } from "./entities/directory.entity";
// import { AddDirectoryResolver } from "./modules/directory/addDirectory.resolver";
import { GetDirectoryResolver } from "./modules/directory/getDirectory.resolver";

// File resolvers
import { WriteFileResolver } from "./modules/file/writeFile.resolver";
import { AddFileResolver } from "./modules/file/addFile.resolver";
import { GetFileResolver } from "./modules/file/getFile.resolver";
import { AddCollaboratorResolver } from "./modules/project/addCollaborator.resolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    // Authentication Resolvers
    SignUpResolver,
    SignInResolver,
    SignOutResolver,

    // Project Resolvers
    CreateProjectResolver,
    ProjectFieldResolver,
    AddCollaboratorResolver,

    // User Resolvers
    GetUserResolver,
    UserFieldResolver,

    // Resource resolvers
    ResourceFieldResolver,

    // Directory resolvers
    DirectoryFieldResolver,
    // Don't show add directory, keep the projects flat (not nested)
    // AddDirectoryResolver,
    GetDirectoryResolver,

    // File resolvers
    AddFileResolver,
    WriteFileResolver,
    GetFileResolver,
];

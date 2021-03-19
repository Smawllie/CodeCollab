import { NonEmptyArray } from "type-graphql";

// Authentication Resolvers
import { SignUpResolver } from "./modules/authentication/signUp.resolver";
import { SignInResolver } from "./modules/authentication/signIn.resolver";
import { SignOutResolver } from "./modules/authentication/signOut.resolver";

// Project resolvers
import { CreateProjectResolver } from "./modules/project/createProject.resolver";
import { ProjectResolver } from "./modules/project/project.resolver";

// User resolvers
import { UserResolver } from "./modules/user/user.resolver";

// Resource resolvers
import { ResourceResolver } from "./modules/resource/resource.resolver";

// Directory resolvers
import { DirectoryResolver } from "./modules/directory/directory.resolver";
import { AddDirectoryResolver } from "./modules/directory/addDirectory.resolver";
import { GetDirectoryResolver } from "./modules/directory/getDirectory.resolver";

// File resolvers
// import { UploadFileResolver } from "./modules/file/uploadFile.resolver";
import { WriteFileResolver } from "./modules/file/writeFile.resolver";
import { AddFileResolver } from "./modules/file/addFile.resolver";
import { GetFileResolver } from "./modules/file/getFile.resolver";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
    // Authentication Resolvers
    SignUpResolver,
    SignInResolver,
    SignOutResolver,

    // Project Resolvers
    CreateProjectResolver,
    ProjectResolver,

    // User Resolvers
    UserResolver,

    // Resource resolvers
    ResourceResolver,

    // Directory resolvers
    DirectoryResolver,
    AddDirectoryResolver,
    GetDirectoryResolver,

    // File resolvers
    // UploadFileResolver,
    AddFileResolver,
    WriteFileResolver,
    GetFileResolver,
];

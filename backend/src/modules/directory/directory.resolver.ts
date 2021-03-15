import { FieldResolver, Resolver, Root } from "type-graphql";

import { Directory } from "../../entities/directory.entity";
import { ResourceModel } from "../../entities/resource.entity";

@Resolver(() => Directory)
export class DirectoryResolver {
    @FieldResolver()
    async contents(@Root() directory: Directory) {
        return await Promise.all(
            directory._doc.contents.map(
                async (resourceId: any) =>
                    await ResourceModel.findById(resourceId)
            )
        );
    }
}

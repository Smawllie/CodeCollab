import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";

import { ProjectModel } from "./entities/project.entity";

export function setupSocketIO(server: HTTPServer) {
    const io = new Server(server, {
        cors: {
            // TODO: This ain't right
            origin: "*",
        },
    });

    io.on("connection", (socket: Socket) => {
        console.log(`Socket ${socket.id} connected.`);

        // TODO loop through all the project host rooms and make them save to db
        // every 5 seconds or so
        // let rooms = io.sockets.adapter.rooms;
        // console.log(rooms);

        socket.on("openProject", async (projectId) => {
            // Join project room
            socket.join(`project/${projectId}`);

            // Check if there is a project "host"
            const projectHost = io.sockets.adapter.rooms.get(
                `project/${projectId}/host`
            );
            const projectHostExists = projectHost
                ? projectHost.size > 0
                : false;

            // If there isn't a project host make this connection the host
            if (!projectHostExists) {
                socket.join(`project/${projectId}/host`);

                // Grab the project info from the database and send it to the
                // user
                let project = await ProjectModel.findById(projectId);

                // If project doesn't exist disconnect the socket
                if (!project) socket.disconnect();
                // Otherwise Send back the project data to the host
                else io.to(socket.id).emit("updateProject", project);
            }

            // If there are already clients, tell the host to send its data to
            // the socket, thus updating all other clients
            else {
                let projectHostId = projectHost!.values().next().value;
                io.to(projectHostId).emit("hostSendData");
            }
        });

        // socket.on("updateProject", (project) => {
        //     io.to(`project/${project.id}`).emit("updateProject", project);
        // });
    });
}

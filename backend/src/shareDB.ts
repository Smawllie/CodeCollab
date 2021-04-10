import ShareDB from "sharedb";
import { Server } from "ws";
import { Server as HTTPServer } from "http";

const otText = require("ot-text");
const WebSocketJSONStream = require("websocket-json-stream");

const shareDBMongo = require("sharedb-mongo")(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

ShareDB.types.map["json0"].registerSubtype(otText.type);

export function setupShareDB(server: HTTPServer) {
    const shareDB = new ShareDB({ db: shareDBMongo });
    const webSocketServer = new Server({ server });

    webSocketServer.on("connection", function (socket) {
        var stream = new WebSocketJSONStream(socket);
        shareDB.listen(stream);
    });
}

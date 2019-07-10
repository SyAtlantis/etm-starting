const fs = require("fs");
const path = require("path");
const program = require("commander");
const Koa = require("koa");
const KoaRouter = require("koa-router");
const cors = require("koa2-cors");
const bodyParser = require('koa-bodyparser');


function main() {

    program.version("1.0.0")
        .option("--host <host>", "service host", "127.0.0.1")
        .option("--port <port>", "service port", 7788)
        .parse(process.argv)

    let opt = {};
    opt.host = program.host;
    opt.port = Number(program.port);

    let app = new Koa();
    app.use(cors());
    app.use(bodyParser());

    // router
    const apiDir = path.resolve(__dirname, "src", "api");
    const APIs = fs.readdirSync(apiDir);
    const router = new KoaRouter();
    APIs.forEach(el => {
        if (el.endsWith(".js")) {
            const APIModule = require(path.resolve(apiDir, el));
            APIModule(router);
        }
    });
    app.use(router.routes());

    // server
    app.listen(opt.port, opt.host, () => {
        console.log(`[Server] Listening on ${opt.host}:${opt.port}.`);
    });
}

main();
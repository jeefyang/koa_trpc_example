
import koa from "koa";
import { koaBody } from "koa-body"
import koaRouter from "koa-router";
import { appRouter } from './router';
// import { createKoaMiddleware } from "./koaMiddle"
import { createKoaMiddleware } from "trpc-koa-adapter"


async function main() {
    // express implementation
    const app: koa = new koa()
    const kRouter = new koaRouter()

    kRouter.get("/", async (ctx) => {
        ctx.type = "html"
        ctx.body = 'Server is running!'
        return ctx
    })
    const adapter = createKoaMiddleware({ router: appRouter, prefix: "/trpc" })
    app.use(koaBody({}))
    app.use(kRouter.routes())
    app.use(adapter)
    app.listen(3000);
    console.log("正在监听!!!!")
}

void main();

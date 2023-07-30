
import { initTRPC } from "@trpc/server"
import koa from "koa";
import { koaBody } from "koa-body"
import koaRouter from "koa-router";
import { appRouter } from './router';
import { AnyRouter } from '@trpc/server';
// import { createKoaMiddleware } from "./koaMiddle"
import { createKoaMiddleware } from "trpc-koa-adapter"


async function main() {
    // express implementation
    const app: koa = new koa()
    const kRouter = new koaRouter()
    const trpc = initTRPC.create()

    kRouter.get("/", async (ctx) => {
        // return 'Server is running!'
        ctx.type = "html"
        ctx.body = 'Server is running!'
        return ctx
    })
    const adapter = createKoaMiddleware({ router: appRouter, prefix: "/trpc" })
    // kRouter.get('/trpc', createExpressMiddleware({
    //     router: appRouter,
    //     createContext: () => ({}),
    // }))
    app.use(koaBody({}))
    app.use(kRouter.routes())
    app.use(adapter)
    app.listen(3000);
    console.log("正在监听!!!!")
}

void main();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const User = require('./model/user');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());

router.get('/', async (ctx, next) => {
    const users = await User.find({});
    ctx.body = users;
})

router.post('/user', async (ctx, next) => {
    const user = await User.create({
        login: ctx.request.body.login,
        pass: ctx.request.body.pass
    })
    ctx.body = user
})

router.put('/user/:id', async (ctx, next) => {
    const user = await User.findByIdAndUpdate(ctx.params.id, {
        login: ctx.request.body.login,
        pass: ctx.request.body.pass
    });
    ctx.body = user;
})

router.delete('/user/:id', async (ctx, next) => {
    const user = await User.findByIdAndDelete(ctx.params.id);
    ctx.body = user;
})

app.listen(3000)
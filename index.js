const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const User = require('./model/user');
require('dotenv').config();

const app = new Koa();
const router = new Router();
const { SERV_PORT } = process.env;

app.use(bodyParser());
app.use(router.routes());

router.get('/', async ctx => {
    try {
        const users = await User.find({});
        ctx.body = users;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { error: err.message };
    }
})

router.post('/user', async ctx => {
    try {
        const { login } = ctx.request.body;
        const userExist = await User.findOne({ login });
        if (userExist) {
            ctx.throw(400, 'login already exists');
        } else {
            const user = await User.create({
                login: ctx.request.body.login,
                pass: ctx.request.body.pass
            })
            ctx.body = user
        }
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { error: err.message };
    }
})

router.put('/user/:id', async ctx => {
    try {
        const user = await User.findByIdAndUpdate(ctx.params.id, {
            login: ctx.request.body.login,
            pass: ctx.request.body.pass
        });
        if (!user) ctx.throw(404, 'User not found');
        ctx.body = user;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { error: err.message };
    }
})

router.delete('/user/:id', async ctx => {
    try {
        const user = await User.findByIdAndDelete(ctx.params.id);
        if (!user) ctx.throw(404, 'User not found');
        ctx.body = user;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { error: err.message };
    }
})

app.listen(SERV_PORT)
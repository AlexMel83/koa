const Koa = require('koa');
const errorHandler = require('./error-handler');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const User = require('./model/user');
require('dotenv').config();

const app = new Koa();
const router = new Router();
const { SERV_PORT } = process.env;

app.use(bodyParser());
app.use(errorHandler);
app.use(router.routes());

router.get('/', async ctx => {
    const users = await User.find({});
    ctx.body = users;
})

router.post('/users', async ctx => {
    const { login } = ctx.request.body;
    const userExists = await User.findOne({ login });
    if (userExists) {
        ctx.throw(400, 'User already exists');
    }
    const user = await User.findOneAndUpdate(
        { login },
        {
            $setOnInsert: {
                login,
                pass: ctx.request.body.pass
            }
        },
        { upsert: true, new: true }
    );
    ctx.body = user;
});

router.put('/users/:id', async ctx => {
    const user = await User.findByIdAndUpdate(ctx.params.id, {
        login: ctx.request.body.login,
        pass: ctx.request.body.pass
    });
    if (!user) ctx.throw(404, 'User not found');
    ctx.body = user;
})

router.delete('/users/:id', async ctx => {
    const user = await User.findByIdAndDelete(ctx.params.id);
    if (!user) ctx.throw(404, 'User not found');
    ctx.body = user;
})

app.listen(SERV_PORT)

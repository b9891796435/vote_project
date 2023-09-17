const koa = require('koa2');
const mysql = require('mysql');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const router = Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vote',
    multipleStatements:true
})
connection.connect({});


function read(filename) {
    let fullpath = path.join(__dirname, filename)
    return fs.readFileSync(fullpath, 'utf-8')
}


router.get('/', async (ctx) => {
    ctx.redirect('/login')
})

router.get('/login', async (ctx) => {
    ctx.body = read('/static/login.html')
})
router.post('/login', async (ctx) => {
    await new Promise((resolve) => {
        connection.query(`SELECT * FROM user WHERE username='${ctx.request.body.username}' AND password = '${ctx.request.body.password}';`
            , (err, result) => {
                if (err) throw err;
                if (result.length == 0) {
                    ctx.body = JSON.stringify({ status: 'failed' })
                } else {
                    ctx.body = JSON.stringify({ status: 'success', data: result });
                }
                resolve()
            })

    })
})

router.get('/vote', async (ctx) => {
    ctx.body = read('/static/vote.html')
})
router.post('/vote', async (ctx) => {
    console.log(ctx.request.body)
    await new Promise(resolve => connection.query(`SELECT * FROM vote WHERE uid = ${ctx.request.body.uid}`, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            connection.query(`INSERT INTO vote (cid,uid) VALUES (${ctx.request.body.cid},${ctx.request.body.uid})`);
            ctx.body = JSON.stringify({ status: 'success' });
        } else {
            ctx.body = JSON.stringify({ status: 'failed' })
        }
        resolve();
    }))
})

router.get('/candidates', async (ctx) => {
    await new Promise(resolve => connection.query(
        `SELECT *,
        count(vid) as votes
        from candidate
        left JOIN vote on vote.cid = candidate.cid
        GROUP BY candidate.cid;`,
        (err, result) => {
            if (err) throw err;
            ctx.body = JSON.stringify({ data: result })
            resolve()
        })
    )
})

router.get('/result')


const app = new koa();
app.use(bodyParser())
app.use(async (ctx, next) => {
    const start_time = Date.now();
    await next();
    console.log(`${ctx.method} ${ctx.url} - ${Date.now() - start_time}`)
})//logger
// app.use(async (ctx, next) => {
//     if (ctx.url !== '/login') {//没登录的赶去登录，登录了的你还登录个啥
//         if (ctx.cookies.get('uinfo') == undefined) {
//             ctx.redirect('/login')
//         }
//     } else {
//         if (ctx.url == '/login') {
//             if (ctx.cookies.get('uinfo') !== undefined) {
//                 ctx.redirect('/vote')
//             }
//         }
//     }
//     await next()
// })//login manager
app.use(router.routes())
// a test to sql code
// app.use(async (ctx) => {
//     await new Promise((resolve) => connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//         if (error) throw error;
//         ctx.body = `The solution is: ${results[0].solution}`;
//         resolve()
//     }));
// })
app.listen(7170)
console.log('server started')
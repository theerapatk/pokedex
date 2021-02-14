import * as express from 'express';
import * as path from 'path';

const app = express();
const port = 3080;
const users: any[] = [];

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/user', (req, res) => {
    const user = req.body.user;
    users.push(user);
    res.json('user added');
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.listen(port, () => console.log(`** Server is listening on localhost:${port}, open your browser on http://localhost:${port}/ **`));

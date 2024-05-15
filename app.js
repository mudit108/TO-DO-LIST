const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

let taskData = [
    {
        taskName: "Submit the project"
    },
    {
        taskName: "go home"
    },
    {
        taskName: "party all night"
    }
];

app.get('/', (req, res) => {
    return res.render('form', { taskData });
});

app.post('/insertData', (req, res) => {
    const { taskName } = req.body;
    let obj = { taskName: taskName };
    taskData.push(obj);
    return res.redirect('/');
});

app.get('/deleteData', (req, res) => {
    let id = req.query.taskName;
    let data = taskData.filter((task) => task.taskName !== id);
    taskData = data;
    return res.redirect('/');
});

app.get('/editData', (req, res) => {
    let id = req.query.taskName;
    let user = taskData.find((task) => task.taskName === id);
    if (!user) {
        return res.status(404).send('Task not found');
    }
    return res.render('edit', { user });
});

app.post('/editData', (req, res) => {
    const {taskName} = req.body;
    if (index !== -1) {
        taskData[index].taskName = taskName;
    }
    return res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

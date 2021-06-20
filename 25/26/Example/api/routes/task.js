const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system'),
    shortId = require('shortid');

router.post('/api/task', (req, res) => {
    const data = getTasksFromDB(),
        task = req.body;

    task.id = shortId.generate();
    task.description = task.description.trim() || 'No Description';
    task.status = 'In Progress';

    data.push(task);
    setTasksToDB(data);

    res.send(task);
});

router.get('/api/task/:id', (req, res) => {
    const data = getTasksFromDB(),
        task = data.find(task => task.id === req.params.id);

    task ? res.send(task) : res.send({});
});

router.put('/api/task/:id', (req, res) => {
    const data = getTasksFromDB(),
        task = data.find(task => task.id === req.params.id),
        updatedTask = req.body;

    task.title = updatedTask.title;
    task.description = updatedTask.description || 'No Description';

    setTasksToDB(data);

    res.sendStatus(204);
});

router.put('/api/task/:id/done', (req, res) => {
    const data = getTasksFromDB();

    data.find(task => task.id === req.params.id).status = 'Done';

    setTasksToDB(data);

    res.sendStatus(204);
});

router.delete('/api/task/:id', (req, res) => {
    const data = getTasksFromDB(),
        updatedData = data.filter(task => task.id !== req.params.id);

    setTasksToDB(updatedData);

    res.sendStatus(204);
});

function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(config.get('jsonTasks'), 'utf8'));
}

function setTasksToDB(data) {
    fs.writeFileSync(config.get('jsonTasks'), JSON.stringify(data));
}

module.exports = router;
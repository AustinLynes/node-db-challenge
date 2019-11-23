const express = require('express')
const server = express()
const cors = require('cors')
server.use(cors())
server.use(express.json())
const data = require('./helper')
server.get('/', (req, res) => {
    res.send('welcome to the projects api')
})

server.get('/projects', (req, res) => {
    data.findProjects().then(_project => {
        res.status(200).json(_project)
    }).catch((err) => {
        res.status(500).json(data.converted(_project))
    })
})
server.get('/projects/:id/tasks', (req, res) => {
    const {id} = req.params
console.log(id)
    data.findTasks(id).then(_project_with_tasks => {
        res.status(200).json(_project_with_tasks)
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ error: err })
    })
})
server.get('/resources', (req, res) => {
    data.findResources().then(_project => {
        res.status(200).json(_project)
    }).catch((err) => {
        res.status(500).json({ error: err })
    })
})

server.post('/projects', (req, res) => {
    const project = req.body
    data.addProject(project).then(_project => {
        if (!_project) {
            res.status(400).json({ messege: 'cant do that...', _project })

        } else {

            res.status(201).json(_project)
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ error: err })
    })
})
server.post('/resources', (req, res) => {
    const resource = req.body
    console.log(resource)
    data.addResource(resource).then(_resource => {
        if (!_resource) {
            res.status(400).json({ messege: 'cant do that...', _resource })

        } else {

            res.status(201).json(_resource)
        }
    }).catch((err) => {
        console.log(err)

        res.status(500).json({ error: err })
    })
})
server.post('/projects/:id/task', (req, res) => {
    let task = req.body
    const {id} = req.params
    task = {...task, project_id:id}
    console.table(task)
    data.addTask(id,task).then(_resource => {
        if (!task) {
            res.status(400).json({ messege: 'cant do that...', task })

        } else {

            res.status(201).json(task)
        }
    }).catch((err) => {
        console.log(err)

        res.status(500).json({ error: err })
    })
})

module.exports = server
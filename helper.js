const db = require('./data/dbConfig')

module.exports = {
    findProjects,
    findResources,
    addProject,
    addResource,
    addTask,
    findTasks,
    intToBoolean,
}


function findResources() {
    let query = db('resource')

    return query
}
function findProjects() {
    let query = db('project as p');

    // accidently found out that i can .then inside by looking at the data... nice find
    return query.then(projects => {
        return projects.map(project =>
            project = { ...project, complete: intToBoolean(project.complete) }

        );
    });
}
function findTasks() {
    let query = db('project')
        .join('task', 'project.id', '=', 'task.project_id')
        .select(
            'project.name as project_name',
            'project.description as project_description',
            'task.description as task_description',
            'task.notes as task_notes',
            'task.complete as task_completed'
        );
    return query.then(tasks => {
        return tasks.map(task =>
            task = {
                ...task, task_completed: intToBoolean(task.complete),

            }

        );
    });
}
function addResource(_resource) {
    return db('resource').insert(_resource)
}
function addProject(_project) {
    return db('project').insert(_project)
}
function addTask(project_id, _task) {
    return db('task').insert(_task).where(project_id)
}

function intToBoolean(int) {

    return int === 1 ? true : false;
}


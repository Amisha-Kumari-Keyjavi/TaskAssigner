// Import required modules
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'amisha123',
    database: 'taskassign'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// CRUD API for Users
app.post('/users', (req, res) => {
    const { user_id,global_UUID,user_first_name,user_middle_name,user_last_name,user_email,user_status,user_role_id,created_at,updated_at,created_by,updated_by } = req.body;
    const query = `INSERT INTO Users (user_id,global_UUID,user_first_name,user_middle_name,user_last_name,user_email,user_status,user_role_id,created_at,updated_at,created_by,updated_by ) VALUES (?, ?, ?, ?, ?, ?,?,?,NOW(),NOW(),?,?)`;
    db.query(query, [user_id,global_UUID,user_first_name,user_middle_name,user_last_name,user_email,user_status,user_role_id,created_at,updated_at,created_by,updated_by ], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'User created', userId: result.insertId });
    });
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM Users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


app.delete('/users', (req, res) => {
    const { user_id } = req.body;
    
    if (!user_id) {
        return res.status(400).json({ message: "User ID is required in the request body" });
    }
      db.query('DELETE FROM Users WHERE user_id = ?', [user_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// CRUD API for Groupss
app.post('/groups', (req, res) => {
    const {groupId, group_name, status, createBy,createdAt, updateBy,updatedAt } = req.body;
    const query = `INSERT INTO Groupss (groupId,group_name,status, createBy,createdAt,updateBy, updatedAt) VALUES (?, ?, ?, ?, NOW(),?,NOW())`;
    db.query(query, [groupId, group_name, status, createBy,createdAt, updateBy,updatedAt], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Group created', groupId: result.insertId });
    });
});

app.get('/groups/:id', (req, res) => {
    db.query('SELECT * FROM Groupss', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.delete('/groups', (req, res) => {
    const {groupId } = req.body;
    
    if (!groupId) {
        return res.status(400).json({ message: "Groups ID is required in the request body" });
    }

    db.query('DELETE FROM groupss WHERE groupId = ?', [groupId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }

        if(result.affectedRows === 0) {
            return res.status(404).json({ message: "Groups not found" });
        }
        res.json({ message: 'Groups deleted successfully' });
    });
});

// CRUD API for Tasks
app.post('/tasks', (req, res) => {
    const { task_name, description, assigned_to, status, due_date, createBy,createdAt, updateBy,updatedAt } = req.body;
    const query = `INSERT INTO Tasks (task_name, description, assigned_to, status, due_date, createBy, createdAt, updateBy, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, NOW())`;
    db.query(query, [task_name, description, assigned_to, status, due_date, createBy,createdAt, updateBy,updatedAt], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Task created', taskId: result.insertId });
    });
});


app.get('/tasks/:id', (req, res) => {
    db.query('SELECT * FROM Tasks WHERE task_id=?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results.length ? results[0] : { message: 'Task not found' });
    });
});

app.delete('/tasks', (req, res) => {
    const {task_id} = req.body;
    
    if (!task_id) {
        return res.status(400).json({ message: "task ID is required in the request body" });
    }

    db.query('DELETE FROM tasks WHERE task_id = ?', [task_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }

        if(result.affectedRows === 0) {
            return res.status(404).json({ message: "Tasks not found" });
        }
        res.json({ message: 'Task deleted successfully' });
    });
});


//api for projects

app.post('/projects', (req, res) => {
    const {project_id, project_name, description, group_id, createdAt,createdBy,updatedAt, updatedBy } = req.body;
    const query = `INSERT INTO Projects (project_id,project_name, description, group_id, createdAt, createdBy, updatedAt, updatedBy) VALUES (?,?, ?, ?, NOW(), ?, NOW(),?)`;
    db.query(query, [project_id,project_name, description, group_id,createdAt,createdBy,updatedAt,updatedBy], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Project created', projectId: result.insertId });
    });
});

app.get('/projects', (req, res) => {
    db.query('SELECT * FROM Projects', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.delete('/projects', (req, res) => {
    const { project_id } = req.body;
    
    if (!project_id) {
        return res.status(400).json({ message: "Project ID is required in the request body" });
    }

    db.query('DELETE FROM projects WHERE project_id = ?', [project_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }

        if(result.affectedRows === 0) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.json({ message: 'Project deleted successfully' });
    });
});

//crud api for topics

app.post('/topics', (req, res) => {
    const { topicId,title, project_id, status, createdAt,createdBy, updatedBy ,updatedAt} = req.body;
    const query = `INSERT INTO Topics (topicId,title, project_id, status, createdAt,createdBy, updatedBy ,updatedAt) VALUES (?, ?, ?,?, NOW(), ?, ?, NOW())`;
    db.query(query, [topicId,title, project_id, status, createdAt,createdBy, updatedBy ,updatedAt], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Topic created', topicId: result.insertId });
    });
});

app.get('/topics', (req, res) => {
    db.query('SELECT * FROM Topics', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.delete('/topics', (req, res) => {
    const { topicId } = req.body;
    
    if (!topicId) {
        return res.status(400).json({ message: "Topic ID is required in the request body" });
    }

    db.query('DELETE FROM Topics WHERE topicId = ?', [topicId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }

        if(result.affectedRows === 0) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.json({ message: 'Topic deleted successfully' });
    });
});

//crud for organisation
app.post('/organization', (req, res) => {
    const { organization_id, admin_user_id, manager_user_id, created_at,updated_at,created_by, updated_by} = req.body;
    const query = `INSERT INTO organization_details (organization_id, admin_user_id, manager_user_id, created_at,updated_at,created_by, updated_by) VALUES (?, ?, ?, NOW(),NOW(),?, ?)`;

    db.query(query, [ organization_id, admin_user_id, manager_user_id, created_at,updated_at,created_by, updated_by], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Organization created successfully', organization_id: result.insertId });
    });
});

app.get('/organizations', (req, res) => {
    db.query('SELECT * FROM organizations', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


app.delete('/organizations', (req, res) => {
    const {organization_id} = req.body;
    
    if (!organization_id) {
        return res.status(400).json({ message: "Organisation ID is required in the request body" });
    }

    db.query('DELETE FROM organization_details WHERE organization_id = ?', [organization_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }

        if(result.affectedRows === 0) {
            return res.status(404).json({ message: "Organisation not found" });
        }
        res.json({ message: 'Organisation deleted successfully' });
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

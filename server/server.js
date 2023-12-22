const express = require('express');
const pool = require('./database');
const cors = require('cors')


const port = process.env.PORT || 3000;
const app = express();



app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

//getting courses
app.get('/api/courses', async(req, res) => {
    try {
        console.log("A get all request has arrived");
        const courses = await pool.query(
            "SELECT * FROM courses ORDER BY id"
        );
        res.json(courses.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//getting semester courses
app.get('/api/courses/:semester', async(req, res) => {
    try {
        console.log("get a post with semester parameter request has arrived");
        const { semester } = req.params;
        const posts = await pool.query(
            "SELECT * FROM courses WHERE semester = $1", [semester]
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});
// getting mycourses
app.get('/api/mycourses', async(req, res) => {
    try {
        console.log("A get all request has arrived");
        const courses = await pool.query(
            "SELECT * FROM mycourses ORDER BY id"
        );
        res.json(courses.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//getting semester courses
app.get('/api/mycourses/:semester', async(req, res) => {
    try {
        console.log("get a post with semester parameter request has arrived");
        const { semester } = req.params;
        const posts = await pool.query(
            "SELECT * FROM mycourses WHERE semester = $1", [semester]
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.get('/api/mycoursesDesc/:code', async(req, res) => {
    try {
        const { code } = req.params;
        const posts = await pool.query(
            "SELECT description FROM mycourses WHERE code = $1", [code]
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.put('/api/mycoursesNote/:code', async(req, res) => {
    try {
        const note = req.body.note;
        const code = req.params.code;
        console.log("get a note with code parameter request has arrived");
        const updatedNote = await pool.query(
            "UPDATE mycourses SET note = $1 WHERE code = $2 RETURNING *", [note, code]
        );
        res.status(200).json(updatedNote.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
});
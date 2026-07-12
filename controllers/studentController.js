const pool = require('../config/db');

async function createStudent(req, res) {
    const { name, roll_no, department, cgpa } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO students (name, roll_no, department, cgpa) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, roll_no, department, cgpa]
        );

        res.status(201).json({
            message: 'Student created successfully',
            student: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
}

async function getAllStudents(req, res) {
    try {
        const result = await pool.query(
            'SELECT * FROM students'
        );

        res.status(200).json({
            message: 'Student fetched successfully',
            students: result.rows
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
}

async function getStudentById(req, res) {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM students WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student found',
            student: result.rows[0]
    });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function updateStudent(req, res) {
    const { id } = req.params;
    const { name, roll_no, department, cgpa } = req.body;

    try {
        const result = await pool.query(
            'UPDATE students SET name = $1, roll_no = $2, department = $3, cgpa = $4 WHERE id = $5 RETURNING *',
            [name, roll_no, department, cgpa, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student updated successfully',
            student: result.rows[0]
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function deleteStudent(req, res) {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM students WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({
                message: 'Student not found'
            });  
        }

        res.status(200).json({ message: 'Student deleted successfully', student: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };
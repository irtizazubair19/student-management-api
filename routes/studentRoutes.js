const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

router.post('/', verifyToken, createStudent);
router.get('/', verifyToken, getAllStudents);
router.get('/:id', verifyToken, getStudentById);
router.put('/:id', verifyToken, updateStudent);
router.delete('/:id', verifyToken, deleteStudent);

module.exports = router;
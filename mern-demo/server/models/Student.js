const crypto = require('crypto');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    major: { type: String, required: true },
    age: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
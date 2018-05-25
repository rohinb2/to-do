const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    taskId: {type: Number, min: 0 },
    name: String,
    date: Date,
    category: String
});

module.exports = mongoose.model('Task', TaskSchema);
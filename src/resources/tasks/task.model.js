const uuid = require('uuid');

class Task {
  
  constructor({
    id = uuid.v4(),
    title = 'Task Title',
    description = 'Task description',
    userId = null,
    boardId = null,
    columnId = null,
    order = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.order = order;
  }

    static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;

    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
  }
}

module.exports = Task;
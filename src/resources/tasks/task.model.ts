import { v4 as uuid } from 'uuid';

export interface ITask {
  id?: string;
  title: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
  order: number;
}

/** Class Task representing a task */
export class Task {
  id: string;

  title: string;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  order: number;

  constructor({
    id = uuid(),
    title = 'Task Title',
    description = 'A default task description',
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
    
  static toResponse(task: Task): Task {
    const { id, title, description, userId, boardId, columnId, order } = task;
    return { id, title, description, userId, boardId, columnId, order };
  }
}

/**
 * Board model
 * @module board/model
 */

import { v4 as uuid } from 'uuid';
import { Column } from './board.column.model';

/** Class Board representing a board */
export class Board {
  id: string;

  title: string;

  columns: Column[];

  constructor({
    id = uuid(),
    title = 'Board Title',
    columns = []
  //  columns = [new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((column) => 
     // ({ ...column }));
      new Column(column));
  }

  static toResponse(board: Board): Board {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

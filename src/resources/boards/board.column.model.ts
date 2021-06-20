/**
 * Column model
 * @module board/model
 * @ignore
 */

import { v4 as uuid } from 'uuid';

/** Class Column representing a column */
export class Column {
  id: string;

  title: string;

  order: number;

  constructor({ 
    id = uuid(), 
    title = 'Column Title', 
    order = 0 
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
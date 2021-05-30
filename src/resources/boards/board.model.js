/**
 * Board model
 * @module board/model
 */

const uuid = require('uuid');

const Column = require('./board.column.model');

/**
 * Board instance type
 * @typedef {Object} Board
 * @property {String} id board id
 * @property {String} title board title
 * @property {Array<Column>} columns an array of Column instances
 */

/** Class Board representing a board */
class Board {
  /**
   * Creates a Board instance
   * @type {Board}
   * @param {Object} [props={}] object containing board properties
   * @param {String} [props.id] board id (auto-generated by uuid by default)
   * @param {String} [props.title = 'Board Title'] board title
   * @param {Array<Column>} [props.columns = [Column]] board columns
   */
  constructor({
    id = uuid.v4(),
    title = 'Board Title',
    columns = [new Column()],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
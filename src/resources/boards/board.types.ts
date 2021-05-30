import Column from './board.column.model';

interface IBoardProps {
  id?: string;
  title?: string;
  columns?: Column[];
}

export default IBoardProps;

const memoryDb = {
    Users: [],
    Boards: [],
    Tasks: [],
}

export default memoryDb;


/*
import { User } from '../resources/users/user.model';
import { Board } from "../resources/boards/board.model";
import { Task, ITask } from '../resources/tasks/task.model';


type TypeValueDB = Array<User|Board|Task>;
interface Idb {
    [key: string]: TypeValueDB;
    Users: User[];
    Boards: Board[];   
    Tasks: Task[];
}
const memoryDb: Idb = {
    Users: [],
    Boards: [],
    Tasks: [],
};

export type TypeInstance = User | Board;
export type TypeArr = Array<TypeInstance>;


const getAllEntities = async (tableMemoryDb: string): Promise<TypeArr | Task[]> =>
    (memoryDb[tableMemoryDb] as TypeArr).filter((entity) => entity);

const getAllEntitiesByProps = async (tableMemoryDb: string, boardId: string): Promise<Task[]> =>
    (memoryDb[tableMemoryDb] as Task[]).filter((entity) => entity.boardId === boardId);

const getEntityById = async (tableMemoryDb: string, id: string): Promise<TypeInstance | Task | undefined> => {
    const entity = (memoryDb[tableMemoryDb] as TypeValueDB).find((item) => item.id === id);   
    
    return entity;
};

const getEntityByIdAndProps = async (tableMemoryDb: string, boardId: string, id: string ): Promise<Task | undefined> => {

    const entities = (memoryDb[tableMemoryDb] as Task[]).find((entity) => {
      const isBoard = entity.boardId === boardId;
      const isTask = entity.id === id;

      return isBoard && isTask;
    });

    return entities;
};

const createEntity = async (tableMemoryDb: string, entity: TypeInstance | Task): Promise<TypeInstance | Task | undefined> => {
    if (entity) {
        (memoryDb[tableMemoryDb] as TypeValueDB).push(entity);
        
        return tableMemoryDb === 'Tasks' ? getEntityByIdAndProps(tableMemoryDb, (entity as ITask).boardId, entity.id) : getEntityById(tableMemoryDb, entity.id);
    }

    return undefined;
};

const updateEntity = async (tableMemoryDb: string, id: string, props: Task | TypeInstance): Promise<Task | TypeInstance | undefined> => {
    const entity = await getEntityById(tableMemoryDb, id);

    if (entity) {
        const entityIndex = (memoryDb[tableMemoryDb] as TypeValueDB).indexOf(entity);

        (memoryDb[tableMemoryDb] as TypeValueDB)[entityIndex] = ({
            ...entity,
            ...props,
        });
    }

    return getEntityById(tableMemoryDb, id);
};

const deleteEntity = async (tableMemoryDb: string, id: string): Promise<boolean> => {
    const entity = await getEntityById(tableMemoryDb, id);
   
    if (entity) {
        memoryDb[tableMemoryDb] = (memoryDb[tableMemoryDb] as TypeValueDB).filter((ent) => ent !== entity);
    }

    return !!entity;
};

export default { 
    getAllEntities,
    getAllEntitiesByProps,
    getEntityById,
    getEntityByIdAndProps,
    createEntity,
    updateEntity,
    deleteEntity
}; */
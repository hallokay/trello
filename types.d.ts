interface Board {
    columns: Map<TypedColumn, Column>

}

type TypedColumn = 'todos' | 'inprogress' | 'done'

interface Column {
    id: TypedColumn;
    todos: Todo[]

}
interface Todo {
    $id: string;
    $createdAt: string;
    title: string;
    status: TypedColumn;
    img?: string;

}

interface Img {
    bucketId: string;
    fileId: string;
}
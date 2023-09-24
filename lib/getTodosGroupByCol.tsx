import { databases } from "@/appwrite"

export const getTodosGroupByCol = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!

    );
    // console.log(data)
    const todos = data.documents;
    //reduce
    // reduce함수는 배열의 각 요소를 순회하며 callback함수의 실행 값을 누적하여 하나의 결과값을 반환
    //객체에서 원하는 프로퍼티 값만 합계하고 싶을 경우에도 사용
    //콜백함수의 acc는 이전 반환값. todo는 현재 요소
    //Map은 초기 값이된다. 
    const columns = todos.reduce((acc, todo) => {
        //이전 반환값에서 todo.status를 가져오지 못할 경우(Map이 비어있을 경우)
        // 현재의 요소에서 상태값과 할일의 배열을 가져와서 넣어줌
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        //이전 값이 있을 경우 상태별 이전의 할일 배열에 현재 요소를 추가
        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,

            //이미지가 있으면 가져오기
            ...(todo.img && { img: JSON.parse(todo.img) })
        });
        return acc;

    }, new Map<TypedColumn, Column>)

    //배열로 들어온 데이터를 MAP으로 바꿈

    // console.log('columns', columns);


    //만약 각 컬럼이 진행중, 할일, 완료를 가지지 못했을때
    //빈 할일 들을 추가하는 법
    const columnTypes: TypedColumn[] = ['todos', 'inprogress', 'done'];

    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    }

    // 이렇게 하면 Map은 항상 3개의 컬럼을 가진다.
    //컬럼 타입들에서 하나씩 돌면서 위에서 MAP한 columns에서 columnType을 가져오지 못한다면
    //임의로 컬럼 타입과 빈 할일 배열을 줘서 컬럼타입을 추가한다.


    //컬럼 타입에 의한 컬럼의 정렬
    const sortedCol = new Map(

        Array.from(columns.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        ))
    );

    const board: Board = {
        columns: sortedCol
    }

    return board

}



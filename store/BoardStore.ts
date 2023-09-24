import { create } from 'zustand';
import { getTodosGroupByCol } from '@/lib/getTodosGroupByCol';

interface BoardState {
    board: Board;
    getBoard: () => void;


}

export const useBoardStore = create<BoardState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async () => {
        const board = await getTodosGroupByCol();
        set({ board })
    }
}))
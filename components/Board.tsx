'use client'
import React, { useEffect } from 'react'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from '@/store/BoardStore';

export default function Board() {
    const [board, getBoard] = useBoardStore(state => [
        state.board,
        state.getBoard])

    useEffect(() => {
        getBoard();
    }, [getBoard])

    return (

        // <DragDropContext>

        //     <Droppable droppableId='board'
        //         direction='horizontal'
        //         type='column'>
        //         {
        //             (provided) => (
        //                 <div>
        //                     {/* rendering all the columns */}
        //                 </div>
        //             )
        //         }

        //     </Droppable>
        // </DragDropContext>
    )
}

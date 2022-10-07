import React from 'react';
import {action} from "@storybook/addon-actions"
import {EditableSpan} from "./EditableSpan";


export default {
    title:"EditableSpan Component",
    component: EditableSpan
}

const changeTodolistTitleCallback = action("Value changed")



export const EditableSpanExample = (props:any) => {
return <>
   <EditableSpan value={"startValue"} onChange={changeTodolistTitleCallback}/>

</>
}
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";



export default {
    title: 'Todolist/Tasks',
    component: Task,
    args:{
        changeTaskStatus:action("changr"),
        changeTaskTitle:action("assd"),
        removeTask:action('RemoveTaskCallback'),
        todolistId:"1",
    }

} as ComponentMeta<typeof Task>;



// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskWithRedux = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskWithRedux.args = {
task: {id:"1",title:"ad", isDone:false}

}





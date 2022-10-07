import React from 'react';
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
    title:"Todolist/AppWithRedux",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

 


export const AppWithReduxBaseExample = (props:any) => {
    return <AppWithRedux/>


}
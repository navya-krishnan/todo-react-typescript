import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";


interface ITaskStyle {
    addTaskButton: IStyle;
    successStyle: IStyle;
    boxStyle:IStyle;
}

const taskFormStyle: IProcessedStyleSet<ITaskStyle> = mergeStyleSets({
    addTaskButton: {
        marginTop: "10px",
        width: "50%",
        marginLeft: "25%",
        paddingLeft:"15%"
    },
    successStyle: {
        marginTop: "10px"
    },
    boxStyle:{
        marginLeft:"3%",
        marginRight:"4%"
    }
})

export default taskFormStyle;
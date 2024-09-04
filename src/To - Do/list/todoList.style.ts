import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";

interface ITodoStyle {
    todoItem: IStyle;
    disabled: IStyle;
    actions: IStyle;
    actionText: IStyle;
    checkbox: IStyle;
    iconStyle:IStyle;
}

const todoListStyle: IProcessedStyleSet<ITodoStyle> = mergeStyleSets({
    todoItem: {
        maxHeight: 50,
        minHeight: 30,
        padding: 10,
        width: "90%",
        backgroundColor: "#6699cc",
        selectors: {
            "&:hover": { background: "rgba(243,256,876)" },
        },
        marginTop: "3%",
        display: "flex",
        alignItems: "center",
        boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
        marginLeft: "3%"
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%"
    },
    actionText: {
        marginLeft: "10px"
    },
    disabled: {
        color: "gray",
        selectors: {
            "&:hover": { cursor: "default" }
        }
    },
    checkbox: {
        marginRight: "20px"
    },
    iconStyle: {
        fontSize: 20,
        marginLeft: '-50px',
        paddingRight: '60px',
        marginRight: '10px',
        selectors: {
            "&:hover": { cursor: "pointer" }
        }
    }

})

export default todoListStyle;
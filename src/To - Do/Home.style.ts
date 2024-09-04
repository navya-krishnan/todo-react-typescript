import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";

interface IHomeStyle {
    todoContainer: IStyle,
    heading: IStyle
}

const HomeStyle: IProcessedStyleSet<IHomeStyle> = mergeStyleSets({
    todoContainer: {
        width: "50%",
        height: "80%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50% , -50%)",
        boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    },
    heading: {
        height: "20%",
        backgroundColor:"#1A2A6C",
        color:"#FFD700",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        marginTop:"0%"
    },
    pivot:{
        
    }
})


export default HomeStyle;
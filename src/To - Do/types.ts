export interface pivotEnum {
    Task: "Tasks",
    TaskForm: "Task Form",
    Completed: "Completed"
}

export type todoTask = {
    id: string,
    title: string,
    description: string,
    completed: boolean
}
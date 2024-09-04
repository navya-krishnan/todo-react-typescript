import React, { useState } from 'react';
import HomeStyle from './Home.style';
import { Label, Pivot, PivotItem } from '@fluentui/react';
import todoString from "./string.json"
import { TaskForm } from "./taskForm/taskForm"
import { TodoList } from './list/todoList';
import { todoTask } from './types';
import { CompletedTask } from './list/completedTask'

export const Home = () => {
    const [task, setTask] = useState<todoTask[]>([]);
    const [editTask, setEditTask] = useState<todoTask | null>(null);
    const [isEditing, setIsEditing] = useState(false)
    // state for pivot control
    const [selectPivotKey, setSelectPivotKey] = useState('taskList')

    // function to add new task
    const addTask = (taskName: string, taskDescription: string) => {
        // checking whether to edit or add task
        if (editTask) {
            const updatedTasks = task.map((taskItem) =>
                taskItem.id === editTask.id ? { ...taskItem, title: taskName, description: taskDescription } : taskItem
            )
            setTask(updatedTasks)
            localStorage.setItem('task', JSON.stringify(updatedTasks))
            setIsEditing(false)
            setEditTask(null)

        } else {
            const newTask: todoTask = {
                id: `${Date.now()}-${Math.random()}`,
                title: taskName,
                description: taskDescription,
                completed: false
            };
            let updatedTask = [...task, newTask];
            setTask(updatedTask);
            localStorage.setItem("task", JSON.stringify(updatedTask));
            setIsEditing(false)
        }
        // switch to tasklist after editing or adding
        setSelectPivotKey("taskList")
    }

    // function to edit task
    const editExistingTask = (taskToEdit: todoTask) => {
        setEditTask(taskToEdit)
        setIsEditing(true)
        setSelectPivotKey("taskForm")
    }

    // function to contol pivot
    const onPivotClick = (item?: PivotItem) => {
        setSelectPivotKey(item?.props.itemKey || 'taskList')
    }


    return (
        <div className={HomeStyle.todoContainer}>
            <p className={HomeStyle.heading}> {todoString.header} </p>

            <Pivot selectedKey={selectPivotKey} onLinkClick={onPivotClick}>

                <PivotItem headerText={todoString.pivots.taskList} itemKey="taskList">
                    <TodoList task={task} setTask={setTask} editExistingTask={editExistingTask} />
                </PivotItem>

                <PivotItem headerText={todoString.pivots.taskForm} itemKey="taskForm">
                    <TaskForm addTask={addTask} editTask={isEditing && editTask ? editTask : undefined} />
                </PivotItem>

                <PivotItem headerText={todoString.pivots.taskComplete} itemKey="taskComplete">
                    <CompletedTask task={task}/>
                </PivotItem>

            </Pivot>
        </div>
    )
}

export default Home;
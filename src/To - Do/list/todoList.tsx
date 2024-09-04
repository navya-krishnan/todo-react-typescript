import * as React from 'react';
import todoListStyle from './todoList.style';
import { todoTask } from '../types';
import { Checkbox, FontIcon } from '@fluentui/react';
import '@fluentui/react/dist/css/fabric.min.css';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import todoString from '../string.json'

initializeIcons();

type addTaskListProps = {
    task: todoTask[];
    setTask: (tasks: todoTask[]) => void;
    editExistingTask: (task: todoTask) => void;
}

export const TodoList: React.FC<addTaskListProps> = ({ task, setTask, editExistingTask }) => {
    React.useEffect(() => {
        // loads task from local storage
        const savedTask = JSON.parse(localStorage.getItem('task') || '[]')
        setTask(savedTask)
        // localStorage.clear();
    }, [setTask])

    const onCheckboxClick = (id: string) => {
        const updatedTasks = task.map((taskItem) =>
            taskItem.id === id ? { ...taskItem, completed: !taskItem.completed } : taskItem
        );
        setTask(updatedTasks);
        localStorage.setItem('task', JSON.stringify(updatedTasks));
        console.log(updatedTasks, "update");

    };

    // function to delete task
    const onDeleteClick = (id: string) => {
        const confirmDelete = window.confirm(todoString.deleteConfirm)
        if (confirmDelete) {
            const updatedTasks = task.filter((taskItem) => taskItem.id !== id);
            setTask(updatedTasks);
            localStorage.setItem('task', JSON.stringify(updatedTasks));
        }
    };


    const onEditClick = (taskToEdit: todoTask) => {
        const editConfirm = window.confirm(todoString.editConfirm)
        if (editConfirm) {
            editExistingTask(taskToEdit);
        }
    };

    const performActions = (todo: todoTask) => (
        <div key={todo.id} className={todoListStyle.actions}>
            <FontIcon iconName="Edit" className={todoListStyle.iconStyle} onClick={() => onEditClick(todo)} />
            <FontIcon iconName="Delete" className={todoListStyle.iconStyle} onClick={() => onDeleteClick(todo.id)} />
        </div>
    );

    const filteredTasks = task.filter(taskItem => !taskItem.completed);

    return (
        <div>
            {filteredTasks.length > 0 ? (
                filteredTasks.map((taskItem) => {
                    return (
                        <div key={taskItem.id} className={todoListStyle.todoItem}>

                            <Checkbox className={todoListStyle.checkbox} checked={taskItem.completed}
                                onChange={() => onCheckboxClick(taskItem.id)}
                            />
                            <h4>{taskItem.title}</h4>
                            <div style={{ marginLeft: "10px" }}>
                                {taskItem.description}
                            </div>
                            {performActions(taskItem)}
                        </div>
                    );
                })
            ) : (
                <p>No tasks added yet.</p>
            )}
        </div>
    );
}

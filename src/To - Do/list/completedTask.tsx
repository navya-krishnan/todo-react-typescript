import * as React from 'react';
import todoListStyle from './todoList.style';

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface completedProps {
    task: Task[];
}

export const CompletedTask: React.FC<completedProps> = ({ task }) => {
    return (
        <div>
            {task.length > 0 ? (
                task
                    .filter(taskItem => taskItem.completed)
                    .map(taskItem => (
                        <div key={taskItem.id} className={todoListStyle.todoItem}>
                           <h4> {taskItem.title}</h4>
                            <div style={{ marginLeft: "10px" }}>
                                {taskItem.description}
                            </div>
                        </div>
                    ))
            ) : (
                <div>No task is completed.</div>
            )}
        </div>
    );
}

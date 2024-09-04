import { MessageBar, Modal, PrimaryButton, TextField } from '@fluentui/react';
import * as React from 'react';
import taskFormStyle from './taskForm.style';
import todoString from "../string.json"
import { useState } from 'react';
import { todoTask } from '../types';

// creating props to use add task 
type addTaskFormProps = {
  addTask: (taskName: string, taskDescription: string) => void;
  editTask?: todoTask;
  deleteTask?: todoTask;
};

export const TaskForm: React.FC<addTaskFormProps> = ({ addTask, editTask }) => {
  // setting state for task and description
  const [taskName, setTaskName] = useState(editTask ? editTask.title : '')
  const [taskDescription, setTaskDescription] = useState(editTask ? editTask.description : '')
  const [duplicate, setDuplicate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // handle changes in task name and description
  const handleTaskNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setTaskName(newValue || "")
  }

  const handleTaskDescriptionChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setTaskDescription(newValue || "")
  }

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // retrieving existing task from local storage
    const existingTask = JSON.parse(localStorage.getItem('task') || '[]')

    // checking duplicate
    const isDuplicate = existingTask.some((taskItem: todoTask) => taskItem.title === taskName)

    if (isDuplicate || " ") {
      setDuplicate(true)
      setIsModalOpen(true);
      return;
    } else {
      setDuplicate(false)
    }

    // create new task
    const newTask = { title: taskName, description: taskDescription };

    existingTask.push(newTask);

    // saving updated task to local storage
    localStorage.setItem('task', JSON.stringify(existingTask))

    addTask(taskName, taskDescription)

    setTaskName('');
    setTaskDescription('');
  }

  // resetting after modal closes
  const closeModal = () => {
    setIsModalOpen(false)
    setTaskName('')
    setTaskDescription('')

  }

  return (
    <>
      <form onSubmit={formSubmit}>
        <div className={taskFormStyle.boxStyle} >
          <TextField label="Task" required value={taskName} onChange={handleTaskNameChange} />
          <TextField label="Description" multiline rows={5} value={taskDescription} onChange={handleTaskDescriptionChange} />
        </div>

        <div className={taskFormStyle.addTaskButton}>
          <PrimaryButton type="submit" text={editTask ? todoString.updateTaskBtn : todoString.addTaskBtn} />
        </div>
      </form>

      {/* setting a modal for showing message */}
      <Modal isOpen={isModalOpen} onDismiss={closeModal} isBlocking={false}>
        <div>
          <h3>Error</h3>
          <p>This task already exists or space is not allowed.</p>
          <PrimaryButton onClick={closeModal} text="Close" />
        </div>
      </Modal>
    </>
  )
}


// export {};
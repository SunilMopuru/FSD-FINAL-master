package com.fsd.taskmanagement.app.service;

import com.fsd.taskmanagement.app.model.ParentTask;
import com.fsd.taskmanagement.app.model.Task;
import com.fsd.taskmanagement.app.repository.ParentTaskRepository;
import com.fsd.taskmanagement.app.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("taskService")
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    ParentTaskRepository parentTaskRepository;

    public void addTask(Task task)
    {
        Task savedTask = taskRepository.save(task);
    }

    public void addParentTask(ParentTask parentTask)
    {
        ParentTask savedParentTask = parentTaskRepository.save(parentTask);
    }

    public Task findTask(Long taskId)
    {
        return taskRepository.findById(taskId).get();
    }

    public ParentTask findParentTask(Long taskId)
    {
        return parentTaskRepository.findById(taskId).get();
    }

    public Task closeTask(Long taskId)
    {
        int updateCount = taskRepository.closeTask(taskId);
        if(updateCount == 1 )
        {
            return taskRepository.findById(taskId).get();
        }
        return null;
    }
    public List<Task> findAllTask()
    {
        List<Task> taskList = new ArrayList();
        Iterable<Task> allTask = taskRepository.findAll();
        if(null != allTask)
        {
            taskList = (List<Task>) allTask;
        }
        return taskList;
    }

    public List<ParentTask> findAllParentTask()
    {
        List<ParentTask> taskList = new ArrayList();
        Iterable<ParentTask> allParentTask = parentTaskRepository.findAll();
        if(null != allParentTask)
        {
            taskList = (List<ParentTask>) allParentTask;
        }
        return taskList;
    }
    public List<Task> findTaskByTaskDesc(String task)
    {
        return taskRepository.findTaskByTaskDesc(task);
    }

    public void updateTask(Task task) {
        Optional<Task> taskById = taskRepository.findById(task.getTaskId());

        if(taskById.isPresent())
        {
            Task taskObj = taskById.get();
            taskObj.setTask(task.getTask());
            taskObj.setPriority(task.getPriority());
            taskObj.setStartDate(task.getStartDate());
            taskObj.setEndDate(task.getEndDate());
            taskObj.setParentTask(null);
            if(task.getParentTaskId() != null) {
                Optional<ParentTask> parent = parentTaskRepository.findById(task.getParentTaskId());
                if(parent.isPresent())
                {
                    taskObj.setParentTask(parent.get());
                }
            }
            taskRepository.save(taskObj);
        }
    }

    public Task createTask(Task task) {
        if(task != null)
        {
            return taskRepository.save(task);
        }
        return null;
    }

    public ParentTask createParentTask(ParentTask parentTask) {
        if(parentTask != null)
        {
            return parentTaskRepository.save(parentTask);
        }
        return null;
    }
}

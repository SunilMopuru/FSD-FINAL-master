package com.fsd.taskmanagement.app.controller;

import com.fsd.taskmanagement.app.model.ParentTask;
import com.fsd.taskmanagement.app.model.Task;
import com.fsd.taskmanagement.app.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value={"/task"})
public class TaskController {

	@Autowired
	TaskService taskService;

    @RequestMapping(value="/getTask/{taskId}",  method = RequestMethod.GET )
    public Task getTaskByID(@PathVariable("taskId" ) Long taskId ){
        return taskService.findTask(taskId);
    }

	@RequestMapping(value="/getAllTask",  method = RequestMethod.GET )
	public List<Task> getAllTask(){
		return taskService.findAllTask();
	}

    @RequestMapping(value="/getAllParentTask",  method = RequestMethod.GET )
    public List<ParentTask> getAllParentTask(){
        return taskService.findAllParentTask();
    }

	@RequestMapping(value = "/addTask", method = RequestMethod.POST )
	public Task saveTask(@RequestBody Task task) {
        Task savedTask = null;
		try {
			if(task != null )
			{
                if(task.getTaskId() == null && !task.isparentTask())
                {
                    savedTask = taskService.createTask(task);
                }
			}
		} catch (Exception e) {
            e.printStackTrace();
		}
		return savedTask;
	}

    @RequestMapping(value = "/addParentTask", method = RequestMethod.POST )
    public ParentTask saveParentTask(@RequestBody ParentTask parentTask) {
        ParentTask savedTask=null;
        if(parentTask != null && parentTask.getParentTaskId() == null)
        {
            savedTask = taskService.createParentTask(parentTask);
        }
        return savedTask;
    }

    @RequestMapping(value = "/closeTask", method = RequestMethod.PUT )
    public Task closeTask(@RequestBody Task task) {
        if(task != null )
        {
            Task taskRes = taskService.closeTask(task.getTaskId());
            return taskRes;
        }
        return null;
    }

    @RequestMapping(value = "/updateTask", method = RequestMethod.PUT )
    public Task updateTask(@RequestBody Task task) {
        if(task != null )
        {
            taskService.updateTask(task);
        }
        return task;
    }

}

package com.fsd.taskmanagement.app.controller;

import com.fsd.taskmanagement.app.model.Project;
import com.fsd.taskmanagement.app.model.User;
import com.fsd.taskmanagement.app.service.ProjectService;
import com.fsd.taskmanagement.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value={"/project"})
public class ProjectController {

	@Autowired
    ProjectService projectService;

    @Autowired
    UserService userService;

    @RequestMapping(value="/getAllProject",  method = RequestMethod.GET )
	public List<Project> getAllProject(){
		return projectService.findAllProject();
	}

    @RequestMapping(value = "/addProject", method = RequestMethod.POST )
    public Project addProject(@RequestBody Project project)
    {
        if(project!= null && project.getProjectId() == null)
        {
            return projectService.addProject(project);
        }
        return null;
    }

    @RequestMapping(value = "/updateProject", method = RequestMethod.PUT )
    public Project updateProject(@RequestBody Project project) {
        if (project != null && project.getProjectId() != null) {
            Project projectFromDB = projectService.findProject(project.getProjectId());
            if (projectFromDB != null) {
                projectFromDB.setProjectName(project.getProjectName());
                projectFromDB.setPriority(project.getPriority());
                projectFromDB.setStartDate(project.getStartDate());
                projectFromDB.setEndDate(project.getEndDate());
                projectFromDB.setManager(project.getManager());
                return projectService.addProject(projectFromDB);
            }
        }
        return null;
    }

    @RequestMapping(value = "/suspendProject/{projectId}", method = RequestMethod.PUT )
    public Project suspendProject(@PathVariable("projectId") long projectId) {
        projectService.suspendProject(projectId);
        return projectService.findProject(projectId);
    }

    @RequestMapping(value = "/deleteProject/{projectId}", method = RequestMethod.DELETE )
    public void deleteProject(@PathVariable("projectId") long projectId) {
        projectService.deleteProject(projectId);
    }
}

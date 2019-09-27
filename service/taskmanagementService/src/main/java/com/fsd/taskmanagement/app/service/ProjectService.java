package com.fsd.taskmanagement.app.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.fsd.taskmanagement.app.model.Project;
import com.fsd.taskmanagement.app.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service("projectService")
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    public List<Project> findAllProject()
    {
        List<Project> projectList = new ArrayList();
        Iterable<Project> allProjects = projectRepository.findAll();
        if(null != allProjects)
        {
            Iterator<Project> projIterator = allProjects.iterator();
            while(projIterator.hasNext())
            {
                Project project = projIterator.next();
                projectList.add(project);
            }
        }
        return projectList;

    }

    public Project findProject(Long projectId)
    {
        return projectRepository.findById(projectId).get();
    }

    public Project addProject(Project project)
    {
        if(project != null) {
            return projectRepository.save(project);
        }else
        {
            return null;
        }
    }

    public void deleteProject(long projectId) {
        projectRepository.deleteProject(projectId);
    }

    public void suspendProject(long projectId) {
        projectRepository.suspendProject(projectId);
    }
}


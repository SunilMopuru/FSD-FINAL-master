package com.fsd.taskmanagement.app.repository;

import com.fsd.taskmanagement.app.model.Project;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface ProjectRepository extends CrudRepository<Project, Long> {

    @Transactional
    @Modifying
    @Query(value = "delete Project proj where proj.projectId = :projectId")
    int deleteProject(@Param("projectId") Long projectId);

    @Transactional
    @Modifying
    @Query(value = "update Project proj set proj.endDate = sysdate(), proj.completed=1 where  proj.projectId = :projectId")
    int suspendProject(@Param("projectId") Long projectId);

}

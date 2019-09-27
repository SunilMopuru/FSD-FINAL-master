package com.fsd.taskmanagement.app.repository;

import com.fsd.taskmanagement.app.model.Task;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query(value = "select tk from Task tk where tk.task = :task")
    List<Task> findTaskByTaskDesc(@Param("task") String task);

    @Transactional
    @Modifying
    @Query(value = "update Task tk set tk.endDate = sysdate() where tk.taskId = :taskId")
    int closeTask(@Param("taskId") Long taskId);



}

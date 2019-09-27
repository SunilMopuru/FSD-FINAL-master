package com.fsd.taskmanagement.app.repository;

import com.fsd.taskmanagement.app.model.ParentTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface ParentTaskRepository extends CrudRepository<ParentTask, Long> {


}

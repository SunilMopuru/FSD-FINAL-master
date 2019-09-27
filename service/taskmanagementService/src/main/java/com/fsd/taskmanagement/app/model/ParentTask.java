package com.fsd.taskmanagement.app.model;


import javax.persistence.*;

@Entity
@Table(name = "PARENT_TASK")
public class ParentTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PARENT_ID" , updatable = false, nullable = false )
    private Long parentTaskId;

    @Column(name="PARENT_TASK")
    private String parentTask;

    public ParentTask()
    {
        super();
    }

    public ParentTask(String parentTask)
    {
        this.parentTask =parentTask;
    }
    public Long getParentTaskId() {
        return parentTaskId;
    }

    public void setParentTaskId(Long parentTaskId) {
        this.parentTaskId = parentTaskId;
    }

    public String getParentTask() {
        return parentTask;
    }

    public void setParentTask(String parentTask) {
        this.parentTask = parentTask;
    }

    @Override
    public String toString()
    {
        return "ParentTask: " + this.parentTaskId + ", " + this.parentTask;
    }

}

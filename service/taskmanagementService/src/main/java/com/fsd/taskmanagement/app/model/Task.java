package com.fsd.taskmanagement.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "TASK")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TASK_ID", updatable = false, nullable = false)
    private Long taskId;

    @Column(name="TASK")
    private String task;

    @Column(name="START_DATE")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name="END_DATE")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "PRIORITY ")
    private long priority;

    @OneToOne
    @JoinColumn(name="PARENT_ID", nullable=true)
    private ParentTask parentTask;

    @ManyToOne
    @JoinColumn(name="USER_ID", nullable=true)
    private User user;

    @ManyToOne
    @JoinColumn(name="PROJECT_ID", nullable=true )
    @JsonBackReference
    private Project project;


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @Transient
    private Long parentTaskId;

    @Transient
    private Boolean isparentTask;

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public long getPriority() {
        return priority;
    }

    public void setPriority(long priority) {
        this.priority = priority;
    }

    public ParentTask getParentTask() {
        return parentTask;
    }

    public void setParentTask(ParentTask parentTask) {
        this.parentTask = parentTask;
    }

    public Long getParentTaskId() {
        return parentTaskId;
    }

    public void setParentTaskId(Long parentTaskId) {
        this.parentTaskId = parentTaskId;
    }

    public Boolean isparentTask() {
        return this.isparentTask;
    }

    public void setIsparentTask(Boolean isparentTask) {
        this.isparentTask = isparentTask;
    }
}

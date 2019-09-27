package com.fsd.taskmanagement.config;

import com.fsd.taskmanagement.app.service.TaskService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories("com.fsd.taskmanagement.app.repository")
public class TestConfig{

    @Bean
    public TaskService taskService() {
        return new TaskService();
    }

}

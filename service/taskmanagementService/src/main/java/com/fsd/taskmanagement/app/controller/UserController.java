package com.fsd.taskmanagement.app.controller;

import com.fsd.taskmanagement.app.model.User;
import com.fsd.taskmanagement.app.service.ProjectService;
import com.fsd.taskmanagement.app.service.TaskService;
import com.fsd.taskmanagement.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value={"/user"})
public class UserController {

	@Autowired
    UserService userService;

    @Autowired
    ProjectService projectService;

    @Autowired
    TaskService taskService;

    @RequestMapping(value="/getAllUser",  method = RequestMethod.GET )
	public List<User> getAllUser(){
		return userService.findAllUser();
	}

    @RequestMapping(value = "/addUser", method = RequestMethod.POST )
    public User addUser(@RequestBody User user)
    {
        if(user!= null && user.getUserId() == null)
        {
            return userService.addUser(user);
        }
        return null;
    }

    @RequestMapping(value = "/updateUser", method = RequestMethod.PUT )
    public User updateUser(@RequestBody User user) {
        if (user != null && user.getUserId() != null) {
            User userExist = userService.findUser(user.getUserId());
            if (userExist != null) {
                userExist.setFirstName(user.getFirstName());
                userExist.setLastName(user.getLastName());
                userExist.setEmpId(user.getEmpId());
                return userService.addUser(userExist);
            }
        }
        return null;
    }

    @RequestMapping(value = "/deleteUser/{userId}", method = RequestMethod.DELETE )
    public User deleteUser(@PathVariable("userId") Long userId) {
	    if(userId != null)
        {
            return userService.deleteUser(userId);
        }
	    return null;
    }
}

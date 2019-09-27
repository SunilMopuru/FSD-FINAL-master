package com.fsd.taskmanagement.app.service;

import com.fsd.taskmanagement.app.model.User;
import com.fsd.taskmanagement.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service("userService")
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> findAllUser()
    {
        List<User> userList = new ArrayList();
        Iterable<User> allList = userRepository.findAll();
        if(allList != null) {
            Iterator<User> usrIterator = allList.iterator();
            while (usrIterator.hasNext()) {
                User user = usrIterator.next();
                if (!user.isDeleted()) {
                    userList.add(user);
                }
            }
        }
        return userList;
    }

    public User findUser(Long userId)
    {
        return userRepository.findById(userId).get();
    }

    public User addUser(User user)
    {
        if(user != null) {
            return userRepository.save(user);
        }else
        {
            return null;
        }
    }

    public User deleteUser(long userId) {
        userRepository.deleteUser(userId);
        return userRepository.findById(userId).get();
    }
}

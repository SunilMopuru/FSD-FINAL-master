package com.fsd.taskmanagement.app.repository;

import com.fsd.taskmanagement.app.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface UserRepository extends CrudRepository<User, Long> {

    @Transactional
    @Modifying
    @Query(value = "update User user set deleted=1 where user.userId = :userId")
    int deleteUser(@Param("userId") Long userId);

}

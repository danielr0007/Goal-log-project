package com.example.GoalWebApp.Controller;

import com.example.GoalWebApp.Dao.UserDao;
import com.example.GoalWebApp.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @Autowired
    UserDao userDao;

    @GetMapping(path = "/")//testing purposes
    public String test(){

        return "api works!";
    }



    @PostMapping(path = "/registerUser")
    public void registerUser2(@RequestBody User user){
        userDao.registerUser(user);
    }

    @PostMapping(path = "/loginUser")
    public boolean loginUser(@RequestBody User user) {
        return userDao.verifyuser(user);
    }
}

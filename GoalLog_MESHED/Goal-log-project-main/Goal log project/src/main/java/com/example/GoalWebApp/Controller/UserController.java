package com.example.GoalWebApp.Controller;

import com.example.GoalWebApp.Dao.UserDao;
import com.example.GoalWebApp.Model.User;
import com.example.GoalWebApp.Utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @Autowired
    UserDao userDao;
    @Autowired
    JWTUtil jwtUtil;

    @GetMapping(path = "/")//testing purposes
    public String test(){

        return "api works!";
    }



    @PostMapping(path = "/registerUser")
    public void registerUser2(@RequestBody User user){
        userDao.registerUser(user);
    }


    @PostMapping(path = "/loginUser")
    public String[] loginUser(@RequestBody User user) {

        User userVerified = userDao.verifyuser(user);

        if (userVerified != null) {
           String token = jwtUtil.create(String.valueOf(userVerified.getId()), userVerified.getEmail());
           return new String[]{token, String.valueOf(userVerified.getId())};
        }

        return new String[]{"0"};
    }

    @PostMapping(path = "/getUser")
    public User getUser(@RequestBody User user, @RequestHeader(value = "Authorization") String token) {

        String userId = jwtUtil.getKey(token);
        if(userId == null){
            return null;
        }
            return userDao.getUser(user);
    }

    @PostMapping("/uploadPic")
    public User uploadPicture(@RequestParam("file") MultipartFile file, @RequestParam("id") int id,  @RequestHeader(value = "Authorization") String token) throws IOException {

        String userId = jwtUtil.getKey(token);
        if(userId == null){
            return null;
        }
        return userDao.uploadPicture(file,id);

    }


    @PostMapping("/recoverPassword")
    public String recoverPassword(@RequestBody User user){

        return userDao.getPassword(user);
    }


    @PostMapping("/postGoalObject")
    public String postGoalObject(@RequestBody User user){

        return userDao.postGoalObject(user);
    }





}

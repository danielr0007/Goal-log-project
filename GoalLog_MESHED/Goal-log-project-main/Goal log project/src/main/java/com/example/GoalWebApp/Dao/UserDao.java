package com.example.GoalWebApp.Dao;

import com.example.GoalWebApp.Model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserDao {

    public void registerUser(User user);

    public User verifyuser(User user);


    public User getUser(User user);


    public User uploadPicture(MultipartFile file, int id) throws IOException;

    public String getPassword(User user);

    public String postGoalObject(User user);
}

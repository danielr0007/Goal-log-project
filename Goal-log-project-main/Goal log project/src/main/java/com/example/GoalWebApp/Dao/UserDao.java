package com.example.GoalWebApp.Dao;

import com.example.GoalWebApp.Model.User;

public interface UserDao {

    public void registerUser(User user);

    boolean verifyuser(User user);
}

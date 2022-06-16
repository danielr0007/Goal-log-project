package com.example.GoalWebApp.Dao;

import com.example.GoalWebApp.Model.User;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;


@Repository
@Transactional
public class UserDaoImplement implements UserDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public void registerUser(User user) {
        entityManager.merge(user);

    }

    @Override
    public User verifyuser(User user) {
        String query = "FROM User WHERE email = :email AND password = :password";
        List<User> list = entityManager.createQuery(query)
                .setParameter("email", user.getEmail())
                .setParameter("password", user.getPassword())
                .getResultList();

        if (list.isEmpty()) {
            return null;
        }

        return list.get(0);
    }

    @Override
    public User getUser(User user) {
        String query = "FROM User WHERE id = :id";
        List list = entityManager.createQuery(query)
                .setParameter("id", user.getId())
                .getResultList();

        User u = (User) list.get(0);



        return u;
    }

    @Override
    public User uploadPicture(MultipartFile file, int id) throws IOException {

        User user = entityManager.find(User.class,id);
        System.out.println(user);
        user.setPicture(file.getBytes());

        return  entityManager.merge(user);




    }

    @Override
    public String getPassword(User user) {

        String query = "FROM User WHERE email = :email";

        List list = entityManager.createQuery(query)
                .setParameter("email", user.getEmail())
                .getResultList();

        if(list.isEmpty()){
            return "false";
        }

        User u = (User) list.get(0);

        return u.getPassword();
    }

    @Override
    public String postGoalObject(User user) {

        User user1 = entityManager.find(User.class,user.getId());

        user1.setGoalObject(user.getGoalObject());

         User user2 = entityManager.merge(user1);


        return user2.getGoalObject();
    }


}

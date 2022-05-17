package com.example.GoalWebApp.Dao;

import com.example.GoalWebApp.Model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
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
    public boolean verifyuser(User user) {
        String query = "FROM User WHERE email = :email AND password = :password";
        List list = entityManager.createQuery(query)
                .setParameter("email", user.getEmail())
                .setParameter("password", user.getPassword())
                .getResultList();

        if (list.isEmpty()) {
            return false;
        }
        return true;
    }
}

package com.example.GoalWebApp.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.*;
import java.sql.Blob;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "user_table")
public class User {

    public User(String firstName, String lastName, String email, String password, String goal, byte[] picture, String goalObject){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.goal = goal;
        this.goalObject = goalObject;
    }


    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "goal")
    private String goal;

    @Lob
    @Column(name = "pic")
    private byte[] picture;

    @Column(name = "goalobject")
    private String goalObject;
}

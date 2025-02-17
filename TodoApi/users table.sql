use ToDoList;
SHOW databases;
show tables;
select * from items;
create table users(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    UserName VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);
select * from users;
INSERT INTO Users (username, password) VALUES ('beli mandl', '3686');
-- delete from users where Id = 1
create table signup(
id int(10) not null auto_increment,
userid varchar(30),
userpw varchar(30),
displayName varchar(30),
email varchar(30),
primary key(id)
);

create table board(
id int(10) not null auto_increment,
writer varchar(50),
title varchar(30),
content varchar(300),
regdate  timestamp default current_timestamp on update current_timestamp,
primary key(id)
);

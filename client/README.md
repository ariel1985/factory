# TimsFactory
Tim's factory is my first Fullstack project using SQL SERVER, C# and vanilla JS.
Tim's Factory is an employee management system that implements CRUD actions that work with multiple tables from a relational database.



![DB SCHEMA](https://user-images.githubusercontent.com/36157647/153254210-35e4db68-4743-40d9-ae0f-d16bf8826516.png)



Login requests are authenticated by a POST request to the DB (plainText without hashing);
if the user credentials are correct the request returns true and saves some of the users info to localstorage (Sort of like a cookie) 

Users actions are limited to 10 per day and reset every 24 hours. Each action a user commits deducts 1 "token" from his action amount, if a users actions amounts to zero he can not peforme any actions on the site. 

Oveall had lots of fun doing writing the project, Did a lot of doccumentation and planning before I even started to code, obsivily if you take a peak at the projecct you can see that it's more functionality focused than aesthetics.  

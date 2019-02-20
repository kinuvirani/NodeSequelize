const express = require('express');

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

var cors = require('cors')

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger/swagger.json');

const {registerUser,getUser,deleteUser,editStudent,registerEmployee,editUser,getEmp,registerStudent,getStudent,deleteStudent,studentLogin}=require('./controller/register.controller');

let app = express();
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.post('/users',(req,res)=>{
    return registerUser(req.body,(err,result)=>{
        if(err){
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
})

app.get('/users',(req,res)=>{
    return getUser((err,result)=>{
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
});

app.delete('/users/:id',(req,res)=>{
   // console.log(req.params.id);
    return deleteUser(req.params.id,(err,result)=>{
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
});

app.put('/users/:id',(req,res)=>{
      //console.log(req.params.id);
    return editUser(req.body,req.params.id,(err,result)=>{
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
});

app.post('/empRegister/:id',(req,res)=>{
    return registerEmployee(req.body,req.params.id,(err,result)=>{
        if(err){
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
})

app.get('/emp',(req,res)=>{
    return getEmp((err,result)=>{
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
});
app.post('/student/registration',(req,res)=>{
    return registerStudent(req.body,(err,result)=>{
        if(err){
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
})
app.post('/student/login',(req,res)=>{
    return studentLogin(req.body,res,(err,result)=>{
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
           // console.log("Result====",result)
            return res.status(200).json(result);

        }
    })
});
app.get('/student/',(req,res)=>{
    return getStudent((err,result)=>{
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
});

app.put('/student/edit/:id',(req,res)=>{
    //console.log(req.params.id);
    return editStudent(req.body,req.params.id,(err,result)=>{
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
});

app.delete('/student/delete/:id',(req,res)=>{
    return deleteStudent(req.params.id,(err,result)=>{
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
            return res.status(200).json(result);
        }
    })
});

app.listen(3003,()=>{
    console.log("server is starting on port 3003");
});

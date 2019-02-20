const {Register,Employee,StudentReg}=require('../sequelize')
const sequelize=require('sequelize');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

exports.registerUser=(body,done)=>{
    let register=new Register(body);
    var hashedPassword = passwordHash.generate(body.password);
    register['password']=hashedPassword;
    return register.save().then((doc)=>{
       return done("User Registered Successfully",null)
    }).catch((err) =>
    { return done(null,"Registartion Failed")}
    )
}
exports.getUser=(done)=>{
    return Register.findAll({offset:9,limit:4, attributes: ['username']}).then((doc)=>{
        return done(doc,null)
    }).catch((err)=>{
        return done(null,err)
    })
}

exports.deleteUser=(id,done)=> {
    //console.log(id);
    return Register.destroy({where: {firstname: 'Nikita'}}).then((doc) => {
        console.log(doc);
        return done(null,"user delted successfully")
    }).catch((err) => {
        return done(null,"User not deleted")
    })
}

exports.editUser=(body,id,done)=>{
    let edit=new Register(body);
    console.log("edited ID====",id);
    return Register.update(edit.dataValues,{where:{register_id:id}}).then((doc)=>{
        return done(null,doc)
    }).catch((err)=>{
        return done(null,"User not edited")
    })
}

exports.registerEmployee=(body,id,done)=>{
    return Register.findOne({where :{register_id: id}}).then((doc)=>{
        if(doc)
        {
            let employee=new Employee(body);
            employee['register_id']=id;
            return employee.save().then((doc)=>{
                return done(doc,null)
            }).catch((err) =>
                { return done(null,"Registartion Failed")}
            )
        }
        else
        {
            { return done("Verify register id",null)}
        }
    }).catch((err)=>{
       return done(null,err)
    })
}
exports.getEmp=(done)=>{
    return Employee.findAll({ attributes: {
            include: ['ename', 'esalary', 'edob', [sequelize.fn('COUNT', 'employee.eid'), 'replyCount']]
        }}).then((doc)=>{
        //console.log(doc);
        return done(doc,null)
    }).catch((err)=>{
        return done(null,err)
    })
}

exports.registerStudent=(body,done)=>{
    let student=new StudentReg(body);
      var hashedPassword = passwordHash.generate(body.password);
        student['password']=hashedPassword;
        return student.save().then((doc)=>{
            return done(null,doc);
            //return done(doc,null)
        }).catch((err) =>
            { return done(null,"Registartion Failed")}
        )
}

exports.getUser=(done)=>{
    return Register.findAll({offset:9,limit:4, attributes: ['username']}).then((doc)=>{
        return done(doc,null)
    }).catch((err)=>{
        return done(null,err)
    })
}

exports.studentLogin=(body,res,done)=>{
    let plainPassword=body.password;
    console.log("Email.data===",body.email," Password==",body.password);
    StudentReg.findOne({where:{email:body.email}}).then((doc)=>{
        if(passwordHash.verify(plainPassword, doc.dataValues.password))
        {
            var token = jwt.sign({email:body.email,password:body.password},'123456');
            console.log("Token =====",token);
            res.status(200).send({"token":token});
            //return done(null,token);
        }
        else
        {
            return done(null,{"Error":"Login Failed"})
        }
    }).catch((err)=>{
        return done(null,err)
    })
}
exports.getStudent=(done)=>{
    return StudentReg.findAll().then((doc)=>{
        return done(null,doc)
    }).catch((err)=>{
        return done(null,err)
    })
}

exports.editStudent=(body,id,done)=>{
    let edit=new StudentReg(body);
    console.log("edited ID====",id);
    return StudentReg.update(edit.dataValues,{where:{register_id:id}}).then((doc)=>{
        return done(null,doc)
    }).catch((err)=>{
        return done(null,"Student not edited")
    })
}

exports.deleteStudent=(id,done)=> {
    //console.log(id);
    return StudentReg.destroy({where: {register_id: id}}).then((doc) => {
        console.log(doc);
        return done(null,"user deleted successfully")
    }).catch((err) => {
        return done(null,"User not deleted")
    })
}

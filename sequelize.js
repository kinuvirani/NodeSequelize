const Sequelize=require('sequelize');
const {host,database,username,password}=require('./config/database.js');
const RegiterModel=require('./schema/register.schema');
const EmployeeModel=require('./schema/employee.schema');
const StudentRegModel=require('./schema/registration.schema');

const Op=Sequelize.Op;

const sequelize=new Sequelize(database,username,password,{
    host:host,
    dialect:'mysql',
    operatorsAliases:Op
})

const Register=RegiterModel(sequelize,Sequelize);
const Employee=EmployeeModel(sequelize,Sequelize);
const StudentReg=StudentRegModel(sequelize,Sequelize);

Employee.belongsTo(Register,{foreignKey: 'register_id'});
Register.hasMany(Employee,{foreignKey: 'register_id'});

sequelize.sync().then(() => {
  console.log(`Users db and user table have been created`);
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Mysql connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

module.exports={Register,Employee,StudentReg};

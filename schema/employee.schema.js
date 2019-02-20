module.exports=(sequelize,type)=>{
    return sequelize.define('employee',{
        eid:{
            type:type.UUID,
            primaryKey:true,
            defaultValue:type.UUIDV4,
            allowNull:false
        },
        register_id:{
            type:type.UUID,
            allowNull: false
        },
        ename:type.STRING,
        esalary:type.INTEGER,
        edob:type.DATE
    })
}
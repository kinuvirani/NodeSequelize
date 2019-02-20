module.exports=(sequelize,type)=>{
    return sequelize.define('Registration',{
        register_id:{
            type:type.UUID,
            defaultValue:type.UUIDV4,
            allowNull:false,
            primaryKey:true
        },
        firstname:type.STRING,
        lastname:type.STRING,
        username:type.STRING,
        password:type.STRING,
        dob:type.DATE,
        department:type.STRING
    })
}
module.exports=(sequelize,type)=>{
    return sequelize.define('StudentReg',{
        register_id:{
            type:type.UUID,
            defaultValue:type.UUIDV4,
            allowNull:false,
            primaryKey:true
        },
        firstname:type.STRING,
        lastname:type.STRING,
        email:type.STRING,
        password:type.STRING,
        technology:type.STRING
    })
}

const Users = require('../model/users');
const bcrypt =  require('bcrypt')

module.exports = class UserService{
    async create(details){
        // console.log(details,"service details");
        return await Users.query().insert(details);
    }
    async findAll(txn){
        return await Users.query();
    }
    async findById(id){
        const userId = await Users.query().findById(id);
        if(userId === undefined){
            return (`{sorry : user ${id} not found }`)
        }
        return userId;
    }
    async userUpdate(id, user_details){
        console.log(user_details,id,"user_details");
        const userUpdate = await Users.query().findById(id).patch(user_details);
        return userUpdate
    }
    async userDelete(userId){
        // console.log(userId,"userId");
        const userDelete = await Users.query().deleteById(userId);
        return userDelete;
    }

    async emailChecking(email) {
        const userDetails = await Users.query().findOne({
            email: email
        })
        return userDetails;
    }

    async PassChecking(userInfo, Pass) {
        return await bcrypt.compare(Pass, userInfo.password)
    }
}

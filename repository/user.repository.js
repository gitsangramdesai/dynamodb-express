const db = require('../helpers/database')
const { v4: uuidv4 } = require('uuid');

class UserRepository {
    constructor() {
        this.tableName = 'Users';
    }

    async findByID(UserID, UserName) {
        console.log(UserID,UserName)
        
        const params = {
            TableName: this.tableName,
            Key: {
                UserID,
                UserName
            },
        };

        return await db.get(params).promise();
    }

    async findByEmail(Email) {
        const params = {
            TableName: this.tableName,
            FilterExpression: 'Email = :Email',
            ExpressionAttributeValues: {
                ':Email': Email
            },
        };

        return await db.scan(params).promise();
    }

    async findByName(firstName, lastName) {
        console.log("findByName", firstName, lastName)
        const params = {
            TableName: this.tableName,
            FilterExpression: 'FirstName = :firstName AND LastName =:lastName AND contains ( Email , :emailProvider )',
            ExpressionAttributeValues: {
                ':firstName': firstName,
                ':lastName': lastName,
                ':emailProvider': "gmail.com"
            },
        };

        return await db.scan(params).promise();
    }


    async findAll() {
        const params = {
            TableName: this.tableName
        };

        return await db.scan(params).promise();
    }


    async create(data) {
        const params = {
            TableName: this.tableName,
            Item: {
                UserID: uuidv4(),
                UserName: data.UserName,
                Email: data.Email,
                Password: data.Password,
                FirstName: data.FirstName,
                LastName: data.LastName
            },
        };

        await db.put(params).promise();

        return params.Item;
    }

    async put(UserID, data) {
        console.log("update", data)
        console.log("UserID", UserID)

        const params = {
            TableName: this.tableName,
            Item: {
                "UserName": data.UserName,
                "FirstName": data.FirstName,
                "LastName": data.LastName,
                "Password": data.Password,
                "Email": data.Email,
                "UserID": UserID
            }
        }
        return await db.put(params).promise();
    }


    async update(UserID, data) {
        console.log("update", data)
        console.log("UserID", UserID)

        const params = {
            TableName: this.tableName,
            Key: {
                "UserID": UserID,
                "UserName": data.UserName
            },
            UpdateExpression:
                'set #FirstName = :v_FirstName, #LastName = :v_LastName,#Email=:v_Email,#Password=:v_Password',
            ExpressionAttributeNames: {
                '#FirstName': 'FirstName',
                '#LastName': 'LastName',
                '#Email': 'Email',
                '#Password': 'Password'
            },
            ExpressionAttributeValues: {
                ':v_FirstName': data.FirstName,
                ':v_LastName': data.LastName,
                ':v_Email': data.Email,
                ':v_Password': data.Password
            },
            ReturnValues: "ALL_NEW"
        }
        return await db.update(params).promise();
    }


    async deleteByID(UserID, UserName) {
        console.log("DeleteById", UserID)
        const params = {
            TableName: this.tableName,
            Key: {
                UserID,
                UserName
            },
        };

        return await db.delete(params).promise();
    }
}

module.exports = new UserRepository();
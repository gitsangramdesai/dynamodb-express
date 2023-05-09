const UserRepository = require(`../repository/user.repository`);

class UserService {

    async findByID(UserID,UserName) {
        const data = await UserRepository.findByID(UserID,UserName);

        if (data) {
            return data.Item;
        }

        return data;
    }



    async findByEmail(Email) {
        const data = await UserRepository.findByEmail(Email);
        if (data) {
            return data.Items;
        }

        return data;
    }

    async findByName(firstName,lastName) {
        const data = await UserRepository.findByName(firstName,lastName);
        if (data) {
            return data.Items;
        }

        return data;
    }

    async create(data) {
        return await UserRepository.create({
            UserName: data.userName,
            Email: data.email,
            Password: data.password,
            FirstName: data.firstName,
            LastName: data.lastName
        });
    }

    async update(UserID, data) {
        return await UserRepository.update(UserID, {
            UserName: data.userName,
            Email: data.email,
            Password: data.password,
            FirstName: data.firstName,
            LastName: data.lastName
        });
    }

    async deleteByID(UserID,UserName) {
        return await UserRepository.deleteByID(UserID,UserName);
    }


    async findAll() {
        return await UserRepository.findAll();
    }
}

module.exports = new UserService()

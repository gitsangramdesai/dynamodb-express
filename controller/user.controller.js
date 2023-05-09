const UserService = require(`../service/user.service`);

class UserController {

    async findByID(req, res) {
        const data = await UserService.findByID(req.params.UserID,req.params.UserName)

        res.json(data)
    }

    async findByEmail(req, res) {
        const data = await UserService.findByEmail(req.body.email)
        res.json(data)
    }

    async findByName(req, res) {
        const data = await UserService.findByName(req.body.firstName,req.body.lastName)
        res.json(data)
    }

    async login(req, res) {
        const data = await UserService.findByEmail(req.body.email)
        if (!data.length) {
            res.json({ msg: "invalid username or password" })
        } else if (data[0].Password == req.body.password) {
            res.json({ msg: "Login Sucessfull" })
        } else {
            res.json({ msg: "invalid username or password" })
        }
    }

    async create(req, res) {
        const emailUniqueness = await UserService.findByEmail(req.body.email)
        if (emailUniqueness && emailUniqueness.length) {
            res.json({ "msg": "Email Already in Use" })
        } else {
            const data = await UserService.create(req.body)
            res.json(data)
        }
    }

    async update(req, res) {
        const data = await UserService.update(req.params.UserID, req.body)
        res.json(data)
    }

    async deleteByID(req, res) {
        await UserService.deleteByID(req.params.UserID,req.params.UserName)
        res.json(`Success`)
    }

    async findAll(req, res) {
        const data = await UserService.findAll()
        res.json(data)
    }


}

module.exports = new UserController()

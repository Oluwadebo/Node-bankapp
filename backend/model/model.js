const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const uploadSchema = new mongoose.Schema(
    {
        product: String,
        price: String,
        file: String,
        adminId: String,
    }
)

const BankSchema = new mongoose.Schema(
    {
        Name: String,
        email: String,
        password: String,
        DateCreated: String,
        balance: Number,
        phoneno: {
            type: String,
            unique: true,
        },
        accountNumber: String,
        history: Array,
        bvn: {
            type: String,
            unique: true,
        },
    }
)
BankSchema.pre("save", async function (next) {
    let { password, email } = this;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    this.password = hashed;
    this.email = email.toLowerCase();
    next();
})

const UploadModel = mongoose.model('files', uploadSchema)
const BankModel = mongoose.model('Customers', BankSchema)

module.exports = { UploadModel, BankModel };
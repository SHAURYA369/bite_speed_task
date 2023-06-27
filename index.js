const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes, Op } = require('sequelize');
require('dotenv').config();
// Create an instance of Express
const app = express();
app.use(bodyParser.json());

// // Create a Sequelize instance to connect to the database
const sequelize = new Sequelize(process.env.YOUR_DB_URI);
// Define the Contact model
class Contact extends Model { }
Contact.init(
    {
        phoneNumber: DataTypes.STRING,
        email: DataTypes.STRING,
        linkedId: DataTypes.INTEGER,
        linkPrecedence: DataTypes.ENUM('primary', 'secondary'),
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: 'Contact',
        tableName: 'Contact',
    }
);

app.post('/identify', async (req, res) => {
    const { email, phoneNumber } = req.body;

    // Find the primary contact based on email or phone number
    const primaryContact = await Contact.findOne({
        where: {
            [Op.or]: [{ email }, { phoneNumber }],
        },
        order: [['createdAt', 'ASC']]
    });

    if (primaryContact) {
        const primaryContactId = primaryContact.linkedId || primaryContact.id;
        console.log(primaryContactId);
        const [newContact, otherRecord] = await Promise.all([
            Contact.create({
                email,
                phoneNumber,
                linkedId: primaryContactId,
                linkPrecedence: 'secondary',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            Contact.findOne({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [{ email }, { phoneNumber }],
                        },
                        {
                            [Op.or]: [
                                {
                                    [Op.and]: [{ id: { [Op.ne]: primaryContactId } }, { linkedId: null }],
                                },
                                { linkedId: { [Op.ne]: primaryContactId } },
                            ],
                        },
                    ],
                },
            }),
        ]);
        
        if (otherRecord) {

            console.log(otherRecord.email + primaryContactId)
            const otherRecordId = otherRecord.linkedId || otherRecord.id;
            await Contact.update({ linkedId: primaryContactId, linkPrecedence: 'secondary' }, {
                where: { id: otherRecordId }
            });

            const recordsToUpdate = await Contact.update({
                linkedId: primaryContactId,
            }, {
                where: { linkedId: otherRecordId },
            });

            console.log(recordsToUpdate);
        }

    } else {
        // Create a new primary contact
        const newContact = await Contact.create({
            email,
            phoneNumber,
            linkPrecedence: 'primary',
            createdAt: new Date(),
            updatedAt: new Date(),
        });


    }
});

// Sync the models with the database and start the server

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
});
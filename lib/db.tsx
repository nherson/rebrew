import {Sequelize} from 'sequelize-typescript';

let sequelize: Sequelize
if (process.env.ENVIRONMENT === "production") {
        sequelize = new Sequelize(process.env.DATABASE_URL)
} else {
        console.log("using in memory database for storage")
        sequelize =  new Sequelize({
                database: 'some_db',
                dialect: 'sqlite',
                username: 'root',
                password: '',
                storage: ':memory:',
        });
}


sequelize.sync().then(() => console.log(sequelize.models))

export default sequelize
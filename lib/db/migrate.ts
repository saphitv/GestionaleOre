import {connect} from "@planetscale/database";
import {drizzle} from "drizzle-orm/planetscale-serverless";
import {migrate} from "drizzle-orm/planetscale-serverless/migrator";
import 'dotenv/config'

const connection = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  }
)

const db = drizzle(connection)

const main = async () => {
  console.log("Starting migration")
  await migrate(db, {migrationsFolder: "lib/db/migrations"})
  console.log("Migration completed")
}

main()


const Pool = require('pg').Pool;
const pool = new Pool({
  user: "postgres",
  password: "sql", // Enter your password here
  database: "testWad", //Try to use the same name for your database
  host: "localhost",
  port: "5432"
});

const execute = async (createTblQuery, insertDataQuery) => {
  try {
    await pool.connect();
    await pool.query(createTblQuery);
    await pool.query(insertDataQuery);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

const createTblQuery = ` 
    CREATE TABLE IF NOT EXISTS "courses" (
        "id" SERIAL PRIMARY KEY,  
        "code" VARCHAR(200) NOT NULL,
        "title" VARCHAR(200) NOT NULL, 
        "semester" VARCHAR(200) NOT NULL, 
        "credits" integer NOT NULL, 
        "description" VARCHAR(2000)
        );`;
const createTblQuery2 = ` 
    CREATE TABLE IF NOT EXISTS "mycourses" (
        "id" SERIAL PRIMARY KEY,  
        "code" VARCHAR(200) NOT NULL,
        "title" VARCHAR(200) NOT NULL, 
        "semester" VARCHAR(200) NOT NULL, 
        "homeworks" integer NOT NULL, 
        "exam" integer NOT NULL,
        "note"		VARCHAR(200),
        "description"	VARCHAR(2000)
        );`;

const insertDataQuery = `WITH data (code, title, semester, credits, description) AS 
   (
    VALUES
    ('LTAT 05.006', 'Software Testing', 'spring', 6, 'test1'),  
    ('LTAT 05.003', 'Software Engineerings', 'fall', 6, 'test2'),
    ('LTAT 02.007', 'Data Engineering', 'fall', 6, null)
    )
  INSERT INTO courses(code, title, semester, credits, description) 
  SELECT  d.code, d.title, d.semester, d.credits, d.description
  FROM data d
  WHERE NOT EXISTS (SELECT * FROM courses WHERE id = 1);
`
const insertDataQuery2 = `WITH data (code, title, semester, homeworks, exam, description) AS 
   (
    VALUES
    ('LTAT 05.006', 'Software Testing', 'spring', 50, '50', 'The goal of the course is to introduce basic concepts on software testing levels, testing approaches, testing types, and Test-Driven Development'),  
    ('LTAT 05.003', 'Software Engineerings', 'fall', 34, '33', 'The goal of the course is to introduce basic concepts on Agile Software Development and current practices. Students will implement agile practices during the development of a web application.'),
    ('LTAT 02.007', 'Data Engineering', 'fall', 28, 21, 'blin')
    )
  INSERT INTO mycourses(code, title, semester, homeworks, exam, description) 
  SELECT  d.code, d.title, d.semester, d.homeworks, d.exam, d.description
  FROM data d
  WHERE NOT EXISTS (SELECT * FROM mycourses WHERE id = 1);
 `
execute(createTblQuery2, insertDataQuery2).then(result => {
  if (result) {
    console.log('If does not exists, table "courses" is created');
  }
});

process.on('SIGINT', async () => {
  console.log('Process interrupted. Cleaning up...');
  try {
    // Cleanup: Drop tables if they exist
    await execute('DROP TABLE IF EXISTS "mycourses" CASCADE;');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    process.exit(); // Exit the process
  }
});

module.exports = pool;
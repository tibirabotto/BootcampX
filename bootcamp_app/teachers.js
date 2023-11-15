const cohortName = process.argv[2];

// Store all potentially malicious values in an array.
const values = [`${cohortName}`];

const { Client } = require("pg");

const client = new Client({
  user: "labber",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const findAllUsers = async () => {
  await client.connect();

  const res = await client.query(
    `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;
`,
    values
  );
  res.rows.forEach((row) => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
  await client.end();
};

findAllUsers();

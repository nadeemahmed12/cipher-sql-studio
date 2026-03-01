import pool from "../config/postgre.js"

export const createSchema = async (schemaName) => {
  await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
};

export const createTables = async (schemaName, sampleTables) => {
  for (const table of sampleTables) {
    const columns = table.columns
      .map(col => `${col.columnName} ${col.dataType}`)
      .join(", ");

    const query = `
      CREATE TABLE IF NOT EXISTS ${schemaName}.${table.tableName} (
        ${columns}
      );
    `;
    await pool.query(query);
  }
};

export const insertRows = async (schemaName, sampleTables) => {
  for (const table of sampleTables) {
    for (const row of table.rows) {

      const columns = Object.keys(row).join(", ");
      const values = Object.values(row)
        .map(val => `'${val}'`)
        .join(", ");

      const query = `
        INSERT INTO ${schemaName}.${table.tableName}
        (${columns})
        VALUES (${values});
      `;

      await pool.query(query);
    }
  }
};


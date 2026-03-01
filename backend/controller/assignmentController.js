import Assignment from "../models/assignmentModel.js";
import {
  createSchema,
  createTables,
  insertRows,
} from "../services/postgresService.js";
import pool from "../config/postgre.js";
import {generateHint} from "../services/llmService.js"

export const createAssignment = async (req, res) => {
  try {
    const assignmentData = req.body;
    const assigment = await Assignment.create(assignmentData);
    res.status(201).json(assigment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssignment = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const schemaName = `workspace_${id}`;
    await pool.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);


    await createSchema(schemaName);
    await createTables(schemaName, assignment.sampleTables);
    await insertRows(schemaName, assignment.sampleTables);

    res.status(200).json({
      assignment,
      schema: schemaName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const executeQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const trimmedQuery = query.trim();
    const upperQuery = trimmedQuery.toUpperCase();

    
    if (!upperQuery.startsWith("SELECT")) {
      return res.status(400).json({
        success: false,
        message: "Only SELECT queries are allowed",
      });
    }

    
    if (trimmedQuery.split(";").length > 2) {
      return res.status(400).json({
        success: false,
        message: "Multiple statements not allowed",
      });
    }

    
    const forbidden = /(DROP|DELETE|ALTER|UPDATE|INSERT|TRUNCATE|CREATE)/i;
    if (forbidden.test(trimmedQuery)) {
      return res.status(400).json({
        success: false,
        message: "Dangerous query detected",
      });
    }

    const schemaName = `workspace_${id}`;

    //Set schema
    await pool.query(`SET search_path TO ${schemaName}`);

    //Execute query
    const result = await pool.query(trimmedQuery);

    //Fetch expected output
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const expected = assignment.expectedOutput || [];

    const normalize = (arr) =>
      arr.map((obj) => JSON.stringify(obj)).sort();

    const isCorrect =
      JSON.stringify(normalize(result.rows)) ===
      JSON.stringify(normalize(expected));

    res.status(200).json({
      success: true,
      correct: isCorrect,
      userResult: result.rows,
      expectedResult: expected,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      errorType: "SQL_ERROR",
      message: error.message,
    });
  }
};


export const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    const schemaName = `workspace_${id}`;
    await pool.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);

    res.status(200).json({
      success: true,
      message: `Workspace ${schemaName} deleted successfully`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getHint = async (req, res) => {
  try {
    const { id } = req.params;
    const { query } = req.body;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const hint = await generateHint(
      assignment.question,
      query
    );

    res.status(200).json({
      success: true,
      hint,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
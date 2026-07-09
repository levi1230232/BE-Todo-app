import express from "express";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";

import {
  createTodo,
  getMyTodos,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  completeTodo,
  adminDeleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: Todo Management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 684d6f34b123456789abcd12
 *         title:
 *           type: string
 *           example: Learn Express
 *
 *         completed:
 *           type: boolean
 *           example: false
 *         user:
 *           type: string
 *           example: 684d6f34b123456789abcd11
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

router.use(auth);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get current user's todos
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *       401:
 *         description: Unauthorized
 */
router.get("/", role("USER"), getMyTodos);

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learning DSA
 *
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", role("USER"), createTodo);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get todo by ID
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 684d6f34b123456789abcd12
 *     responses:
 *       200:
 *         description: Todo found
 *       404:
 *         description: Todo not found
 */
router.get("/:id", role("USER"), getTodoById);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 */
router.put("/:id", role("USER"), updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete your todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete("/:id", role("USER"), deleteTodo);

/**
 * @swagger
 * /todos/{id}/complete:
 *   patch:
 *     summary: Mark todo as completed
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo marked as completed
 *       404:
 *         description: Todo not found
 */
router.patch("/:id/complete", role("USER"), completeTodo);

/**
 * @swagger
 * /todos/admin/all:
 *   get:
 *     summary: Get all todos (Admin)
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all todos
 *       403:
 *         description: Forbidden
 */
router.get("/admin/all", role("ADMIN"), getAllTodos);

/**
 * @swagger
 * /todos/admin/{id}:
 *   delete:
 *     summary: Delete any todo (Admin)
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       403:
 *         description: Forbidden
 */
router.delete("/admin/:id", role("ADMIN"), adminDeleteTodo);

export default router;

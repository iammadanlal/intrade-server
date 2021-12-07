/**
 * @swagger
 * components:
 *  schemas:
 *    Cart:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The user ID.
 *          example: 0
 *        name:
 *          type: string
 *          description: The user's name.
 *          example: Leanne Graham
 */

const { Router } = require("express");
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/auth");

const router = Router();

/**
 * @swagger
 * /cart:
 *  post:
 *    tags: ['cart']
 *    description: to add item to cart
 *    parameters:
 *      - in: body
 *        name: productId
 *        required: true
 *        description: id of product
 *        schema:
 *          type: string
 *      - in: body
 *        name: quantity
 *        required: true
 *        description: quantity of product
 *        schema:
 *          type: number
 *    responses:
 *      201:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Cart'
 */
router.post("/cart", authMiddleware, cartController.addItemToCart);

/**
 * @swagger
 * /cart:
 *  get:
 *    tags: ['cart']
 *    description: to get cart details
 *    responses:
 *      201:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Cart'
 */
router.get("/cart", authMiddleware, cartController.getCart);

/**
 * @swagger
 * /cart:
 *  delete:
 *    tags: ['cart']
 *    description: to empty cart or remove all items from cart
 *    responses:
 *      201:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Cart'
 */
router.delete("/cart", authMiddleware, cartController.emptyCart);

/**
 * @swagger
 * /cart/{:id}:
 *  delete:
 *    tags: ['cart']
 *    description: to remove product from cart by id
 *    responses:
 *      201:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Cart'
 */
router.delete("/cart/:id", authMiddleware, cartController.removeItemFromCart);

module.exports = router;

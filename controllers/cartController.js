const Cart = require("../models/cart");
const Product = require("../models/product");

const getCart = async (req, res) => {
  const { id: userId } = req.user;
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(400).json({
        type: "Invalid",
        code: "CNF",
        msg: "Cart not Found",
      });
    }
    res.status(200).json({
      status: true,
      data: cart,
    });
  } catch (err) {
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};

const emptyCart = async (req, res) => {
  const { id: userId } = req.user;
  try {
    let cart = await Cart.findOne({ userId });
    cart.items = [];
    cart.subTotal = 0;
    let data = await cart.save();
    res.status(200).json({
      type: "success",
      mgs: "Cart has been emptied",
      data: data,
      status: true,
    });
  } catch (err) {
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};

const addItemToCart = async (req, res) => {
  const { id: userId } = req.user;
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);

  try {
    // -------Get users Cart ------
    let cart = await Cart.findOne({
      userId: userId,
    });

    //-----Get Selected Product Details ----
    const productDetails = await Product.findById(productId);

    //-- Check if product Exists ---
    if (!productDetails) {
      throw new Error("PNF");
    }

    //-- Check if cart Exists -------
    if (cart) {
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      let itemTotal;
      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.items[itemIndex];
        let differenceOfQuantity = quantity - productItem.quantity;
        itemTotal = differenceOfQuantity * parseInt(productDetails.price);
        cart.subTotal += itemTotal;
        productItem.quantity = quantity;
        cart.items[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.items.push({
          productId,
          quantity,
          price: parseInt(productDetails.price),
        });
        itemTotal = quantity * parseInt(productDetails.price);
        cart.subTotal += itemTotal;
      }
      cart = await cart.save();
      res.status(201).send({ status: true, data: cart });
    }
    //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cartData = {
        userId: userId,
        items: [
          {
            productId: productId,
            quantity: quantity,
            price: parseInt(productDetails.price),
          },
        ],
        subTotal: parseInt(parseInt(productDetails.price) * quantity),
      };
      cart = new Cart(cartData);
      let data = await cart.save();
      res.status(201).json({ status: true, data });
    }
  } catch (err) {
    console.log(err, "\n", JSON.stringify(err));
    const errObj = {
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
      code: 404,
    };
    if (err.message === "PNF") {
      (errObj.code = "PNF"), (errObj.msg = "Product not found.");
    }
    res.status(400).json(errObj);
  }
};

const removeItemFromCart = async (req, res) => {
  const { id: userId } = req.user;
  const { id: productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    //---- Check if index exists ----
    const indexFound = cart.items.findIndex(
      (item) => item.productId == productId
    );
    //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
    if (indexFound !== -1) {
      cart.items.splice(indexFound, 1);
      if (cart.items.length == 0) {
        cart.subTotal = 0;
      } else {
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
      let data = await cart.save();
      res.status(201).json({ status: true, data });
    }
  } catch (err) {
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};

module.exports = {
  getCart,
  emptyCart,
  addItemToCart,
  removeItemFromCart,
};

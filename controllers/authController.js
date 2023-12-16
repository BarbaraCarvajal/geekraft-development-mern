import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Token from "../models/token.js";
import sendEmail from "./../utils/nodemailer.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";

export const registerController = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    // Validaciones
    if (!name || !email || !password || !phone || !address) {
      return res
        .status(400)
        .send({ message: "Todos los campos son requeridos" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).send({ message: "Ingresa un email válido" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ message: "La contraseña debe ser más segura" });
    }
    if(!user.verified){
      let token = await Token.findOne({ userId: user._id });
      if(!token){
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/users/verify-email/${token.token}`;
        await sendEmail(user.email, "Verifica tu correo electrónico", url);
        
      }
      return res.status(400).send({ message: "Verifica tu correo electrónico" });
    }

    // Verificar si el usuario ya existe
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "El usuario ya está registrado. Por favor, inicia sesión.",
      });
    }

    // Crear nuevo usuario
    const hashedPassword = await hashPassword(password);
    const emailToken = crypto.randomBytes(64).toString("hex");
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      emailToken: emailToken,
      verified: false,
    });

    // Guardar usuario
    user = await newUser.save();

    // Crear token de verificación
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}/users/verify-email/${token.token}`;
    await sendEmail(user.email, "Verifica tu correo electrónico", url);
    // Respuesta
    res.status(201).send({
      message: "Email enviado a tu cuenta. Por favor verifica tu correo.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al registrar nuevo usuario",
      error,
    });
  }
};

//VERIFY EMAIL
export const verifyEmailController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Link inválido" });

      const token = await token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send({ message: "Link inválido" });

      await user.updateOne({_id: user._id, verified: true });
      await token.remove();

      res.status(200).send({
        success: true,  
        message: "Cuenta verificada exitosamente",
      });
  } catch (error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al verificar el correo electrónico",
      error,
    });
  }
};

/* //VERIFY EMAIL
export const verifyEmailController = async (req, res) => {
  try {
    const emailToken = req.params.token;
    if (!emailToken) {
      return res.status(404).send({ message: "Token no encontrado" });
    }

    const user = await userModel.findOne({ emailToken });

    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();

      // Asegúrate de no enviar información sensible
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        isVerified: user.isVerified,
        // No incluir: password, tokens secretos, etc.
      };

      res.status(200).json({
        success: true,
        message: 'Correo verificado exitosamente.',
        user: userData,
      });
    } else {
      res.status(404).send({ message: "Token invalido" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}; */

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validación
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Correo o contraseña incorrectos",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Correo no registrado",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Contraseña incorrecta",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login exitoso",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error en login",
      error,
    });
  }
};

//POST FORGOT PASSWORD
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Correo requerido" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "Nueva contraseña es requerida" });
    }
    //check user
    const user = await userModel.findOne({ email });
    //Validación
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Correo o respuesta incorrecta",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Contraseña actualizada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error en login",
      error,
    });
  }
};

//UPDATE PROFILE
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({
        error: "La contraseña es requerida y debe tener al menos 6 caracteres",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        address: address || user.address,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Perfil actualizado satisfactoriamente 😄",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error en actualizar perfil",
      error,
    });
  }
};

//GET ORDERS
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las ordenes de compra",
      error,
    });
  }
};

//GET todos los pedidos
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener las ordenes de compra",
      error,
    });
  }
};

//UPDATE orden de compra estado
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al actualizar el estado de la orden",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

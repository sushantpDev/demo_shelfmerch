import jwt from 'jsonwebtoken';
import axios from 'axios';

export const getToastAuthUrl = (req, res) => {
  const toastUrl = process.env.TOAST_API_URL || 'http://localhost:5001';
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5175';
  const url = `${toastUrl}/authorize?redirect=${clientUrl}/sso-callback`;
  res.json({ url });
};

export const handleToastCallback = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const response = await axios.post(`${process.env.TOAST_API_URL}/api/auth/login`, {
      email,
      password
    });

    const { _id, name, email: userEmail, token: toastToken, isAdmin } = response.data;
    
    const token = jwt.sign({ _id, name, email: userEmail, toastToken, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('shelfmerch_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ _id, name, email: userEmail, isAdmin });
  } catch (error) {
    res.status(401).json({ message: error.response?.data?.message || 'Authentication failed' });
  }
};

export const logout = (req, res) => {
  res.cookie('shelfmerch_token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: 'Logged out successfully' });
};

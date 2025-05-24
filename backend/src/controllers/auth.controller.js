import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists, please use a different email' });
    }

    const indx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${indx}.png`;

    const newUser = new User({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    await newUser.save();

  // TODO: CREATE THE USER IN STREAM AS WELL
   try {
    await upsertStreamUser({
    id:newUser._id,
    name: newUser.fullName,
    Image: newUser.profilePic || "",
   })
   console.log(`Stream user created for ${newUser.fullName}`);
   

   } catch (error) {
    console.log(`Error creating stream user for ${newUser.fullName}: ${error}`);
    
   }

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export async function login(req, res) {
  try {
       const { email,password} = req.body;
        if (!email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({email});
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });

  }

  const isPasswordCorrect = await user.matchPassword(password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

     const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      success: true,
      user
    });




}catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
    
  }
}

export async function logout(req, res) {
  res.clearCookie("jwt")
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;
    const { fullName,bio,location,learningLanguage,nativeLanguage} = req.body;
    if (!fullName || !bio || !location || !learningLanguage || !nativeLanguage) {
      return res.status(400).json({ message: 'All fields are required' , 
      missingFields:{
        fullName: !fullName,
        bio: !bio,
        location: !location,
        learningLanguage: !learningLanguage,
        nativeLanguage: !nativeLanguage,
      }

       });
    }
    const updatedUser= await User.findByIdAndUpdate(userId, {
      ...req.body,
      isOnboarded: true,
    },
    { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
/////// TODO: UPDATE THE USER IN STREAM AS WELL

    res.status(200).json({
      success: true,
      message: 'User onboarded successfully'
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
    
  }
}
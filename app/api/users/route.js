import {getToken} from "next-auth/jwt";
import Prompt from "@models/prompt";
import {connectToDB} from "@utils/database";
import User from "@models/user";
import {getType} from '@node_modules/@reduxjs/toolkit';

export const PATCH = async (req, res) => {
  try {
    const token = await getToken({req});

    if (token) {
      await connectToDB();
      const body = await req.json();
      const user = await User.findOne({email: token.email});
      user.name = body.name;
      user.username = body.username;
      await user.save();
    }
    else {
      return new Response('Unauthorized request', {status: 401});
    }

    return new Response('Success', {status: 200});
  } catch (error) {
    return new Response(error, {status: 400});
  }
}
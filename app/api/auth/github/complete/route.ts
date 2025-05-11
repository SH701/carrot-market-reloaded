import db from '@/lib/db';
import {
  accessTokenGithub,
  getUserEmailGithub,
  getUserProfileGithub,
} from '@/lib/githubAuth';
import { LoginSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const access_token = await accessTokenGithub(code);

  const { id, avatar_url, login } = await getUserProfileGithub(access_token);
  const emailData = await getUserEmailGithub(access_token);
  const email = emailData.email;

  console.log(email);

  // GitHub ID로 사용자 조회
  const user = await db.user.findUnique({
    where: {
      github_id: id + '',
    },
    select: {
      id: true,
      username: true,
    },
  });

  if (user) {
    return LoginSession(user);
  }

  const findUsername = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      id: true,
    },
  });

  const findEmail = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  if (findEmail) {
    return new NextResponse('Email is already in use.', {
      status: 400,
    });
  }

  const timeStamp = Date.now();

  const newUser = await db.user.create({
    data: {
      username: findUsername ? `${login}${timeStamp}` : login,
      github_id: id + '',
      avatar: avatar_url,
      email,
    },
    select: {
      id: true,
    },
  });

  // 새로 생성된 사용자로 Auth 처리
  return LoginSession(newUser);
}
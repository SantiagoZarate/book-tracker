import { userService } from '@/services/user/user.service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let result;
  try {
    const { username, password } = await request.json();

    result = await userService.register({
      password,
      username,
    });
    return NextResponse.json({ message: 'success', data: result, ok: true });
  } catch (e) {
    console.log({ e });
    return NextResponse.json({ message: e, ok: false });
  }
}

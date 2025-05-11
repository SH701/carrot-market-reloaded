'use server';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import z from 'zod';

const formSchema = z.object({
  title: z
    .string({
      required_error: '제목을 입력해주세요. ',
    })
    .trim(),
  description: z
    .string({
      required_error: '내용을 입력해주세요. ',
    })
    .trim(),
  id: z.coerce.number(),
});

export default async function EditPostAction(
  prevState: unknown,
  formData: FormData
) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    id: formData.get('id'),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    await db.post.update({
      where: {
        id: result.data.id,
      },
      data: {
        title: result.data.title,
        description: result.data.description,
      },
    });
    redirect(`/posts/${result.data.id}`);
  }
}
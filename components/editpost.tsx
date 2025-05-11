'use client';

import Input from './input';
import Button from './button';
import { useFormState } from 'react-dom';
import EditPostAction from '@/app/posts/[id]/edit/actions';


interface IPost {
  post: {
    title: string;
    description?: string | null;
    id: number;
  };
}

export default function EditPostComponent({ post }: IPost) {
  const [state, action] = useFormState(EditPostAction, null);

  return (
    <div>
      <form className="flex flex-col gap-4" action={action}>
        <div className="flex flex-row justify-center items-center gap-2 mb-4">
          <h1 className="text-center text-xl p-2">
            우리 동네 이야기를 다시 작성할게요 😁
          </h1>
        </div>
        <div className="flex gap-2 flex-col">
          <h1>제목을 입력하세요</h1>
          <Input
            type="text"
            name="title"
            errors={state?.fieldErrors?.title}
            required
            defaultValue={post.title}
          />
          <Input
            type="hidden"
            name="id"
            defaultValue={post.id.toString()} 
          />
        </div>
        <div className="flex gap-2 flex-col">
          <h1>내용을 입력하세요</h1>
          <Input
            type="text"
            name="description"
            errors={state?.fieldErrors?.description}
            required
            defaultValue={post.description ?? ''}
          />
        </div>
        <Button text="저장" />
      </form>
    </div>
  );
}
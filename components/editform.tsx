"use client";

import { ProfileEdit } from "@/app/(tabs)/profile/edit/actions";
import { useFormState } from "react-dom";


export default function EditForm() {
  const [state, formAction] = useFormState(ProfileEdit, { error: "" });

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <p>닉네임 변경</p>
        <input
          type="text"
          name="username"
          placeholder="변경할 닉네임을 입력하세요."
          className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        />
        {state?.error && (
          <p className="text-red-500 font-medium">{state.error}</p>
        )}
        <button
          type="submit"
          className="btn h-10 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          수정하기
        </button>
      </div>
    </form>
  );
}

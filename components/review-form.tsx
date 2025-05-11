'use client';

import { useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { formatToWon } from '@/lib/utils';
import Link from 'next/link';
import { ReviewCreate } from '@/app/product/[id]/action';


interface IReviewFormProps {
  product: {
    title: string;
    status: string;
    photo: string;
    price: number;
    id: number;
  };
  username: string;
  userId: number;
  buyerId: number;
  sellerId: number;
}

export default function ReviewForm({
  product,
  username,
  userId, //로그인한 userId
  buyerId,
  sellerId,
}: IReviewFormProps) {
  const userRacting = ['최고에요', '좋아요', '별로에요'];

  const goodRacting = [
    '제가 있는 곳까지 와서 거래했어요',
    '친절하고 매너가 좋아요',
    '시간 약속을 잘 지켜요',
    '응답이 빨라요',
  ];

  const badRacting = [
    '반말을 사용해요',
    '불친절해요.',
    '거래 시간과 장소를 정한 후 연락이 안돼요',
    '약속 장소에 나타나지 않았어요',
    '거래 시간과 장소를 정한 후 거래 직전에 취소했어요',
  ];

  const [selectedUserRating, setSelectedUserRating] = useState('');
  const [selectedDetailRating, setSelectedDetailRating] = useState('');

  const handleUserRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedUserRating(event.target.value);
  };

  const handleDetailRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDetailRating(event.target.value);
  };

  const handleSubmit = async () => {
    const targetUserId = sellerId === userId ? buyerId : sellerId;
    console.log('userId:', userId); // 추가된 로그
    console.log('targetUserId:', targetUserId); // 추가된 로그

    try {
      await ReviewCreate({
        productId: product.id,
        userId: targetUserId,
        userRating: selectedUserRating,
        detailRating: selectedDetailRating,
      });
      // 제출 후 필요한 동작 (예: 알림, 페이지 이동 등)
    } catch (error) {
      console.error('리뷰 제출 중 오류 발생:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black p-5 shadow-lg flex flex-col gap-3 *:text-white">
      <Link href={'/home'}>
        <ChevronLeftIcon className="size-8" />
      </Link>
      <div className="flex flex-row gap-3  bg-neutral-900 w-full pb-2 p-2 rounded-md">
        <div className="relative size-16">
          <Image src={`${product.photo}/public`} alt={product.title} fill />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{product.title}</h1>
          <h2>{formatToWon(product.price)}원</h2>
        </div>
      </div>

      {/* 상대방 ID를 숨겨서 넘김 */}
      <input type="hidden" value={sellerId === userId ? buyerId : sellerId} />

      <div className="text-center flex flex-col gap-2 mt-4">
        <div className="flex flex-row gap-2 justify-center items-center">
          <h1 className="text-2xl">{username}님, 거래는 어떠셨나요?</h1>
          <h1 className="animate-bounce">🏋🏻‍♂️</h1>
        </div>
        <h1>당신의 거래 이야기를 들려주세요 🫶 </h1>
      </div>

      <div className="mb-6 pt-5">
        <label className="block text-lg font-semibold mb-2">
          이용자에 대한 평가:
        </label>
        <div className="flex flex-row items-center gap-4 justify-center">
          {userRacting.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name="userRating"
                value={option}
                onChange={handleUserRatingChange}
                className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
              />
              <span className="text-neutral-300">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedUserRating === '최고에요' || selectedUserRating === '좋아요' ? (
        <div className="mb-6">
          <label className="block text-xl font-semibold mb-4">
            거래하며 좋았던 점을 선택해 주세요.
          </label>
          <div className="flex flex-col space-y-2">
            {goodRacting.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="goodRating"
                  value={option}
                  onChange={handleDetailRatingChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                />
                <span className="text-neutral-300">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ) : selectedUserRating === '별로에요!' ? (
        <div className="mb-6">
          <label className="block text-xl font-semibold mb-4">
            거래하며 불편했던 점을 선택해 주세요.
          </label>
          <div className="flex flex-col space-y-2 ">
            {badRacting.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="badRating"
                  value={option}
                  onChange={handleDetailRatingChange}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                />
                <span className="text-neutral-300">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}

      <button
        className="bg-red-600 w-full rounded-lg h-10"
        onClick={handleSubmit}
      >
        제출
      </button>
    </div>
  );
}
import db from '@/lib/db';
import getSession from '@/lib/session';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { HandThumbDownIcon } from '@heroicons/react/24/solid';
import { notFound } from 'next/navigation';

async function getReview(userId: number) {
  const reviews = await db.review.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      userRating: true,
      detailRating: true,
    },
  });
  return reviews;
}

export default async function Review() {
  const user = await getSession();
  if (!user) {
    return notFound();
  }
  const reviews = await getReview(user.id!);
  if (!reviews) {
    return notFound();
  }

  type UserRating = '최고에요' | '좋아요' | '별로에요';
  type GoodRating =
    | '제가 있는 곳까지 와서 거래했어요'
    | '친절하고 매너가 좋아요'
    | '시간 약속을 잘 지켜요'
    | '응답이 빨라요';

  type BadRating =
    | '반말을 사용해요'
    | '불친절해요.'
    | '거래 시간과 장소를 정한 후 연락이 안돼요'
    | '약속 장소에 나타나지 않았어요'
    | '시간과 장소를 정한 후 거래 직전에 취소했어요';

  const userRatingCount: Record<UserRating, number> = {
    최고에요: 0,
    좋아요: 0,
    별로에요: 0,
  };

  const goodRatingCount: Record<GoodRating, number> = {
    '제가 있는 곳까지 와서 거래했어요': 0,
    '친절하고 매너가 좋아요': 0,
    '시간 약속을 잘 지켜요': 0,
    '응답이 빨라요': 0,
  };

  const badRatingCount: Record<BadRating, number> = {
    '반말을 사용해요': 0,
    '불친절해요.': 0,
    '거래 시간과 장소를 정한 후 연락이 안돼요': 0,
    '약속 장소에 나타나지 않았어요': 0,
    '시간과 장소를 정한 후 거래 직전에 취소했어요': 0,
  };

  reviews.forEach((review) => {
    const rating = review.userRating as UserRating;
    if (rating in userRatingCount) {
      userRatingCount[rating]++;
    }
  });

  reviews.forEach((reviews) => {
    const goodRating = reviews.detailRating as GoodRating;
    if (goodRating in goodRatingCount) {
      goodRatingCount[goodRating]++;
    }
  });

  reviews.forEach((reviews) => {
    const badRating = reviews.detailRating as BadRating;
    if (badRating in badRatingCount) {
      badRatingCount[badRating]++;
    }
  });
  return (
    <>
      <div className="flex flex-col p-6 justify-center items-center gap-4">
        <div className="flex flex-col gap-3 p-5 rounded-lg bg-neutral-600 bg-opacity-90 w-full shadow-md">
          <h1 className="text-center text-3xl font-bold text-white">
            나에 대한 평점은 ?
          </h1>
          <div className="flex flex-row justify-center gap-2 font-semibold text-neutral-600 *:text-sm items-center">
            <p className="bg-green-100 p-2 rounded-full text-sm">
              최고에요: {userRatingCount['최고에요']}
            </p>
            <p className="bg-yellow-100 p-2 rounded-full text-sm">
              좋아요: {userRatingCount['좋아요']}
            </p>
            <p className="bg-red-100 p-2 rounded-full text-sm">
              별로에요: {userRatingCount['별로에요']}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 text-center mt-5">
          <h1 className="text-3xl font-bold text-white">내가 받은 후기들</h1>
          <div className="flex flex-col gap-4 border-b-2 border-neutral-500 border-opacity-30 pb-10">
            <h2 className="text-2xl text-start font-semibold">칭찬의 후기</h2>
            <div className="flex flex-col gap-2">
              {Object.entries(goodRatingCount).map(([key, count]) => (
                <p
                  key={key}
                  className="flex flex-row items-center gap-2 text-gray-200"
                >
                  <HandThumbUpIcon className="w-6 h-6 text-red-500" />
                  {key} : {count}
                </p>
              ))}
            </div>
          </div>
          <h2 className="text-2xl text-start font-semibold">반성의 후기</h2>
          <div className="flex flex-col gap-2">
            {Object.entries(badRatingCount).map(([key, count]) => (
              <p
                key={key}
                className="flex flex-row items-center gap-2 text-gray-200"
              >
                <HandThumbDownIcon className="w-6 h-6 text-red-500" />
                {key} : {count}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
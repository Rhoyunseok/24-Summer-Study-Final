import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IBoard } from "@/interfaces/board";
import axios from "axios";

const MyPage = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 로그인한 사용자의 게시글만 가져오는 함수
    const fetchMyBoards = async () => {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const user = localStorage.getItem("user"); // 사용자 정보 가져오기
      try {
        const response = await axios.get(
          `http://localhost:5000/api/board/mypage/${user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
            },
          }
        );
        setBoards(response.data.data);
      } catch (error) {
        console.error("Failed to fetch my boards:", error);
      }
    };

    fetchMyBoards();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Posts
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Here are your posts.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {boards.map((board) => (
            <article
              key={board.board_id}
              className="flex flex-col items-start justify-between"
            >
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={new Date(board.reg_date).toISOString()}
                    className="text-gray-500"
                  >
                    {new Date(board.reg_date).toLocaleDateString()}
                    <span className="text-gray-600">
                      {" "}
                      조회수: {board.view_count}
                    </span>
                  </time>
                </div>
                <div className="group relative">
                  <h3
                    className={`mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600 ${
                      board.board_type_code === 1
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
                  >
                    <a href={`/board/${board.board_id}`}>
                      <span className="absolute inset-0" />
                      {board.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {board.contents}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;

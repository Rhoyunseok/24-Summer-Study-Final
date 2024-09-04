import { useState, useEffect } from "react";
import { IBoard } from "@/interfaces/board";
import axios from "axios";

const MyPage = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [userName, setUserName] = useState(""); // 사용자 이름 상태

  useEffect(() => {
    const token = localStorage.getItem("token"); // localStorage에서 토큰 가져오기

    if (token) {
      // 사용자가 작성한 게시물 조회
      axios
        .get("http://localhost:5000/api/board/mypage", {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 포함
          },
        })
        .then((response) => {
          setBoards(response.data.data); // 사용자가 작성한 게시물 저장
          setUserName(response.data.userName); // 사용자 이름 저장
        })
        .catch((error) => {
          console.error("Failed to fetch my page data:", error);
        });
    }
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            마이페이지
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {userName}님, 여기에 당신의 게시글이 있습니다.
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

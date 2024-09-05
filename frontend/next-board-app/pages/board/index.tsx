import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IBoard } from "@/interfaces/board";

const Boards = () => {
  const router = useRouter();
  const [boards, setBoards] = useState<IBoard[]>([]);
  useEffect(() => {
    setBoardList();
  }, []);
  async function setBoardList() {
    try {
      const res = await fetch("http://localhost:5000/api/board/list");
      const result = await res.json();
      const sortedBoard = result.data.sort((a: IBoard, b: IBoard) => {
        if (a.board_type_code === 1 && b.board_type_code !== 1) {
          return -1; // a를 상단에 배치
        } else if (a.board_type_code !== 1 && b.board_type_code === 1) {
          return 1; // b를 상단에 배치
        }
        return 0; // 둘 다 같은 board_type_code이면 순서를 유지
      });
      //is_display_code가 1인 게시글만 필터링
      result.data = sortedBoard.filter(
        (board: IBoard) => board.is_display_code === 1
      );
      setBoards(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
          <div className="flex justify-end mt-4">
            <a
              type="button"
              className="rounded-md mr-13 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              href="board/create"
            >
              Generate
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {boards.map((board) => (
            <article
              key={board.board_id}
              className="flex flex-col items-start justify-between"
            >
              {/* <div className="relative w-full">
                <img
                  alt=""
                  src={post.imageUrl}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div> */}
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={new Date(board.reg_date).toISOString()}
                    className="text-gray-500"
                  >
                    {new Date(board.reg_date).toLocaleDateString()}
                    <span className="text-gray-600">
                      조회수: {board.view_count}
                    </span>
                  </time>
                  {/* <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a> */}
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
                <div className="relative mt-8 flex items-center gap-x-4">
                  {/* <img
                    alt=""
                    src={post.author.imageUrl}
                    className="h-10 w-10 rounded-full bg-gray-100"
                  /> */}
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href="">
                        <span className="absolute inset-0" />
                        {board.reg_member_id}
                      </a>
                    </p>
                    <p className="text-gray-600">여기다가 뭐 적어야함?</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Boards;

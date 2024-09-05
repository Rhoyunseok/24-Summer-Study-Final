import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ICreateBoard } from "@/interfaces/board";

const EditBoard = () => {
  const router = useRouter();
  const { id } = router.query;

  const [board, setBoard] = useState<ICreateBoard>({
    title: "",
    contents: "",
    is_display_code: 1,
    board_type_code: 1,
  });

  // 기존 게시글 데이터를 가져오는 함수
  const fetchBoardData = async (boardId: string | string[]) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/board/${boardId}`);
      const result = res.data;
      setBoard({
        title: result.data.title,
        contents: result.data.contents,
        is_display_code: result.data.is_display_code,
        board_type_code: result.data.board_type_code,
      });
    } catch (error) {
      console.error("Failed to fetch board data:", error);
    }
  };

  // 게시글 데이터 불러오기
  useEffect(() => {
    if (id) {
      fetchBoardData(id);
    }
  }, [id]);

  // 게시글 수정 처리
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/board/modify/${id}`,
        board,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        alert("게시글이 수정되었습니다!");
        router.push("/board");
      } else {
        console.error("백엔드 에러 발생", response.data.msg);
      }
    } catch (err) {
      console.error("게시글 수정 중 에러 발생", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleEditSubmit} className="w-full max-w-6xl">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              게시글 수정
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              게시글을 수정합니다.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  글제목
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={board.title}
                      onChange={(e) =>
                        setBoard({ ...board, title: e.target.value })
                      }
                      placeholder="제목을 입력해주세요"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="contents"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  글내용
                </label>
                <div className="mt-2">
                  <textarea
                    id="contents"
                    name="contents"
                    rows={5}
                    value={board.contents}
                    onChange={(e) =>
                      setBoard({ ...board, contents: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="is_display_code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  게시여부
                </label>
                <div className="mt-2">
                  <select
                    id="is_display_code"
                    name="is_display_code"
                    value={board.is_display_code}
                    onChange={(e) =>
                      setBoard({
                        ...board,
                        is_display_code: Number(e.target.value),
                      })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={1}>게시함</option>
                    <option value={0}>게시안함</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="board_type_code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  게시판 유형
                </label>
                <div className="mt-2">
                  <select
                    id="board_type_code"
                    name="board_type_code"
                    value={board.board_type_code}
                    onChange={(e) =>
                      setBoard({
                        ...board,
                        board_type_code: Number(e.target.value),
                      })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={1}>공지</option>
                    <option value={0}>일반</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              router.push("/board");
            }}
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBoard;

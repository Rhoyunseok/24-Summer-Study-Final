//백엔드 RESTFul API 통신을 위한 axios 라이브러리 참조하기
import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/router";
import { ICreateBoard } from "@/interfaces/board";
import { useEffect } from "react";

const BlogCreate = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      router.push("/login");
    }
  }, []);

  const [board, setBoard] = useState<ICreateBoard>({
    title: "",
    contents: "",
    is_display_code: 1,
    board_type_code: 1,
  });

  //신규 게시글 정보 백엔드 api로 전달해서 등록처리 한다.

  const boardsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //form submit 이벤트 취소처리

    //axios 나 fetch() 를 통해 백엔드 RESTFul API 호출하기

    //웹브라우저 로컬스토리지 저장소에서 로그인 사용자 JWT인증 토큰문자열을 조회해온다.
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/board/create",
        board,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("게시글 등록 결과", response);

      if (response.data.code === 200) {
        alert("블로깅이 등록되었습니다!");
        router.push("/board");
      } else {
        console.error("백엔드 에러 발생222", response.data.msg);
      }
    } catch (err) {
      console.error("블로깅 등록 중 에러 발생");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={boardsubmit} className="w-full max-w-6xl">
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              신규 게시글
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              신규 게시글을 작성합니다.
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
                      onChange={(e) => {
                        setBoard({ ...board, title: e.target.value });
                      }}
                      placeholder="제목을 입력해주세요"
                      className="block flex-1 border-0  bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                    onChange={(e) => {
                      setBoard({ ...board, contents: e.target.value });
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="display"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  게시여부
                </label>
                <div className="mt-2">
                  <select
                    id="is_display_code"
                    name="is_display_code"
                    value={board.is_display_code}
                    onChange={(e) => {
                      setBoard({
                        ...board,
                        is_display_code: Number(e.target.value),
                      });
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={0}>게시함</option>
                    <option value={1}>게시안함</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="board-type-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  board-type-code
                </label>
                <div className="mt-2">
                  <select
                    id="board-type-code"
                    name="board-type-code"
                    value={board.is_display_code}
                    onChange={(e) => {
                      setBoard({
                        ...board,
                        is_display_code: Number(e.target.value),
                      });
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={0}>일반</option>
                    <option value={1}>공지</option>
                  </select>
                </div>
              </div>

              {/* <div className="col-span-full">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  첨부파일
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="block border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                  />
                </div>
              </div> */}
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
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;

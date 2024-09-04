import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IDetailBoard } from "@/interfaces/board";

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [board, setBoard] = useState<IDetailBoard>({
    board_id: 0,
    board_type_code: 1,
    title: "",
    contents: "",
    view_count: 0,
    ip_address: "",
    is_display_code: 1,
    reg_date: new Date(),
    reg_member_id: 0,
  });

  // 게시글 데이터와 조회수 업데이트
  useEffect(() => {
    if (id) {
      fetchBoardData(id);
      updateViewCount(id); // 조회수 증가
    }
  }, [id]);

  // 게시글 데이터 가져오는 함수
  const fetchBoardData = async (boardId: string | string[]) => {
    try {
      const res = await fetch(`http://localhost:5000/api/board/${boardId}`);
      const result = await res.json();
      setBoard(result.data); // API에서 받은 데이터를 상태로 설정
    } catch (error) {
      console.error("Failed to fetch board data:", error);
    }
  };

  // 조회수를 증가시키는 함수
  const updateViewCount = async (boardId: string | string[]) => {
    try {
      await fetch(`http://localhost:5000/api/board/${boardId}/view`, {
        method: "PUT", // 조회수 증가를 위한 PUT 요청
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to update view count:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              상세정보 페이지
            </h2>
            <p className="mt-1 text-md leading-6 text-gray-600">
              게시글을 조회합니다.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  글제목
                </label>
                <div className="mt-2">
                  <p className="block w-full py-2 text-xl font-semibold text-gray-900 sm:text-xl sm:leading-6">
                    {board.title}
                  </p>
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  글내용
                </label>
                <div className="mt-2">
                  <p className="block w-full py-2 text-md text-gray-900 sm:text-md sm:leading-6">
                    {board.contents}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  게시여부
                </label>
                <div className="mt-2">
                  <p className="block w-full py-2 text-md text-gray-900 sm:text-md sm:leading-6">
                    {board.is_display_code === 1 ? "게시함" : "게시안함"}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  게시판 유형
                </label>
                <div className="mt-2">
                  <p className="block w-full py-2 text-md text-gray-900 sm:text-md sm:leading-6">
                    {board.board_type_code === 1 ? "공지" : "일반"}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  조회수
                </label>
                <div className="mt-2">
                  <p className="block w-full py-2 text-md text-gray-900 sm:text-md sm:leading-6">
                    {board.view_count}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

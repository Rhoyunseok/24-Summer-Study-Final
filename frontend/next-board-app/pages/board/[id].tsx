import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IDetailBoard } from "@/interfaces/board";
import axios from "axios";

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

  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null); // 로그인한 사용자 ID

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // 서버로부터 로그인 사용자 정보 및 게시글 정보를 가져옴
      axios
        .get("http://localhost:5000/api/board/mypage", {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
          },
        })
        .then((response) => {
          console.log("사용자 아이디:", response.data.userId); // 로그로 확인
          setLoggedInUserId(response.data.userId); // 서버에서 받은 사용자 ID 저장
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
    }
  }, []);

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

  // 게시글 삭제 함수
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/board/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
        },
      });
      alert("게시글이 삭제되었습니다.");
      router.push("/board"); // 삭제 후 게시판 목록으로 이동
    } catch (error) {
      console.error("Failed to delete board:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  // 게시글 수정 함수
  const handleEdit = () => {
    router.push(`/board/modify/${id}`); // 수정 페이지로 이동
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-12">
          <div className="border-b border-gray-300 pb-6">
            <h2 className="text-3xl font-bold leading-7 text-gray-900 mb-4">
              {board.title}
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="col-span-full sm:col-span-6">
                <label className="block text-md font-medium leading-6 text-gray-900">
                  글내용
                </label>
                <div className="mt-2">
                  <p className="block w-full text-lg text-gray-900">
                    {board.contents}
                  </p>
                </div>
              </div>

              <div className="col-span-full sm:col-span-3">
                <div className="flex items-center space-x-2">
                  <span className="block text-lg font-medium leading-6 text-gray-900">
                    게시판 유형:
                  </span>
                  <span className="block text-lg text-indigo-500 font-semibold">
                    {board.board_type_code === 1 ? "공지" : "일반"}
                  </span>
                </div>
              </div>

              <div className="col-span-full sm:col-span-3">
                <div className="flex items-center space-x-2">
                  <span className="block text-lg font-medium leading-6 text-gray-900">
                    게시여부:
                  </span>
                  <span
                    className={`block text-lg font-semibold ${
                      board.is_display_code === 1
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {board.is_display_code === 1 ? "게시함" : "게시안함"}
                  </span>
                </div>
              </div>

              <div className="col-span-full sm:col-span-3">
                <div className="flex items-center space-x-2">
                  <span className="block text-lg font-medium leading-6 text-gray-900">
                    조회수:
                  </span>
                  <span className="block text-lg font-semibold text-blue-600">
                    {board.view_count}
                  </span>
                </div>
              </div>

              <div className="col-span-full sm:col-span-3">
                <div className="flex items-center space-x-2">
                  <span className="block text-lg font-medium leading-6 text-gray-900">
                    등록일:
                  </span>
                  <span className="block text-lg font-semibold text-gray-600">
                    {new Date(board.reg_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 수정 및 삭제 버튼은 로그인한 사용자와 게시글 작성자가 동일할 때만 보이게 함 */}
          {loggedInUserId === board.reg_member_id && (
            <div className="mt-6 flex justify-between">
              <button
                className="text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                onClick={handleEdit}
              >
                수정하기
              </button>
              <button
                className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                onClick={handleDelete}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

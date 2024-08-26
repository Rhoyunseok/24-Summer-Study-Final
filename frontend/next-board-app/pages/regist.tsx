import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { IEntryMember } from "@/interfaces/member";

const Regist = () => {
  const router = useRouter();
  const [member, setMember] = useState<IEntryMember>({
    email: "",
    password: "",
    name: "",
    user_role_code: 0,
    user_state_code: 0,
  });
  //사용자 입력요소의 값이 변경될때마다 데이터 소스와 동기화 처리해주는 이벤트 처리 함수
  const memberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMember({
      ...member, //기존 member 객체내용을 복사해서 가져온다.
      [e.target.name]: e.target.value, //name 은 속성값 -> name ="???" 에서 name 을 의미한다.
    });
    console.log(member);
  };

  const registSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Form Submit 이벤트가 호출되면 화면을 리프레시하는 기능이 작동되므로, 이를 방지하기 위해 이벤트를 취소합니다.
    e.preventDefault();
    console.log(member);
    try {
      const response = await fetch("http://localhost:5000/api/member/entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      });
      const result = await response.json();
      if (result.code == 200) {
        alert("회원가입이 완료되었습니다.");
        router.push("/login");
      } else {
        console.log("백엔드 서버 에러");
        if (result.msg == "이미 가입된 회원입니다.") {
          alert("이미 가입된 회원입니다.");
        }
        console.log(result.msg);
      }
    } catch (err) {
      console.log("회원가입 에러발생", err);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Regist your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* 신규 회원가입  폼영역 */}
          <form className="space-y-6" onSubmit={registSubmit}>
            {/* onSubmit={registSubmit} */}
            {/* 메일주소 입력요소 영역 */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={member.email}
                  onChange={memberChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 사용자 암호 입력요소 영역 */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={member.password}
                  onChange={memberChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 사용자 이름 입력요소 영역 */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={member.name}
                  onChange={memberChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* user_role_code */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  사용자 역할
                </label>
              </div>
              <div className="mt-2">
                <select
                  id="user_role_code"
                  name="user_role_code"
                  value={member.user_role_code}
                  onChange={memberChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={0}>관리자</option>
                  <option value={1}>슈퍼사용자</option>
                  <option value={2}>일반사용자</option>
                </select>
              </div>
            </div>

            {/* 사용자 상태 코드 */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  사용자 상태
                </label>
              </div>
              <div className="mt-2">
                <select
                  id="user_state_code"
                  name="user_state_code"
                  value={member.user_state_code}
                  onChange={memberChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={0}>허용대기</option>
                  <option value={1}>사용중</option>
                  <option value={2}>탈퇴처리</option>
                </select>
              </div>
            </div>

            {/* 회원가입 버튼 표시영역 */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Regist
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Regist;

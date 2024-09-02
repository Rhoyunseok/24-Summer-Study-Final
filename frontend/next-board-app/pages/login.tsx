import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "@/library/globalContext";

const Login = () => {
  const router = useRouter();
  const { globalData, setGlobalData } = useContext(GlobalContext);
  const [member, setMember] = useState({
    email: "",
    password: "",
  });

  const memberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //백엔드 login restful api 호출하기
    //fetch() 함수를 통해 데이터를 백엔드로 전달할 때는 반드시 json 문자열 형태로 전달합니다.
    try {
      const response = await fetch("http://localhost:5000/api/member/login", {
        method: "POST",
        body: JSON.stringify(member),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.code === 200) {
        console.log("로그인성공", result);

        localStorage.setItem("token", result.data.token);

        setGlobalData(result.data.member);
        router.push("/"); //로그인 성공시 메인페이지로 이동처리
      } else {
        if (result.code === 400 && result.msg === "NotExistEmail") {
          alert("등록된 사용자가 없습니다. 회원가입을 진행해주세요.");
          return false;
        }
        if (result.code === 400 && result.msg === "InCorrectPasword") {
          alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
          return false;
        }
        if (result.code === 500) {
          alert("서버에서 에러가 발생했습니다. 잠시후 다시 시도해주세요.");
          return false;
        }
      }
    } catch (err) {
      console.error("백엔드 API 호출 에러 발생", err);
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* 로그인 화면 영역 */}
          <form className="space-y-6" onSubmit={loginSubmit}>
            {/*onSubmit={loginSubmit}*/}
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
                <div className="text-sm">
                  <a
                    href="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
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
            {/* 로그인 버튼 */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

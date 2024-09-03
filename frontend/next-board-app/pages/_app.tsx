//NextJSApp 전역 스타일  파일 참조하기
import "@/styles/globals.css";

// Next.js에서 제공하는 AppProps 타입을 불러옵니다.
import type { AppProps } from "next/app";

//전역상태관리 프로바이더 컴포넌트 참조하기
// import GlobalProvider from '@/library/globalContext';

//개발자 정의 컴포넌트 참조하기
import MainLayout from "@/components/main-layout";
// import NoneLayout from '@/components/none-layout';
// import MyPageLayout from '@/components/mypage-layout';

import { useRouter } from "next/router";

// import Header from '@/components/header';
// import Container from '@/components/container';
// import Footer from '@/components/footer';

//App 함수는 컴포넌트와 pageProps를 인자로 받아서 JSX를 반환합니다.
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const currentPath: string = router.pathname;
  console.log("currentPath:", currentPath);

  let layoutMode: string = "general";
  if (currentPath === "/login" || currentPath === "/regist") {
    layoutMode = "auth";
  } else {
    layoutMode = "general";
  }

  console.log("layoutMode:", layoutMode);

  const renderLayoutOnPath = () => {
    switch (layoutMode) {
      case "auth":
        return <Component {...pageProps} />;
      default:
        return (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        );
    }
  };

  return renderLayoutOnPath();
}

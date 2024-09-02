import { createContext, ReactNode, useState } from "react";

//전역 데이터 타입 참조
import { IGlobalData, ILoginMember, role, state } from "@/interfaces/global";

export const GlobalContext = createContext({
  globalData: {
    token: "",
    member: {
      member_id: 0,
      name: "",
      email: "",
      user_role_code: role.user,
      user_state_code: state.use,
    } as ILoginMember,
  },
  setGlobalData: (data: IGlobalData) => {},
});

type Props = { children: ReactNode };

export default function GlobalProvider({ children }: Props) {
  const [globalData, setGlobalData] = useState<IGlobalData>({
    token: "",
    member: {
      member_id: 0,
      name: "",
      email: "",
      user_role_code: role.user, // 기본값을 `role.user`로 설정
      user_state_code: state.use, // 기본값을 `state.wait`로 설정
    },
  });

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
}

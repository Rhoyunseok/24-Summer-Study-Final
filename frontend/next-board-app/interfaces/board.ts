// IBoard 인터페이스: 데이터베이스에서 가져온 게시글 데이터의 구조를 정의합니다.
export interface IBoard {
  board_id: number; // 게시글 고유번호
  board_type_code: number; // 게시판 유형 코드 (1: 공지사항 게시판, 2: 일반 사용자 게시판)
  title: string; // 글제목
  contents: string; // 글내용
  view_count: number; // 조회수
  ip_address: string; // 작성자 IP 주소
  is_display_code: number; // 게시 여부 (0: 게시안함, 1: 게시함)
  reg_date: Date; // 등록일시
  reg_member_id: number; // 등록자 고유번호
}

// ICreateBoard 인터페이스: 새로운 게시글을 생성하기 위해 필요한 데이터를 정의합니다.
export interface ICreateBoard {
  board_type_code: number; // 게시판 유형 코드 (1: 공지사항 게시판, 2: 일반 사용자 게시판)
  title: string; // 글제목
  contents: string; // 글내용
  is_display_code: number; // 게시 여부 (0: 게시안함, 1: 게시함)
  // optional fields
  view_count?: number; // 조회수 (초기값: 0으로 설정할 수 있음)
  ip_address?: string; // 작성자 IP 주소 (서버에서 자동 설정될 수 있음)
  reg_member_id?: number; // 등록자 고유번호 (토큰을 통해 서버에서 설정)
}

export interface IDetailBoard {
  board_id: number; // 게시글 고유번호
  board_type_code: number; // 게시판 유형 코드 (1: 공지사항 게시판, 2: 일반 사용자 게시판)
  title: string; // 글제목
  contents: string; // 글내용
  view_count: number; // 조회수
  ip_address: string; // 작성자 IP 주소
  is_display_code: number; // 게시 여부 (0: 게시안함, 1: 게시함)
  reg_date: Date; // 등록일시
  reg_member_id: number; // 등록자 고유번호
}

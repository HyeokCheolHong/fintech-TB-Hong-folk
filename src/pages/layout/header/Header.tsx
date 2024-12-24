import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { S, A } from "./style";
import VerticalDivider from "../../../components/divider/VerticalDivider";
import { useCookies } from "react-cookie";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  // 리덕스 불러오는 코드

  const [cookies, setCookie, removeCookie] = useCookies<string>(["userID"]); // 쿠키 가져오기
  const navigate = useNavigate(); // 리다이렉션을 위한 navigate 훅 사용
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [SearchVisible, setSearchVisible] = useState(false);
  const toggleSearchBar = () => {
    setSearchVisible(!SearchVisible);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직 추가
    console.log("로그아웃되었습니다.");
    alert("로그아웃되었습니다.");
    removeCookie("userID");
    navigate("/beforeLogin");
    // 페이지 세로고침
    window.location.reload();
  };

  const handleCheckLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    // 쿠키에 userID가 없으면 로그인 페이지로 리다이렉션
    if (!cookies.userID) {
      alert("로그인 필요");
      navigate("/login");
    } else {
      // 로그인 상태가 확인되면 원하는 페이지로 이동
      const targetUrl = event.currentTarget.getAttribute("href");
      navigate(targetUrl as string); // 페이지 이동
    }
  }; // 쿠키와 navigate가 변경될 때마다 실행

  const redirectToMain = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    if (!cookies.userID) {
      navigate("/beforeLogin");
    } else {
      navigate("/main");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.HeaderContainer>
      <S.HeaderWelcome>
        {cookies.userID
          ? `${cookies.userID}님 환영합니다.`
          : "Welcome to MesBiens"}
        {cookies.userID && ( // 쿠키가 있을 때만 로그아웃 버튼 표시
          <S.LogoutBtn onClick={handleLogout}>로그아웃</S.LogoutBtn>
        )}
      </S.HeaderWelcome>

      <S.SearchContainer>
        {/* {SearchVisible && ( */}
        <S.SearchBarContainer>
          <S.SearchInput type="text" placeholder="Search.." />
          {/* )} */}
          <S.SearchImg
            src={`${process.env.PUBLIC_URL}/images/search.svg`}
            alt="Search"
            onClick={toggleSearchBar}
          />
        </S.SearchBarContainer>

        <S.LoginSignupContainer>
          <VerticalDivider style={{ height: "30px" }} />
          <S.Button onClick={handleCheckLogin} href="/myPage">
            MYPAGE
          </S.Button>
          <VerticalDivider style={{ height: "30px" }} />
          <S.Button onClick={redirectToMain}>HOME</S.Button>
          {/* <VerticalDivider />
          <Link to="/login">
            <PlainButton>로그인</PlainButton>
          </Link>
          <VerticalDivider />
          <Link to="/signup">
            <PlainButton>회원가입</PlainButton>
          </Link> */}
        </S.LoginSignupContainer>
        {cookies.userID && (
          <S.img
            src={`${process.env.PUBLIC_URL}/images/bell.svg`}
            onClick={handleOpenModal}
          />
        )}
        {isModalOpen && (
          <>
            <A.Overlay onClick={handleCloseModal} />
            <A.Modal className={isModalOpen ? "open" : ""}>
              {/* 알림 */}
              <A.NotiBox>
                <A.NotiHead>
                  <p>
                    <strong>입금</strong>
                  </p>
                  <A.NotiTime>2024-11-07 16:29:31</A.NotiTime>
                </A.NotiHead>
                <p>
                  민지님이 <strong>10,000원</strong>을 입금하셨습니다
                  <span className="balance"> 잔액 10,001원</span>
                </p>
              </A.NotiBox>
              {/*댓글 알림*/}
              <A.NotiBox>
                <A.NotiHead>
                  <p>
                    <strong>댓글</strong>
                  </p>
                  <A.NotiTime>2024-11-07 16:29:31</A.NotiTime>
                </A.NotiHead>
                <p>
                  <A.NotiLink href="./board_post.html">
                    ***님이 댓글에 <strong>좋아요</strong>를 눌렀습니다.
                  </A.NotiLink>
                </p>
              </A.NotiBox>
            </A.Modal>
          </>
        )}
      </S.SearchContainer>
    </S.HeaderContainer>
  );
};

export default Header;
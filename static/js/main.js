$(document).ready(function () {
  // header, footer, nav-bar 불러오기
  $("#header").load("/header.html");
  $("#footer").load("/footer.html");
  $("#nav-bar").load("/nav-bar.html");
});

$("#find-friends-btn").click(function () {
    window.location.href = "/article/post_article.html";
  });

function me() {
  // payload에서 유저아이디 얻기
  let payload = localStorage.getItem("payload");
  
  // 로그인 정보가 없을 경우 false 반환
  if (!payload) {
    isLoggedIn = false;
    userData = null;

    return [isLoggedIn, userData];
  }
  
  let plObj = JSON.parse(payload)
  let user_id = plObj["user_id"];
  let token = localStorage.getItem("access");

  // 유저프로필 정보 받아오기
  $.ajax({
    type: "GET",
    url: `http://127.0.0.1:8000/user/profile/${user_id}`,
    async: false,
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    success: function (response) {
      isLoggedIn = true;
      userData = response;
    },
    error: function (error) {
      isLoggedIn = false;
      userData = null;
    }
  });
  return [isLoggedIn, userData];
}

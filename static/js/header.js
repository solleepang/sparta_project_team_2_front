$(document).ready(function () {
    // 로그인 되어 있는지 확인 
    const [isLoggedIn, userData] = me();

    // 로그인 여부에 따라 버튼을 보여주거나 숨깁니다.
    if (isLoggedIn) {
        $("#login-btn").hide();
        $("#signup-btn").hide();
        $("#logout-btn").show();
        $("#my-page").show();
        $("#hello").show();
        $("#username").text(`${userData.username}`);
    }
});

  // 로그아웃 버튼이 눌렸을 때의 동작입니다.
$("#logout-btn").click(function () {
    // localStorage에 저장된 토큰을 삭제합니다.
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    window.location.href = "/";
});

function toMypage() {
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    const user_id = payload_parse.user_id

    const my_page = document.getElementById('my-page')
    window.location.href = `http://127.0.0.1:5500//user/mypage.html?user_id=${user_id}`

}

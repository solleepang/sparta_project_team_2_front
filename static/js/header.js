$(document).ready(function () {
    // const [isLoggedIn, userData] = me();
    const isLoggedIn = false;
    // 로그인 여부에 따라 버튼을 보여주거나 숨깁니다.
    if (isLoggedIn) {
        $("#login-btn").hide();
        $("#signup-btn").hide();
        $("#logout-btn").show();
        $("#my-page").show();
        // $("#username").text(`${userData.username}님 환영합니다.`);
    }
});
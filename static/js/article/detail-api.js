window.onload = () => {
  // url에서 article_id 가져오기 
  const urlParams = new URLSearchParams(window.location.search);
  const articleID = urlParams.get("articleID");
  showDetailArticle(articleID);
};

async function showDetailArticle(articleID) {
    // 특정 article 정보 요청
    const response = await fetch(`http://127.0.0.1:8000/article/${articleID}/`, {
        method: "GET",
    });

    const response_json = await response.json();

    $("#store_name").text(response_json.store_name);
    $("#title").text(response_json.title);
    $("#content").text(response_json.content);
    $("#author").text(response_json.username);
    $("#friends-number").text(response_json.member_count + "/" + response_json.friends_number);
    $("#latitude").val(response_json.latitude);
    $("#longitude").val(response_json.longitude);

    makeMarker()

    const [isLoggedIn, userData] = me();
    const friend_names = response_json.friend_names;

    if (friend_names) {
        let friend_list = "";

        friend_names.forEach((element) => {
            friend_list += `<div class="card-text" > - ${element}</div>`;
            $("#friend-list").html(friend_list);
            // 밥친구 명단에 로그인한 사용자가 있으면 밥친구 신청 버튼 숨기기
            if (element === userData.username){
                $("#friend-btn").hide();
            };
        });               
    }
    // 로그인 한 사용자와 작성자가 같으면 수정/삭제 버튼 보이게 
    if (isLoggedIn && userData.username === response_json.username) {
        $("#friend-btn").hide();
        $("#edit-btn").show();
        $("#del-btn").show();
    }
    // 로그인 안 했을 경우 버튼 숨기기
    if (!isLoggedIn){
        $("#friend-btn").hide();
    }
}

function makeMarker() {
    // 수정 안되고 위치가 보이기만 하는 지도 생성
    var latitude =  $("#latitude").val();
    var longitude = $("#longitude").val();
    
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
}

$("#del-btn").click(function () {
    // 삭제하기 버튼 클릭시
    const urlParams = new URLSearchParams(window.location.search);
    const articleID = urlParams.get("articleID");
    deleteArticle(articleID)
});

$("#edit-btn").click(function () {
    // 수정하기 버튼 클릭 시 작동 - 수정 모달 placeholder 추가 
    let form_title = document.getElementById('modal-form-title');
    let form_content = document.getElementById('modal-form-content');
    form_title.placeholder = document.getElementById('title').innerText;
    form_content.placeholder = document.getElementById('content').innerText;
});

$("#friend-btn").click(function () {
    // 밥친구 신청 버튼 클릭
    const urlParams = new URLSearchParams(window.location.search);
    const articleID = urlParams.get("articleID");
    let editData = []
    putArticle(articleID, editData)
});

async function deleteArticle(articleID) {
  // 게시글 지우기
  let token = localStorage.getItem("access");

  const response = await fetch(`http://127.0.0.1:8000/article/${articleID}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  location.href = "/";
}

async function putArticle(articleID , editData) {
    // 게시글 수정하기
    // 로그인 토큰 가져오기
    let token = localStorage.getItem("access");

    // 작성자와 수정자가 같을 경우 = 게시글 수정
    // 작성자와 수정자가 다를 경우 = 밥친구 신청
    const response = await fetch(`http://127.0.0.1:8000/article/${articleID}/`, {
        headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify(editData),
    });

    location.reload();
}

$(document).ready(function () {
    // detail_atricle 에서 modal의 submit 버튼 클릭시 작동
    $("#edit-form").submit(function (e) {
        e.preventDefault();
        let editData = {
            title: $("#modal-form-title").val(),
            content: $("#modal-form-content").val(),
        };

        const urlParams = new URLSearchParams(window.location.search);
        const articleID = urlParams.get("articleID");
        putArticle(articleID, editData)
    });
});

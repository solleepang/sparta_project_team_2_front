window.onload = () => {
  console.log("상세 페이지 로딩");
  
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
    console.log(response_json);

    $("#store_name").text(response_json.store_name);
    $("#title").text(response_json.title);
    $("#content").text(response_json.content);
    $("#author").text(response_json.username);
    $("#latitude").val(response_json.latitude);
    $("#longitude").val(response_json.longitude);

    makeMarker()
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

$(document).ready(function () {
    // const [isAuthor, authorData] = checkWho();
    const isAuthor = false;
    // 로그인유저가 작성자와 같다면 수정/삭제버튼, 다르다면 밥친구 신청 버튼만 보여줌
    if (isAuthor) {
        $("#friend-btn").hide();
        $("#edit-btn").show();
        $("#del-btn").show();
    }
});
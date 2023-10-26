window.onload = () => {
  getArticle();
  const store_name_input = document.getElementById("store_name")
  // 맛집 추천 지도에서 팝업의 버튼으로 들어온 경우 가게명이 들어가도록 로컬스토리지에 저장된 식당명을 가게명 input에 넣는다.
  if (localStorage.getItem("restaurant_name")) {
    const recommend_name = localStorage.getItem("restaurant_name")
    store_name_input.setAttribute("value",`${recommend_name}`)
  }
  window.localStorage.removeItem('restaurant_name') // 로컬스토리지에 있는 restaurant_name이라는 key의 value를 삭제한다.
  // 오류: 검색 결과 없을 때 alert(검색결과가 없습니다)가 뜨고 또 다른 조치를 못 취함. input값에 넣어놓기만 한 상태.
};

async function getArticle() {
  // 게시글 정보 가져오기 
  const response = await fetch("http://127.0.0.1:8000/article/", {
    method: "GET",
  });

  const response_json = await response.json();

  // 게시글 정보 보여주기
  const articles = document.getElementById("articles");
  let html = "";

  response_json.forEach((element) => {
    html += `<div id="article" class="card mb-3" onclick="getDetailArticle(${element.id})">
                <div id="${element.id}" class="card-body">
                  <h6 id="store_name" class="card-title">${element.store_name}</h6>
                  <h5 id="title" class="card-title">${element.title}</h5>
                  <p id="content" class="card-text">${element.content}</p>
                  <p id="friends" class="card-text" style="font-size: 14px;">모집 현황: <span id="friends-number">${element.member_count} / ${element.friends_number}</span></p>
                  <p id="author" class="card-text" style="text-align: right">${element.username}</p>
                </div>
              </div>`;

    $("#articles").html(html);
  });
}

async function getDetailArticle(articleID) {
  // 특정 게시글 상세 페이지로 이동
  window.location.href = `/article/detail_article.html?articleID=${articleID}`;
}

async function postArticle() {
  // 게시글 생성하기
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const store_name = document.getElementById("store_name").value;
  const latitudeField = document.getElementById("latitudeField").value;
  const longitudeField = document.getElementById("longitudeField").value;

  // 로그인 토큰 가져오기
  let token = localStorage.getItem("access");

  const response = await fetch("http://127.0.0.1:8000/article/", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      title: title,
      content: content,
      store_name: store_name,
      latitudeField: latitudeField,
      longitudeField: longitudeField,
    }),
  });
}

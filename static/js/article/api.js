window.onload = () => {
  console.log("로딩");
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

  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4MjI1MjY2LCJpYXQiOjE2OTgyMjQ5NjYsImp0aSI6IjhjMDNjZTZhZWI4ODRkZGJiODhjNTI1ODQ5YjA0NzBmIiwidXNlcl9pZCI6MiwiZW1haWwiOiJvcmVvMDEyNEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Im9yZW8iLCJpbWFnZSI6Ii9tZWRpYS9zdGF0aWMvZGVmYXVsdF9pbWFnZS5qcGVnIn0.fqfd-bYV6luPh5t9piYQr0vUMH37JK1v846a15x_Zao";
  localStorage.setItem("token", token);

  const response_json = await response.json();
  console.log(response_json);

  // 게시글 정보 보여주기
  const articles = document.getElementById("articles");

  response_json.forEach((element) => {
    const article = document.createElement("div");
    const title = document.createElement("h3");
    const content = document.createElement("div");
    const store_name = document.createElement("div");
    const button = document.createElement("button");
    const button2 = document.createElement("button");

    article.id = element.id;
    title.innerText = element.title;
    title.id = "title";
    content.innerText = element.content;
    content.id = "content";
    store_name.innerText = element.store_name;
    button.innerText = "X";
    button2.innerText = "수정";

    button.addEventListener("click", e => {
      deleteArticle(e);
    });

    button2.addEventListener("click", (e) => {
      putArticle(e);
    });

    article.append(title, content, store_name, button, button2);
    articles.appendChild(article);
  
  });
}

async function postArticle() {
  // 게시글 생성하기
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const store_name = document.getElementById("store_name").value;
  const latitudeField = document.getElementById("latitudeField").value;
  const longitudeField = document.getElementById("longitudeField").value;

  // 로그인 토큰 가져오기
  let token = localStorage.getItem("token");

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
  const response_json = await response.json();
  console.log(response_json);
}

async function putArticle(e) {
  // 게시글 수정하기
  // 로그인 토큰 가져오기
  let token = localStorage.getItem("token");

  target_id = e.target.parentElement.id;
  console.log(target_id);

  const response = await fetch(`http://127.0.0.1:8000/article/${target_id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const response_json = await response.json();
  console.log(response_json);
  // 작성자와 수정자가 같을 경우 = 게시글 수정
  // 작성자와 수정자가 다를 경우 = 밥친구 신청
}

async function deleteArticle(e) {
  // 게시글 지우기
  target = e.target.parentElement;
  console.log(target);

  title = target.children.title.innerText;
  content = target.children.content.innerText;
  console.log(title, content);

  // 로그인 토큰 가져오기
  let token = localStorage.getItem("token");

  const response = await fetch(`http://127.0.0.1:8000/article/${target.id}/`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  console.log(response);
}
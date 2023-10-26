console.log('hi!')

window.onload = function () {
  // loadDistanceOrder()
}

// json 파일 읽는 함수
async function printJSON(file_path) {
  const response = await fetch(file_path);
  const json = await response.json();
  // console.log(json);
  return json
}

// 리스트 정렬하는 함수
function read_list(list_json) {
  const restaurant_list = document.getElementById(('card_list'))
  for (var r in list_json) {
    const restaurant = list_json[r]
    console.log(restaurant)

    // 리스트에 속성 추가
    const restaurant_article = document.createElement('article')
    restaurant_article.setAttribute("class", "card")
    const restaurant_card = document.createElement('div')
    restaurant_card.setAttribute("class", "card__content | flow")
    const restaurant_card_container = document.createElement('div')
    restaurant_card_container.setAttribute("class", "card__content--container | flow")
    const restaurant_name = document.createElement('h2')
    restaurant_name.setAttribute("class", "card__title")
    const restaurant_score = document.createElement('p')
    const restaurant_review = document.createElement('p')
    const restaurant_contact = document.createElement('p')
    const restaurant_address = document.createElement('p')


    restaurant_name.innerText = restaurant.name
    restaurant_score.innerText = `평점: ${restaurant.score}`
    restaurant_review.innerText = `리뷰개수: ${restaurant.review}`
    restaurant_address.innerText = `주소: ${restaurant.address}`
    restaurant_contact.innerText = restaurant.contact

    restaurant_article.appendChild(restaurant_card)
    restaurant_card.appendChild(restaurant_card_container)
    restaurant_card_container.appendChild(restaurant_name)
    restaurant_card_container.appendChild(restaurant_score)
    restaurant_score.appendChild(restaurant_review)
    restaurant_score.appendChild(restaurant_address)
    restaurant_score.appendChild(restaurant_contact)

    restaurant_list.appendChild(restaurant_article)
  }
}


// 정렬 옵션에 따라서 그에 맞는 리스트 정렬 함수 실행
async function handleOrderSelect() {
  const checked_option = document.querySelector('#order-by > option:checked').value
  console.log(checked_option)

  if (checked_option == "review") { // loadReviewOrder라는 함수로 따로 정의했지만, 코드가 짧아서 handleOrderSelect 함수에 편입과 async 함수로 변경.
    const list_review_json = await printJSON("static/data/df_review.json");
    read_list(list_review_json)
  }
  else if (checked_option == "score") {
    const list_score_json = await printJSON("static/data/df_score.json");
    read_list(list_score_json)
  }
  else {
    loadDistanceOrder()
  }
}


// 정렬 옵션 - 거리순
async function loadDistanceOrder() {
  // console.log('order by distance 함수 실행')
  const list_json = await printJSON("static/data/df.json");
  console.log(list_json)
  //거리계산함수
  function getDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 } //킬로미터 계산
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }


  //현위치 불러와서 거리비교 하는 함수 (html5 Geolocation API 사용)
  navigator.geolocation.getCurrentPosition((position) => {
    const live_lat = position.coords.latitude;
    const live_lon = position.coords.longitude;

    console.log(live_lat, live_lon);
    //내 현 위치를 console로 확인할 수 있다.

    for (let i = 0; i < list_json.length; i++) {
      const lat = list_json[i].lat
      const lon = list_json[i].lon
      distance = getDistance(live_lat, live_lon, lat, lon, "K")
      list_json[i]['distance'] = distance;
    }
    //더미 데이터의 길이만큼 거리계산을 반복하는데, K가 인자로 들어가 킬로미터 단위로 계산한다
    //더미 데이터가 든 사전에는 distance라는 키와 값이 추가가 된다.

    // distance라는 필드를 기준으로 오름차순 정렬
    let list_distance_order = list_json.sort(function (a, b) {
      if (a.distance > b.distance) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0
    });

    read_list(list_distance_order)
  });


}



// 카테고리 옵션에 따라서 리스트 정렬 함수에 json 파일을 넣어서 실행
function handleCateSelect() {
  const checked_cate = document.querySelector('#cate-select > option:checked').value
  // console.log(checked_cate)

  if (checked_cate == "한식") {
    loadCate("static/data/df_kr.json")
  }
  else if (checked_cate == "중식") {
    loadCate("static/data/df_chinese.json")
  }
  else if (checked_cate == "일식") {
    loadCate("static/data/df_japanese.json")
  }
  else if (checked_cate == "카페") {
    loadCate("static/data/df_cafe.json")
  }
  else if (checked_cate == "양식") {
    loadCate("static/data/df_western.json")
  }
  else {
    alert("해당 분류의 식당이 존재하지 않습니다.")
  }
}

//카테고리 정렬 함수
async function loadCate(x) {
  const Category = await printJSON(x);
  read_list(Category)
}


// 지도에 있는 마커 속 버튼을 누르면 식당명 데이터를 가지고 article 작성 페이지로 넘어가는 함수
// 현재 저장된 html 파일엔 없고, folium에서 수정해서 html 파일로 저장해야 하는데, dataset 수정 중이라 저장이 안되는 상황.
function handleCreateBtn(restaurant_name) {
  const name = restaurant_name
  localStorage.setItem("restaurant_name", name);
  location.href = "http://127.0.0.1:5500/article/post_article.html";
}
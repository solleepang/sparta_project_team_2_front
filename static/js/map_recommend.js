console.log('hi!')
// let testData = JSON.parse(JSON.stringify());
// console.log(testData);

fetch("data/df_cafe.json")
  .then(response => response.json())
  .then(json => console.log(json));

async function printJSON() {
  const response = await fetch("data/df_kr.json");
  const json = await response.json();
  console.log(json);
}
printJSON()

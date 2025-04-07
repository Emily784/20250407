let dropdowns = [];
let iframe; // 用於嵌入網頁的 iframe
let clouds = []; // 儲存雲朵的資料

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 初始化雲朵
  for (let i = 0; i < 30; i++) {
    clouds.push({
      x: random(width), // 雲朵的初始 x 座標
      y: random(height), // 雲朵的初始 y 座標（分布在整個視窗）
      size: random(50, 150), // 雲朵的大小
      speed: random(0.5, 2), // 雲朵的移動速度
      curve: random(5, 15), // 雲朵的彎曲程度
    });
  }

  // 確保每個下拉式選單正確建立並附加到畫布
  let dropdown1 = createSelect();
  dropdown1.position(10, 10); // 第一個下拉式選單
  dropdown1.style('font-size', '20px'); // 設定字體大小
  dropdown1.option('作品集');
  dropdown1.option('作品1');
  dropdown1.option('作品2');
  dropdown1.option('作品3'); // 新增作品3選項
  dropdown1.changed(() => {
    if (iframe) iframe.remove(); // 移除現有的 iframe
    if (dropdown1.value() === '作品1') {
      iframe = createElement('iframe');
      iframe.attribute('src', 'https://emily784.github.io/20250303-2/');
    } else if (dropdown1.value() === '作品2') {
      iframe = createElement('iframe');
      iframe.attribute('src', 'https://emily784.github.io/20250317-1/');
    } else if (dropdown1.value() === '作品3') {
      iframe = createElement('iframe');
      iframe.attribute('src', 'https://emily784.github.io/20250324-2/');
    }
    if (iframe) {
      iframe.position((windowWidth - 1000) / 2, (windowHeight - 800) / 2);
      iframe.size(1000, 800);
      iframe.style('border', 'none');
    }
  });
  dropdowns.push(dropdown1);

  let dropdown2 = createSelect();
  dropdown2.position(110, 10); // 第二個下拉式選單
  dropdown2.style('font-size', '20px'); // 設定字體大小
  dropdown2.option('測驗卷');
  dropdown2.changed(() => {
    if (iframe) iframe.remove(); // 移除現有的 iframe
    if (dropdown2.value() === '測驗卷') {
      iframe = createElement('iframe');
      iframe.attribute('src', 'https://emily784.github.io/20250310/');
      iframe.position((windowWidth - 1000) / 2, (windowHeight - 800) / 2);
      iframe.size(1000, 800);
      iframe.style('border', 'none');
    }
  });
  dropdowns.push(dropdown2);

  let dropdown3 = createSelect();
  dropdown3.position(200, 10); // 第三個下拉式選單
  dropdown3.style('font-size', '20px');
  dropdown3.option('教學影片');
  dropdown3.option('影片1');
  dropdown3.option('影片2');
  dropdowns.push(dropdown3);

  let dropdown4 = createSelect();
  dropdown4.position(310, 10); // 第四個下拉式選單
  dropdown4.style('font-size', '20px');
  dropdown4.option('自我介紹');
  dropdowns.push(dropdown4);
}

function draw() {
  background("#bbd0ff");

  // 繪製並移動雲朵
  noStroke();
  fill(255, 255, 255, 200); // 雲朵顏色（白色，帶透明度）
  for (let cloud of clouds) {
    beginShape();
    for (let i = 0; i < 10; i++) {
      let offsetX = cloud.x + i * cloud.size / 10;
      let offsetY = cloud.y + sin(i * 0.5) * cloud.curve; // 使用正弦函數讓雲朵彎曲
      curveVertex(offsetX, offsetY);
    }
    endShape(CLOSE);

    cloud.x += cloud.speed; // 雲朵向右移動
    if (cloud.x - cloud.size / 2 > width) {
      // 如果雲朵超出畫布右側，從左側重新出現
      cloud.x = -cloud.size / 2;
      cloud.y = random(height); // 隨機新的 y 座標（分布在整個視窗）
    }
  }
}

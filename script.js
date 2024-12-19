document.addEventListener('DOMContentLoaded', () => {
  const menu = [
      { name: '아메리카노', price: 4100, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg' },
      { name: '카페라떼', price: 4600, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110569]_20210415143035989.jpg' },
      { name: '카푸치노', price: 4600, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[38]_20210415154821846.jpg' },
      { name: '카라멜 마끼아또', price: 5800, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[126197]_20210415154609863.jpg'},
      { name: '자바 칩 프라푸치노', price: 6300, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[168016]_20210415154152122.jpg' },
      { name: '딸기 딜라이트 요거트 블렌디드', price: 6300, image: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[9200000003276]_20210416154001403.jpg' }
  ];

  let order = {};
  let totalPrice = 0;

  const menuContainer = document.getElementById('menu');
  const orderList = document.getElementById('order-list');
  const totalPriceElement = document.getElementById('total-price');
  const submitOrderButton = document.getElementById('submit-order');
  // TODO-2: 주문 추가 로직을 작성하세요.
  // 힌트: menuContainer에 이벤트 리스너를 추가하고, 이벤트가 발생한 대상이 버튼인지 확인합니다.
  
  // 버튼의 data-index 속성을 이용해 어떤 메뉴가 클릭되었는지 파악한 후,
  // 해당 메뉴의 수량을 증가시키거나 새로 추가하세요.
  
  // 이후, 총 가격(totalPrice)을 업데이트하고,
  // 주문 목록을 업데이트하는 updateOrderList 함수를 호출하세요.

  // 예시 코드:
  // menu.forEach((item, index) => {
  //     // 각 메뉴 아이템에 대해 div 요소 생성 및 메뉴 아이템 추가
  // });

  // menuContainer.addEventListener('click', (event) => {
  //     if (event.target.tagName === 'BUTTON') {
  //         // 클릭된 버튼의 메뉴 아이템을 주문에 추가하는 로직 작성
  //     }
  // });

  // 메뉴아이템 화면 표시
  // menu.forEach((item, index) => {
  //   const menuDiv = document.createElement('div');
  //   const nameSpan = document.createElement('span');
  //   const priceP = document.createElement('p');
  //   const orderBtn = document.createElement('button');

  //   nameSpan.textContent = item.name;
  //   priceP.textContent = item.price;
  //   orderBtn.textContent = "주문 추가";
  //   orderBtn.dataset.index = index;
  //   orderBtn.dataset.name = item.name;
  //   orderBtn.dataset.price = item.price;

  //   menuDiv.appendChild(nameSpan);
  //   menuDiv.appendChild(priceP);
  //   menuDiv.appendChild(orderBtn);
  //   menuContainer.appendChild(menuDiv);
  // })
  
  // 메뉴 아이템 화면 표시
  menu.forEach((item, index) => {
    menuContainer.innerHTML += `
        <div class="menu-item">
          <div class="menu-left">
            <img src="${item.image}" class="menu-img">
            <span class="menu-name">${item.name}</span>
          </div>
          <div class="menu-right">
            <span class="menu-price">₩ ${item.price.toLocaleString()}</span>
            <button class="add-button" data-index="${index}">추가</button>
          </div>
        </div>
    `;
});

  // 주문 추가 로직
  menuContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON'){
      // 수정함 원래 내용=슬랙
      const menuIndex = target.getAttribute("data-index");
      const menuPrice = menu[menuIndex].price;
      const menuName = menu[menuIndex].name;

      if(order[menuIndex]){
        order[menuIndex].quantity += 1;
      }else{
        order[menuIndex] = {
          name: menuName,
          price: menuPrice,
          quantity: 1
        };
      }
      
      totalPrice += menuPrice;
      updateOrderList();
    }
  })


  // 주문 내역 업데이트 함수
  function updateOrderList() {
    orderList.innerHTML = "";
    for (let item in order) {
      // const index = menu.findIndex((v) => v.name === item);
      // console.log(item);
      const price = order[item].price;
      const quantity = order[item].quantity;
      const orderItemElement = document.createElement("li");
      orderItemElement.innerHTML = `
      <span>${order[item].name}</span>
      <div class="order-right">
        <span>₩ ${price} x ${quantity}</span>
        <button class="remove" data-index=${item}>삭제</button>
      </div>
      `;
      orderItemElement.className = "list-item";
      orderList.appendChild(orderItemElement);
    }
    totalPriceElement.textContent = totalPrice.toLocaleString();
  }

  // 아이템 삭제 로직
 orderList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    const itemIndex = event.target.getAttribute("data-index");
    console.log(event.target);
    // const itemName = menu[itemIndex].name;
    const item = order[itemIndex];
    totalPrice -= item.price * item.quantity;
    delete order[itemIndex];
    updateOrderList();
  }
});

  // 주문 제출 로직
  submitOrderButton.addEventListener('click', () => {
      if (Object.keys(order).length > 0) {
          alert('주문해 주셔서 감사합니다!');
          order = {};
          totalPrice = 0;
          updateOrderList();
      } else {
          alert('주문 내역이 비어 있습니다!');
      }
  });
});



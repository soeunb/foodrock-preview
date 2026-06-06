const MENUS = [
  {
    id: "pork-cutlet-tong",
    category: "통도시락",
    name: "돈까스 통도시락",
    price: 6500,
    description: "돈까스 · 밥 · 비엔나소시지 · 단무지",
    best: false,
    bestOrder: null,
    sort: 1,
    image: "pork-cutlet-tong.png"
  },
  {
    id: "jeyuk-kimchi-tong",
    category: "통도시락",
    name: "제육김치볶음 통도시락",
    price: 6500,
    description: "제육김치볶음 · 밥 · 비엔나소시지 · 단무지",
    best: false,
    bestOrder: null,
    sort: 2,
    image: "jeyuk-kimchi-tong.png"
  },
  {
    id: "ham-friedrice-tong",
    category: "통도시락",
    name: "햄야채볶음밥 통도시락",
    price: 6500,
    description: "햄야채볶음밥 · 비엔나소시지 · 단무지",
    best: false,
    bestOrder: null,
    sort: 3,
    image: "ham-friedrice-tong.png"
  },
  {
    id: "shrimp-tong",
    category: "통도시락",
    name: "새우볶음밥 통도시락",
    price: 6500,
    description: "새우볶음밥 · 비엔나소시지 · 단무지",
    best: false,
    bestOrder: null,
    sort: 4,
    image: "shrimp-tong.png"
  },
  {
    id: "foodrock-set",
    category: "정식도시락",
    name: "푸드락 정식",
    price: 8000,
    description: "제육 · 밥 · 국 · 4찬 구성",
    best: true,
    bestOrder: 1,
    sort: 1,
    image: "foodrock-set.jpg"
  },
  {
    id: "jeyuk-set",
    category: "정식도시락",
    name: "제육 정식",
    price: 9000,
    description: "제육 · 밥 · 국 · 5찬 구성",
    best: true,
    bestOrder: 2,
    sort: 2,
    image: "jeyuk-set.jpg"
  },
  {
    id: "pork-cutlet-set",
    category: "정식도시락",
    name: "돈까스 정식",
    price: 9000,
    description: "돈까스 · 밥 · 국 · 4찬 구성",
    best: false,
    bestOrder: null,
    sort: 3,
    image: "pork-cutlet-set.jpg"
  },
  {
    id: "beef-bulgogi-set",
    category: "정식도시락",
    name: "소불고기 정식",
    price: 12000,
    description: "소불고기 · 돈까스 · 국 · 5찬 구성",
    best: true,
    bestOrder: 3,
    sort: 4,
    image: "beef-bulgogi-set.jpg"
  },
  {
    id: "premium-set",
    category: "정식도시락",
    name: "프리미엄 정식",
    price: 22000,
    description: "소불고기 · 돈까스 · 계절반찬 · 과일 구성",
    best: false,
    bestOrder: null,
    sort: 5,
    image: "premium-set.jpg"
  }
];

const IMAGE_BASE_PATH = "web/upload/foodrock/";

function formatPrice(price) {
  return Number(price).toLocaleString() + "원";
}

function getImagePath(fileName) {
  return IMAGE_BASE_PATH + fileName;
}

function createBestCard(menu) {
  return `
    <article class="fr-card">
      <span class="fr-badge">BEST</span>
      <img onerror="this.classList.add('is-error')" src="${getImagePath(menu.image)}" alt="${menu.name}">
      <div class="fr-card-body">
        <h3>${menu.name}</h3>
        <p>${menu.description}</p>
        <div class="fr-price">${formatPrice(menu.price)}</div>
      </div>
    </article>
  `;
}

function createMenuItem(menu) {
  return `
    <article class="fr-menu-item">
      <img onerror="this.classList.add('is-error')" src="${getImagePath(menu.image)}" alt="${menu.name}">
      <div>
        <h3>${menu.name}</h3>
        <p class="fr-menu-desc">${menu.description}</p>
        <strong>${formatPrice(menu.price)}</strong>
      </div>
    </article>
  `;
}

function renderBestMenus() {
  const bestMenuList = document.getElementById("bestMenuList");
  if (!bestMenuList) return;

  bestMenuList.innerHTML = MENUS
    .filter(function(menu) {
      return menu.best;
    })
    .sort(function(a, b) {
      return (a.bestOrder || 999) - (b.bestOrder || 999);
    })
    .map(createBestCard)
    .join("");
}

function renderMenuTabs() {
  const basicList = document.getElementById("basic");
  const formalList = document.getElementById("formal");

  if (basicList) {
    basicList.innerHTML = MENUS
      .filter(function(menu) {
        return menu.category === "통도시락";
      })
      .sort(function(a, b) {
        return a.sort - b.sort;
      })
      .map(createMenuItem)
      .join("");
  }

  if (formalList) {
    formalList.innerHTML = MENUS
      .filter(function(menu) {
        return menu.category === "정식도시락";
      })
      .sort(function(a, b) {
        return a.sort - b.sort;
      })
      .map(createMenuItem)
      .join("");
  }
}

function renderCalculatorOptions() {
  const menuSelect = document.getElementById("menuSelect");
  if (!menuSelect) return;

  menuSelect.innerHTML = MENUS
    .slice()
    .sort(function(a, b) {
      if (a.category === b.category) return a.sort - b.sort;
      return a.category === "정식도시락" ? -1 : 1;
    })
    .map(function(menu) {
      return `<option value="${menu.price}">${menu.name} · ${formatPrice(menu.price)}</option>`;
    })
    .join("");
}

function initTabs() {
  const tabs = document.querySelectorAll(".fr-tabs button");

  tabs.forEach(function(btn) {
    btn.addEventListener("click", function() {
      tabs.forEach(function(tab) {
        tab.classList.remove("active");
      });

      document.querySelectorAll(".fr-tab-content").forEach(function(content) {
        content.classList.remove("active");
      });

      btn.classList.add("active");

      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add("active");
    });
  });
}

function initCalculator() {
  const menuSelect = document.getElementById("menuSelect");
  const qtyInput = document.getElementById("qtyInput");
  const totalPrice = document.getElementById("totalPrice");
  const minusBtn = document.getElementById("minusBtn");
  const plusBtn = document.getElementById("plusBtn");

  if (!menuSelect || !qtyInput || !totalPrice || !minusBtn || !plusBtn) return;

  function updateTotal() {
    const price = Number(menuSelect.value || 0);
    const qty = Math.max(1, Number(qtyInput.value || 1));

    qtyInput.value = qty;
    totalPrice.textContent = formatPrice(price * qty);
  }

  menuSelect.addEventListener("change", updateTotal);
  qtyInput.addEventListener("input", updateTotal);

  minusBtn.addEventListener("click", function() {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
    updateTotal();
  });

  plusBtn.addEventListener("click", function() {
    qtyInput.value = Number(qtyInput.value) + 1;
    updateTotal();
  });

  updateTotal();
}

const mealModal = document.getElementById("mealModal");
const mealGrid = document.querySelector(".meal-grid");
const mealTitle = document.getElementById("mealTitle");
const mealTypeLabel = document.getElementById("mealTypeLabel");

var careMeals = [
['1일','간장제육볶음<br>색감치즈고로케<br>깻잎찜<br>김치'],
['2일','오리훈제볶음<br>깐쇼새우<br>도토리묵무침<br>꼬들단무지무침'],
['3일','닭갈비김치볶음<br>김계애호박볶음<br>오이무침<br>깍두기'],
['4일','불고기당면찜<br>새우튀김<br>고사리나물볶음<br>김치'],
['5일','부추제육볶음<br>허브갈몬치킨<br>간장마늘쫑무침<br>김치'],

['6일','해물가스<br>마늘쫑건새우볶음<br>연근조림<br>깍두기'],
['7일','이스라엘식불고기<br>김말이튀김<br>무나물볶음<br>무말랭이'],
['8일','섭산적<br>어묵볶음<br>우엉조림<br>김치'],
['9일','짜장불고기<br>치즈볼<br>고추장멸치볶음<br>김치'],
['10일','소불고기떡갈비<br>야채고로케<br>간장마늘쫑무침<br>김치'],

['11일','배추오리훈제볶음<br>하림참프치킨<br>미역줄기볶음<br>깍두기'],
['12일','간장제육볶음<br>양념감자<br>시금치무침<br>김치'],
['13일','새우가스<br>취나물무침<br>탱탱새김말이<br>깍두기'],
['14일','제육볶음<br>고구마맛탕<br>고사리나물볶음<br>고들단무지무침'],
['15일','함박스테이크<br>채소볶음<br>은행맛궁중조림<br>김치'],

['16일','대체공휴일','holiday'],

['17일','간장제육볶음<br>고구마튀김<br>탕평채김무침<br>김치'],

['18일','닭안다리살볶음<br>애호박볶음<br>연근조림<br>무말랭이'],

['','','empty'],
['','','empty'],
['','','empty']
];

var groupMeals = [
['1일','구마감자조도가스<br>훈제오리볶음<br>떡볶이<br>김치'],
['2일','어린이날','holiday'],
['3일','오징어불고기<br>뿌링클홍가리비<br>계란장조림<br>김치'],
['4일','제육볶음<br>순살파닭<br>탕평채무침<br>깍두기'],
['5일','곤드레밥<br>오징어튀김<br>연근조림<br>떡볶이'],

['6일','문어함박<br>고다리무조림<br>국수무부침개<br>깍두기'],
['7일','오리훈제부추볶음<br>생선가스&타르타르<br>두부조림<br>김치'],
['8일','함박스테이크<br>닭볶음탕<br>숙주나물무침<br>깍두기'],
['9일','야채볶음밥<br>순대야채볶음<br>불어묵볶음<br>김치'],
['10일','간장제육볶음<br>새우가스<br>청미늘햄볶음<br>깍두기'],

['11일','콩나물밥<br>꽁치김치찜<br>찐만두<br>김치'],
['12일','치킨갈비바로우<br>짜장불고기<br>파래자반<br>김치'],
['13일','춘천닭갈비<br>떡갈비<br>마늘쫑무침<br>깍두기'],
['14일','참치마요<br>순살치킨텐더<br>돼지갈비찜<br>깍두기'],
['15일','홍어조림<br>소불고기떡찜<br>짜장떡볶이<br>김치'],

['16일','대체공휴일','holiday'],

['17일','두부김치제육<br>타코야끼<br>콩나물찜<br>백김치'],

['18일','닭안다리살볶음<br>함박스테이크<br>미역줄기볶음<br>열무김치'],

['19일','김치볶음밥<br>소불고기당면찜<br>베이컨애호박볶음<br>단무지무침'],

['20일','카레라이스<br>계란스크램블<br>하림살너겟<br>김치']
];

function renderMeals(type) {
  const data = type === "group" ? groupMeals : careMeals;

  mealGrid.innerHTML = `
    <div class="meal-head">월</div>
    <div class="meal-head">화</div>
    <div class="meal-head">수</div>
    <div class="meal-head">목</div>
    <div class="meal-head">금</div>
  `;

  data.forEach(function(meal) {
    const className = meal[2] === "holiday" ? " holiday" : meal[2] === "empty" ? " empty" : "";

    mealGrid.innerHTML += `
      <div class="meal-day${className}">
        ${meal[0] ? "<b>" + meal[0] + "</b>" : ""}
        ${meal[1] ? "<p>" + meal[1] + "</p>" : ""}
      </div>
    `;
  });

  if (type === "group") {
    mealTitle.textContent = "단체 식단표 예시";
    mealTypeLabel.textContent = "FOODROCK GROUP MEAL SAMPLE";
  } else {
    mealTitle.textContent = "돌봄 식단표 예시";
    mealTypeLabel.textContent = "FOODROCK CARE MEAL SAMPLE";
  }
}

function initMealModal() {
  if (!mealModal || !mealGrid || !mealTitle || !mealTypeLabel) return;

  document.querySelectorAll("[data-meal-open]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      renderMeals(btn.dataset.mealOpen);
      mealModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelectorAll("[data-close]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      mealModal.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

renderBestMenus();
renderMenuTabs();
renderCalculatorOptions();
initTabs();
initCalculator();
initMealModal();

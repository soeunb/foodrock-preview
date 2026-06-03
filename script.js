var tabs=document.querySelectorAll('.fr-tabs button');tabs.forEach(function(btn){btn.addEventListener('click',function(){tabs.forEach(function(b){b.classList.remove('active')});document.querySelectorAll('.fr-tab-content').forEach(function(c){c.classList.remove('active')});btn.classList.add('active');document.getElementById(btn.dataset.tab).classList.add('active')})});
var menuSelect=document.getElementById('menuSelect'),qtyInput=document.getElementById('qtyInput'),totalPrice=document.getElementById('totalPrice'),minusBtn=document.getElementById('minusBtn'),plusBtn=document.getElementById('plusBtn');function updateTotal(){var price=Number(menuSelect.value||0);var qty=Math.max(1,Number(qtyInput.value||1));qtyInput.value=qty;totalPrice.textContent=(price*qty).toLocaleString()+'원'}if(menuSelect){menuSelect.onchange=updateTotal;qtyInput.oninput=updateTotal;minusBtn.onclick=function(){qtyInput.value=Math.max(1,Number(qtyInput.value)-1);updateTotal()};plusBtn.onclick=function(){qtyInput.value=Number(qtyInput.value)+1;updateTotal()};updateTotal()}
var mealModal=document.getElementById('mealModal'),mealGrid=document.querySelector('.meal-grid'),mealModalTitle=document.getElementById('mealModalTitle'),mealTitle=document.getElementById('mealTitle'),mealTypeLabel=document.getElementById('mealTypeLabel');
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
function renderMeals(type){var data=type==='group'?groupMeals:careMeals;mealGrid.innerHTML='<div class="meal-head">월</div><div class="meal-head">화</div><div class="meal-head">수</div><div class="meal-head">목</div><div class="meal-head">금</div>';data.forEach(function(m){var cls=m[2]==='holiday'?' holiday':m[2]==='empty'?' empty':'';mealGrid.innerHTML+='<div class="meal-day'+cls+'">'+(m[0]?'<b>'+m[0]+'</b>':'')+(m[1]?'<p>'+m[1]+'</p>':'')+'</div>'});if(type==='group'){mealTitle.textContent='단체 식단표 예시';mealTypeLabel.textContent='FOODROCK GROUP MEAL SAMPLE'}else{mealTitle.textContent='돌봄 식단표 예시';mealTypeLabel.textContent='FOODROCK CARE MEAL SAMPLE'}}
document.querySelectorAll('[data-meal-open]').forEach(function(btn){btn.onclick=function(){renderMeals(btn.dataset.mealOpen);mealModal.classList.add('open');document.body.style.overflow='hidden'}});document.querySelectorAll('[data-close]').forEach(function(btn){btn.onclick=function(){mealModal.classList.remove('open');document.body.style.overflow=''}});

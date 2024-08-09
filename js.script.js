let pagers = document.querySelectorAll('.testimonials .pager a');
let testimonialsLists = document.querySelectorAll('.testimonials_list li');
let paginationUp = document.querySelector('.pagination .up');
let paginationDown = document.querySelector('.pagination .down');
let currentIdx = 0;
let testimonialCount = testimonialsLists.length;
let parterList = document.querySelector('.parten_list')
let partnerListWidth = 234;
let partnerListConut = document.querySelectorAll('.parten_list li').length;
let partnerListLeft = 0;
let parterListTotalWidth = partnerListWidth * partnerListConut;
let animation;
let bookATrip = document.querySelector('.book_a_trip');
let bookATripOST = bookATrip.offsetTop - 300;
let progressBar = document.querySelector('.progress_bar');
let bar = document.querySelector('.progress_bar .bar');
let onGoingPercent =document.querySelector('.ongoing .percent');

parterList.style.width = parterListTotalWidth +'px';

function moveParterList(){
  //partnerListLeft = partnerListLeft -5;
  partnerListLeft -= 2;
  if(partnerListLeft === -parterListTotalWidth/2){
    partnerListLeft =0;
  }
  
  parterList.style.left = partnerListLeft + 'px';
  animation = requestAnimationFrame(moveParterList);
}
requestAnimationFrame(moveParterList);

parterList.addEventListener('mouseenter',()=>{
   cancelAnimationFrame(animation);
});
parterList.addEventListener('mouseleave',()=>{
  requestAnimationFrame(moveParterList);
})

/*
pagers를 클릭하면 할일
  모든 a에서 active를 제거하고, 클릭한 그 요소에 active 추가
*/

pagers.forEach((item,idx) => {
  item.addEventListener('click',(e)=>{
    e.preventDefault();
    
    //모든 testimonialsLists에서 active를 제거하고 클릭한 그요소의 인덱스번호에 해당하는 list에 active추가
    showTestimonial(idx);
  });
});
function showTestimonial(num){
   /*
  첫 후기인데, -1 마지막 후기가 보이도록
  마지막 후기인데, 3, 첫후기가 보이도록
  
  if(num === -1){
    num = testimonialCount -1;
  }
  if(num === 3){
    num = 0

  if(num === -1){
    num = testimonialCount -1;
  }else if (num === 3){
    num = 0
  }else{
  num = num;
  }
    
  num = (num === -1) ? testimonialCount -1 : (num === 3) ? num = 0;
*/
  num = (num + testimonialCount)% testimonialCount;
  /*
  num = (1 + 3) % 3 = 1
  num1 = num1
  num = (2 + 3) % 3 = 2
  num2 = num2
  num = (3 + 3) % 3 = 0
  num3 = num0
 
  */

  for(let testimonial of testimonialsLists){
    testimonial.classList.remove('active');
  }
  testimonialsLists[num].classList.add('active');
  currentIdx = num;

  for(let pager of pagers){
    pager.classList.remove('active');
  }
  pagers[num].classList.add('active');
 
}

paginationUp.addEventListener('click',()=>{
  showTestimonial(currentIdx - 1);
});


paginationDown.addEventListener('click',()=>{
  showTestimonial(currentIdx + 1);
});

window.addEventListener('scroll',()=>{
  let scrollAmt = window.scrollY;
  if(scrollAmt >= bookATripOST){
    if(bookATrip.classList.contains('active')==false){
      bookATrip.classList.add('active')
      onGoingNumAnimation();
    }
  }
});

function onGoingNumAnimation(){
  let targetNum = Number(bar.getAttribute('data-rate'));
  let num = 0;
  let animation = setInterval(()=>{
    num += 1;
    bar.style.width = num + '%';
    onGoingPercent.innerHTML = num +'%';
    if(num === targetNum){
      clearInterval(animation);
    }
  },50);
}
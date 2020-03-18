/*jshint esversion: 6 */

const serch = document.querySelector('.form-search'),
     inputCitiesForm = serch .querySelector('.input__cities-from'),
     DropdownCitiesFrom = serch .querySelector('.dropdown__cities-from'),
     inputCitiesTo = serch .querySelector('.input__cities-to'),
     dropdownCitiesTo=serch.querySelector('.dropdown__cities-to'),
     InputDateDepart = serch.querySelector('.input__date-depart') ;
const city = ['Москва','Санкт-Петербург','Минск','Караганда','Челябинск','Керчь',
'Волгоград','Уфа','Одесса','Ухань','Шимкент','Нижний-Новгород','Калининград',
'Ростов-на-дону']; 
const showSite = (input,list) =>{
    list.textContent ='';
       if(input.value !== ''){
           const Filtr = city.filter((item) =>{
               const fixitem = item.toLowerCase();
               return fixitem.includes(input.value.toLowerCase());
           } );
           Filtr.forEach((item) =>{
               const li = document.createElement('li');
               li.classList.add('dropdown__city');
               li.textContent = item;
               list.append(li);
           });
       }
   } ;
//.....................................................
inputCitiesForm.addEventListener('input',()=>{
    showSite(inputCitiesForm,DropdownCitiesFrom);
});

DropdownCitiesFrom.addEventListener('click',(event)=>{
const target = event.target;
if(target.tagName.toLowerCase() ==='li'){
    inputCitiesForm.value = target.textContent;
    DropdownCitiesFrom.textContent='';}
});
//.....................................................
inputCitiesTo.addEventListener('input',()=>{
    showSite(inputCitiesTo,dropdownCitiesTo);
} );
dropdownCitiesTo.addEventListener('click',(event)=>{
const targetTo = event.target;
    if(targetTo.tagName.toLowerCase() === 'li'){
        inputCitiesTo.value = targetTo.textContent;
        dropdownCitiesTo.textContent = '';
     }
} );
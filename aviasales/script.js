/*jshint esversion: 6 */
//...получаем элементы со страницы
const serch = document.querySelector('.form-search'),
     inputCitiesForm = serch .querySelector('.input__cities-from'),
     DropdownCitiesFrom = serch .querySelector('.dropdown__cities-from'),
     inputCitiesTo = serch .querySelector('.input__cities-to'),
     dropdownCitiesTo=serch.querySelector('.dropdown__cities-to'),
     InputDateDepart = serch.querySelector('.input__date-depart') ;
//..массив городов
const sitiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
          proxy = 'https://cors-anywhere.herokuapp.com/',
          API_KEY = '&685a5a5eae552ce74cf93cd4f53b0eda',
          Kaledar = 'http://min-prices.aviasales.ru/calendar_preload?';
let city = []; 
let bilet=[];
const origin = 'CEK';// IATA-код пункта отправления. IATA код указывается буквами верхнего регистра, например MOW
let destination = 'KGD';//IATA-код пункта назначения. IATA код указывается буквами верхнего регистра,
let depart_date = '2020-05-15&' ;//дата вылета в формате YYYY-MM-DD.
let one_way = true;// поиск билетов в один конец (true или false).

//..API
const getData=(url, callback)=>{
    const  request = new XMLHttpRequest();//обьект запроса
    
    request.open('GET',url);
    
    request.addEventListener('readystatechange', ()=>{
        if(request.readyState !== 4 )return;
        if(request.status === 200){
            callback(request.response);
        } else {
            console.error(request.status);
        }
    });
    request.send();

};

//...метод поиска города в массиве
const showSite = (input,list) =>{
    list.textContent ='';
       if(input.value !== ''){
           const Filtr = city.filter((item) =>{
               if(item.name){
                const fixitem = item.name.toLowerCase();
                return fixitem.includes(input.value.toLowerCase());//переводим в один регистр
               }
           } );
           Filtr.forEach((item) =>{
               const li = document.createElement('li');//..создаем элемент
               li.classList.add('dropdown__city');//добавляем класс
               li.textContent = item.name+' '+item.code;
               list.append(li);
           });
       }
   } ;
   //...метод клика в выпадающем списке
const selectSite=(e,input,list )=>{
    const target = e.target;
    if(target.tagName.toLowerCase() ==='li'){
        input.value = target.textContent;
        const ngt=target.textContent;
        const code = ngt[ngt.length-3]+ngt[ngt.length-2]+ngt[ngt.length-1];///str[str.length - 1]
         console.log(code);   
        list.textContent='';}
};


//.....................................................
inputCitiesForm.addEventListener('input',()=>{
    showSite(inputCitiesForm,DropdownCitiesFrom);
});

DropdownCitiesFrom.addEventListener('click',(event)=>{
    selectSite(event,inputCitiesForm,DropdownCitiesFrom);
                        
});
//.....................................................
inputCitiesTo.addEventListener('input',()=>{
    showSite(inputCitiesTo,dropdownCitiesTo);
} );
dropdownCitiesTo.addEventListener('click',(event)=>{
    selectSite(event,inputCitiesTo,dropdownCitiesTo);
} );

getData( proxy + sitiesApi , (data)=>{
city = JSON.parse(data).filter(item => item.name);
} );
let zapros='http://min-prices.aviasales.ru/calendar_preload?origin=CEK&destination=KGD&depart_date=2020-05-15&one_way=true&tocen=685a5a5eae552ce74cf93cd4f53b0eda';
getData(zapros ,(data)=>{
    const bilet = JSON.parse(data);
     console.log(bilet);
});

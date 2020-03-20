/*jshint esversion: 6 */
//...получаем элементы со страницы
const serch = document.querySelector('.form-search'),
     inputCitiesForm = serch .querySelector('.input__cities-from'),
     DropdownCitiesFrom = serch .querySelector('.dropdown__cities-from'),
     inputCitiesTo = serch .querySelector('.input__cities-to'),
     dropdownCitiesTo=serch.querySelector('.dropdown__cities-to'),
     InputDateDepart = serch.querySelector('.input__date-depart') ;
//..массив городов
const sitiesApi = 'database/cities.json',//http://api.travelpayouts.com/data/ru/cities.json
          proxy = 'https://cors-anywhere.herokuapp.com/',
          API_KEY = '685a5a5eae552ce74cf93cd4f53b0eda',
          Kalendar = 'http://min-prices.aviasales.ru/calendar_preload';
let city = []; 


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
                const fixitem = item.name.toLowerCase();
                return fixitem.includes(input.value.toLowerCase());//переводим в один регистр
           } );
           Filtr.forEach((item) =>{
               const li = document.createElement('li');//..создаем элемент
               li.classList.add('dropdown__city');//добавляем класс
               li.textContent = item.name;
               list.append(li);
           });
       }
   } ;


const renderCheapEar=(chipTiket)=>{
	console.log('chipTiket: ', chipTiket);

};
const renderChipDay=(chipTiketDay)=>{
	console.log('chipTiketDay: ', chipTiketDay);

};

   //...метод клика в выпадающем списке
const selectSite=(e,input,list )=>{
    const target = e.target;
    if(target.tagName.toLowerCase() ==='li'){
        input.value = target.textContent;
        const ngt=target.textContent; 
        list.textContent='';}
};
const renderChip =(data, date)=>{
 const cheapTicet = JSON.parse(data).best_prices;

 const chipTiketDay = cheapTicet.filter((item) =>{
     return item.depart_date === date;
 });


 renderCheapEar(cheapTicet);  //рендер всех билеов
 renderChipDay(chipTiketDay);//рендер на указанный день
};





//.....................................................
inputCitiesForm.addEventListener('input',()=>{
    showSite(inputCitiesForm,DropdownCitiesFrom);//выпадающий список 
});

DropdownCitiesFrom.addEventListener('click',(event)=>{
    selectSite(event,inputCitiesForm,DropdownCitiesFrom);//выбираем из выпадающего списка  
    
});

//.....................................................
inputCitiesTo.addEventListener('input',()=>{
    showSite(inputCitiesTo,dropdownCitiesTo);/////выпадающий список 
});
dropdownCitiesTo.addEventListener('click',(event)=>{
    selectSite(event,inputCitiesTo,dropdownCitiesTo); //выбираем из выпадающего списка 
} );

//................................
getData( sitiesApi , (data)=>{
city = JSON.parse(data).filter(item => item.name);  //получение списка городов

});
//...
serch.addEventListener('submit',(event)=>{       //действия по нажатию кнопки и собираем данные с формы
    event.preventDefault();                      //отключает перезагрузку страницы
    const formData={                             // обьект содержащий данные формы 
        from : city.find((item) => inputCitiesForm.value === item.name).code,
        to : city.find((item) => inputCitiesTo.value === item.name).code,
        when:InputDateDepart.value,
    };
	const reqwesData =`?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true`;    //&tocen=' + API_KEY;   //строка содержащая данные для отправки
	console.log('reqwesData: ', reqwesData);

    getData(Kalendar + reqwesData,(respons)=>{  // запрашиваем билеты на указанную дату приходит в json на большее колво дат   
        renderChip(respons,formData.when);      // парсер дат
        });
    });


     



/*
let zapros=`http://min-prices.aviasales.ru/calendar_preload?origin=${origin}&destination=${destination}&depart_date=${depart_date}&one_way=true&tocen=685a5a5eae552ce74cf93cd4f53b0eda`;
getData(zapros ,(data)=>{
    const bilet = JSON.parse(data).best_prices.filter(item => {
        
    });
     console.log(bilet);
});
*/
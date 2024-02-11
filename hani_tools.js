const hani_date = new Date();

hani_year    = hani_date.getFullYear();hani_date
hani_month   = ("0" + (hani_date.getMonth() + 1)).slice(-2);
hani_day     = ("0" +  hani_date.getDate()).slice(-2);
hani_hours   = ("0" +  hani_date.getHours()).slice(-2);
hani_minutes = ("0" +  hani_date.getMinutes()).slice(-2);
hani_seconds = ("0" +  hani_date.getSeconds()).slice(-2);

function hani_server_running_message(p,h){
  console.log(`Server \x1b[1;92;40mRUNNING..\x1b[0m at \x1b[1;93;40mhttp://${h}:${p}\x1b[0m since \x1b[1;96;40m${hani_year}-${hani_month}-${hani_day} ${hani_hours}:${hani_minutes}:${hani_seconds} \x1b[0m`);
}
  

function  hani_test() {

    console.log(
        'hani_year=' + hani_year ,
        'hani_month=' + hani_month ,
        'hani_day=' + hani_day ,
        'hani_hours=' + hani_hours ,
        'hani_minutes=' + hani_minutes ,
        'hani_seconds=' + hani_seconds 
        )
return true
}


//hani_test()
//hani_server_running_message(9888,'host1')
console.log(global) 
if (process.env.NODE_ENV === 'development'){
  console.log('Do not deploy!! Do not deploy!!');
}
else {
  console.log('ELSE (process.env.NODE_ENV === "development")');
    console.log(process.env.NODE_ENV);
}


 exports.hani_server_running_message = hani_server_running_message ;

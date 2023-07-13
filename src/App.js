import React, { useEffect, useState } from 'react'
import{API_key} from "./Api";

function App() {
  


  const  [position,setposition]=useState({
    city:'', latitude:"",longitude:''
  });



  async function get_location()
  {
    console.log(position);
    
      try {
  
          let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_key}`);
          response=await response.json();
          setposition((prevpos) => ({ ...prevpos, city: response?.name }));
      } catch (error) {
          alert(" Hey not found !");
      }
  }
  useEffect(() => {
    current_loc();
   
  }, []);



 function current_loc()
{
  
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
        
        
          position_upadte(position.coords.latitude,position.coords.longitude);
          
      
        });

    }
   

    else{
           throw(new Error("decive Not Support"));
       
         }


         get_location();
}



function  details()
{
 
  console.log(position);



}



  function position_upadte(lat,long)
  {
    try{
      console.log(lat,long); 
      console.log(position);
      setposition((prevpos) => ({
              ...prevpos,
              latitude: lat,
              longitude: long,
            }));
   
      console.log(lat,long);
    }

 catch(error)
 {
  console.log(error);

  }

  }
  return (
   <div className='App'>
     <div>your latitude longitude</div>
    <h2>{position.latitude}</h2>
    <h2>{position.longitude}</h2>
    <h2>{position.city}</h2>
    <button onClick={details}> get your current cordinates and city name</button>
   </div>
  )
}

export default App
console.log("App is Running")

export const calculateDistance = (lat1,lon1,lat2,lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = toRad(lat2-lat1);  // Javascript functions in radians
  var dLon = toRad(lon2-lon1); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  d = R * c; // Distance in km
  return d.toFixed(2)
}

var d;

var name;
var dis;
//   /** Converts numeric degrees to radians */
 function toRad(value)
 {
      return value * Math.PI / 180;   // this is the to radians conversion like we convert R * 3.14/180
 }
 
// export const getLocation = function(){ 
//     console.log('start here')
//  let Promiseall =  new Promise((succeed,fail)=>{

//     window.navigator.geolocation.getCurrentPosition(function(pos) {
//         console.log(pos); 
//          console.log("After the position "+pos)
//           let lon1 = 80.23//pos.coords.longitude
//           let lat1 = 13.11//pos.coords.latitude
//           let lon2 = 80.28
//           let lat2 = 13.05
//           console.log("My longitude :"+pos.coords.longitude)
//           console.log("My latitude :"+pos.coords.latitude)
          
          
//             console.log("inside Distance function..")
//             var R = 6371; // Radius of the earth in km
//             var dLat = toRad(lat2-lat1);  // Javascript functions in radians
//             var dLon = toRad(lon2-lon1); 
//             var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
//                     Math.sin(dLon/2) * Math.sin(dLon/2); 
//             var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//              d = R * c; // Distance in km
         
          
//           console.log("Ans  : "+d)
//           succeed(d)
//     });

// });



// Promiseall.then((dist)=>{
//    name = "surya"
//     console.log("Distance :"+dist)
//     dis = dist.toFixed(2)
    
  
// })
// }

// export {dis}
// export {name}



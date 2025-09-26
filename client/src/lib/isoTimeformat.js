const isoTimeFormat=(dateTime)=>{
     const date=new Date(dateTime)
     const localTime=date.toLocaleTimeString("en-Us",{
        hour:'2-digit',
        minute:"2-digit",
        hour12:true
     })
     return localTime
}
export default isoTimeFormat

// lib/isoTimeformat.js
// const isoTimeFormat = (time) => {
//   if (!time) return "Invalid time";

//   // Handle cases like "19:30" or "19:30:00"
//   let date = new Date(`1970-01-01T${time}`);

//   // If invalid, try without seconds
//   if (isNaN(date.getTime())) {
//     date = new Date(`1970-01-01T${time}:00`);
//   }

//   if (isNaN(date.getTime())) return "Invalid time";

//   return date.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// export default isoTimeFormat;



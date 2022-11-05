export const getCourses = async () => {
    return await fetch(`http://localhost:8000/course/`)
       .then(response => {
           if (response.ok && response.status == 204)
               alert(" no courses");
           else
               if (response.ok)
                   return response.json();
               else
                   throw new Error(response.status);
       })
       .then(data => {
           if (data != null) {
               return data;
           }
       })
       .catch(err => console.log(err))

}


export const addCourse = async (course) => {
   return await fetch('http://localhost:8000/category/', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(categoryName={categoryName})
         })
       .then(response => {
           if (response.ok) {
               return response.json();
           }
           else
               throw new Error(response.status);
       })
       .then(data => {
           if (data != null) {
               console(`${JSON.stringify(data)}`)
           }
       })
       .catch(err => console.log(err))

}


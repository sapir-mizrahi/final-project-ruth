export const addStage = async(stage) => {
    return await fetch('http://localhost:8000/stage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stage)
      
    })
    .then(response => {
                if (response.ok){
            return response.json();
            }
        else
            throw new Error(response.status);
    })
    .then(data => {
        if (data!=null) {
           console(`${JSON.stringify(data)}`)
            return data;
        }
    })
    .catch(err => console.log(err))

}


export const getStage = async () => {
    return await fetch(`http://localhost:8000/stage/`)
       .then(response => {
           if (response.ok && response.status == 204)
              console(" קטגוריות אין");
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



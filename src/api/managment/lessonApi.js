

export const addLesson = async (lesson) => {
    return await fetch('http://localhost:8000/lesson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lesson)

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
                return data;
            }
        })
        .catch(err => console.log(err))

}

export const getLesson = async () => {
    return await fetch(`http://localhost:8000/lesson/`)
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



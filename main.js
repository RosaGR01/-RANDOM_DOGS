const API_KEY = 'live_M0EbwcBgQB4GUGPj2fUTDhU5L2oz7ndPScHiAae0tTQiU5th3pKFcYXJMhm22jbL';
const API_URL_FAVOTITES_DELATE = (id)=>`https://api.thedogapi.com/v1/favourites/${id}?limit=3b&api_key=live_M0EbwcBgQB4GUGPj2fUTDhU5L2oz7ndPScHiAae0tTQiU5th3pKFcYXJMhm22jbL`;
const API_URL_RANDOM_ = 'https://api.thedogapi.com/v1/images/search?limit=3';
const API_URL_FAVOTITES = 'https://api.thedogapi.com/v1/favourites';

const btn = document.getElementById('btn-recargar');

btn.addEventListener("click",loadRandomDogs());

async function loadRandomDogs(){
    const res = await fetch(API_URL_RANDOM_);
    const data = await res.json();
    if(res.status == 200){
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn1.onclick =()=>saveFavoriteDog(data[0].id);
        btn2.onclick =()=>saveFavoriteDog(data[1].id);
        btn3.onclick =()=>saveFavoriteDog(data[2].id);

    }
}

async function loadFavotitesDogs(){
    const res = await fetch(API_URL_FAVOTITES,{
        method : 'GET',
        headers : {
            'x-api-key': API_KEY
        }
    });
    const data = await res.json();
    console.log('favorito');
    console.log(data);
    
    if(res.status ==200){
        const section = document.getElementById('favoriteDogs');
        section.innerHTML = "";
        
        data.forEach(perrito => {
            const article = document.createElement('div')
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Eliminar de Favorito');

            btn.onclick = ()=>{delateFavoriteDog(perrito.id)};

            img.src = perrito.image.url;
            img.width = 150;
            img.height= 100;
            btn.appendChild(btnText);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }

}

async function saveFavoriteDog(id){
    const res = await fetch(API_URL_FAVOTITES,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'x-api-key': API_KEY
        }, 
        body : JSON.stringify({
            image_id : id
        })
    });
    if(res.status == 200){
        loadFavotitesDogs();
    }
}
async function delateFavoriteDog(id){
    const res = await fetch(API_URL_FAVOTITES_DELATE(id),{
        method : 'DELETE',
        headers:{
            'x-api-key': API_KEY
        }
    });
    if(res.status ==200){
        loadFavotitesDogs();
    }

}

loadFavotitesDogs();
//step 3 with api call results display them (in deifferent specific functions)

function  showYoutubeBandInfo(responseJson){ 
    console.log(responseJson)
    let dataString = "";
    responseJson.items.map((item, i) => {
        dataString +=  `<div class = 'eventInfo'>`
        dataString +=  `<a href='https://www.youtube.com/watch?v=${item.id.videoId}' class = 'eventInfoUrl' target = '_blank'>`
        dataString +=  `<h1 class = 'eventInfoName'>${item.snippet.title}</h1>`
        dataString +=  `</a>`
        dataString +=  `<img src = '${item.snippet.thumbnails.high.url}' class = 'eventInfoImg' alt = '${item.snippet.title}' />`
        dataString +=  `</div>`
    })

    $("#showBandYoutube").html(dataString);
}

function  showTicketMasterBandInfo(responseJson){ 
    // let dataString = "<h1>"+responseJson._embedded.events[0].type+responseJson._embedded.events[0].url+"</h1>"
    // $("#showBandChoice").html(dataString)
    
    let dataString = "";
    responseJson._embedded.events.map((event, i) => {
        //console.log(event)
        dataString +=  `<div class = 'eventInfo'>`
        dataString +=  `<a href = '${event.url}' class = 'eventInfoUrl' target = '_blank'>`
        dataString +=  `<h1 class = 'eventInfoName'>${event.name}</h1>`
        dataString +=  `</a>`
        dataString +=  `<img src = '${event.images[0].url}' class = 'eventInfoImg' alt = '${event.name}' />`

        // dataString +=  `<h1>${event.url}</h1>`
        dataString +=  `<p class = 'eventInfoData'>${event.dates.start.localDate} ${event.dates.start.localTime}</p>`
        //dataString +=  `<h1>${event.images[0].url}</h1>`
        dataString +=  `</div>`
    })

    $("#showBandTM").html(dataString);
}


function  showWikiBandInfo(responseJson){ 
    console.log(responseJson)
    let dataString = "";
    responseJson.items.map((item, i) => {
        dataString +=  `<div class = 'eventInfo'>`
        dataString +=  `<a href='https://www.youtube.com/watch?v=${item.id.videoId}' class = 'eventInfoUrl' target = '_blank'>`
        dataString +=  `<h1 class = 'eventInfoName'>${item.snippet.title}</h1>`
        dataString +=  `</a>`
        dataString +=  `<img src = '${item.snippet.thumbnails.high.url}' class = 'eventInfoImg' alt = '${item.snippet.title}' />`
        dataString +=  `</div>`
    })

    $("#showBandWiki").html(dataString);
}

//step 2 with input from user make the api call

function getBandInfo(bandName,apiName){
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${bandName}&type=video&maxResults=5&key=AIzaSyCBJc8FQPhP30cJCkEabNb5qdC1qDn022c`
    const ticketMasterUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${bandName}&countryCode=US&apikey=I8PyHDOwCGKXot8NEFNzlL2zagthWIXD`
    //const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${bandName}&format=json`
    //const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${bandName}&utf8=&format=json`
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&formatversion=2&prop=pageimages|extracts|pageterms&piprop=thumbnail&origin=*&pithumbsize=1020&generator=search&exintro&explaintext&exsentences=1&exlimit=max&gsrlimit=1&gsrsearch=${bandName}&srsearch=${bandName}&callback=?`
    if (apiName == "youtube") {
        apiUrl = youtubeUrl
    }
    else if (apiName == 'ticketMaster') {
        apiUrl = ticketMasterUrl
    }
    else {
        apiUrl = wikiUrl
    }
    console.log(apiUrl)

    fetch(apiUrl)
    .then(response => {
        console.log(response);
        return response.json();
        // if (response.ok) {
        //     //return JSON.parse(response);
        //     return response.json();
        // }
        // throw new Error(response);
    })
    .then(responseJson =>  {
        if (apiName == "youtube") {
            showYoutubeBandInfo(responseJson)
        }
        else if (apiName == 'ticketMaster') {
            showTicketMasterBandInfo(responseJson)
        }
        else {
            showWikiBandInfo(responseJson.replace(/ */g,""))
        }
    })
    .catch(err => {
        console.log(apiName);
        console.log(err);
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


//Step 1 take input from the user
function regesterButtonClick(){
    $(`#button`).click(function (event) {
        event.preventDefault();
        let bandName = $('#bandChoice').val();
        console.log(bandName)
        //getBandInfo(bandName,'youtube');
        //getBandInfo(bandName,'ticketMaster');
        getBandInfo(bandName,'wiki');
    });
}

regesterButtonClick();

//https://jsfiddle.net/dkg1rcbf/
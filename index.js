//returns / if the url is NOT valid
function checkURL(inputURL) {
    let outputURL = inputURL;
    if (inputURL === undefined) {
        outputURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
    }
    else if (inputURL == null) {
        outputURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
    }

    else{
        outputURL=inputURL.source
    }
    return outputURL;
}

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

function showWikiBandInfo(data){
    let pages=data['query']['pages'];
    console.log(pages)
    let pagesArr=Object.keys(pages);
    console.log(pagesArr);
    $('#showBandWiki').html('')
    let html='';
    let curid='https://en.wikipedia.org/?curid=';
    //for(let i=0;i<pagesArr.length;i++){
    for(let i=0;i<1;i++){
        //html='<li class="item"><a target="_blank"> <h3>'+pages[pagesArr[i]].title+'</h3> <p>'+pages[pagesArr[i]].extract+'</p> </a></li>';
        html=
        `<li class="item">
            <h3>
                <img src="${checkURL(pages[pagesArr[i]].thumbnail)}" class="wikiImage" alt="${pages[pagesArr[i]].title}" >
                <a target="_blank"> 
                    ${pages[pagesArr[i]].title}
                </a>
            </h3>
            <p>${pages[pagesArr[i]].extract}</p> 
        </li>`;
        $(html).appendTo($('#showBandWiki')).find('a').attr('href',curid+pagesArr[i]);
    }
}


// function  showWikiBandInfo(responseJson){ 
//     console.log(responseJson)
//     let dataString = "";
//     responseJson.query.pages.map((item, i) => {
//         dataString +=  `<div class = 'eventInfo'>`
//         // dataString +=  `<a href='https://www.youtube.com/watch?v=${item.id.videoId}' class = 'eventInfoUrl' target = '_blank'>`
//         dataString +=  `<h1 class = 'eventInfoName'>${item.title}</h1>`
//         // dataString +=  `</a>`
//         // dataString +=  `<img src = '${item.snippet.thumbnails.high.url}' class = 'eventInfoImg' alt = '${item.snippet.title}' />`
//         dataString +=  `</div>`
//     })

//     $("#showBandWiki").html(dataString);
// }

//step 2 with input from user make the api call
function getWikiResults(bandName, callback) {
    let api='https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&generator=search&plimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrlimit=10&callback=?&gsrsearch='+encodeURIComponent(bandName);
            $.getJSON(api,{"dataType":"jsonp"},callback);
}

function getBandInfo(bandName,apiName){
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${bandName}&type=video&maxResults=5&key=AIzaSyCBJc8FQPhP30cJCkEabNb5qdC1qDn022c`
    const ticketMasterUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${bandName}&countryCode=US&apikey=I8PyHDOwCGKXot8NEFNzlL2zagthWIXD`
    
    //previously tried url where cors didn't work
    //const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${bandName}&format=json`
    //const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&srsearch=${bandName}&utf8=&format=json`
    
    //slack reccommended url
    //const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&format=json&formatversion=2&generator=search&gsrlimit=1&gsrsearch=${bandName}&srsearch=${bandName}&callback=&origin=*`
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
        if (apiName == 'wiki') {

            //convert the response to json
            let jsonOutput = response.json();

            //convert the json response to string
            let stringifyResponse = JSON.stringify(jsonOutput)
            console.log(stringifyResponse)

            //exclude the first four characters in the string
            let parseOutput = stringifyResponse.substr(4);
            console.log(parseOutput)

            //convert back to json the newly created string
            let restringifyOutput = JSON.parse(parseOutput);
            return restringifyOutput
        }

        else {
            return response.json();
        }
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
            showWikiBandInfo(responseJson)
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
        getBandInfo(bandName,'ticketMaster');
        getBandInfo(bandName,'wiki');
        getWikiResults(bandName, showWikiBandInfo)
    });
}

regesterButtonClick();

//https://jsfiddle.net/dkg1rcbf/
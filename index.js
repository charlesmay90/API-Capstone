//step 3 with api call results display them (in deifferent specific functions)

function  showYoutubeBandInfo(responseJson){ 
    console.log(responseJson.items)
}

function  showTicketMasterBandInfo(responseJson){ 
    console.log(responseJson._embedded.events)
}

function  showWikiBandInfo(responseJson){ 
    console.log(responseJson)
}

//step 2 with input from user make the api call

function getBandInfo(bandName,apiName){
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${bandName}&type=video&videoCaption=closedCaption&key=AIzaSyAV-iYlcoNVSMiws_hA_guBlxdTtLJd8p4`
    const ticketMasterUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${bandName}&countryCode=US&apikey=I8PyHDOwCGKXot8NEFNzlL2zagthWIXD`
    // const wikiUrl = `https://en.wikipedia.org/w/api.php?&origin=*action=opensearch&search=${bandName}&format=json`
    const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&generator=search&plimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrlimit=10&callback=?&gsrsearch='+encodeURIComponent(bandName)
    if (apiName == "youtube") {
        apiUrl = youtubeUrl
    }
    else if (apiName == 'ticketMaster') {
        apiUrl = ticketMasterUrl
    }
    else {
        apiUrl = wikiUrl
    }
    console.log(apiUrl);

    fetch(apiUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
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
        console.log(err);
        // $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


//Step 1 take input from the user
function regesterButtonClick(){
    $(`#button`).click(function (event) {
        event.preventDefault();
        let bandName = $('#showBandChoice').val();
        getBandInfo(bandName,'youtube');
        getBandInfo(bandName,'ticketMaster');
        getBandInfo(bandName,'wiki');
    });
}

regesterButtonClick();
function showBandInfo(responseJson){
}

function getBandInfo(bandName){
    fetch(`https://www.googleapis.com/youtube/v3//search?part=snippet&q=YouTube+Data+API&type=video&videoCaption=closedCaption&key=AIzaSyAV-iYlcoNVSMiws_hA_guBlxdTtLJd8p4`,
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=I8PyHDOwCGKXot8NEFNzlL2zagthWIXD`,
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${bandName}&format=json`)
    .then(response => response.json())
    .then(responseJson =>  showBandInfo(responseJson))
    .catch(error => console.log(error));
}

function regesterButtonClick(){
    $(`#button`).click(function (event) {
        event.preventDefault();
        let bandName = $('#showBandChoice').val();
        getBandInfo(bandName);
    });
}

regesterButtonClick();
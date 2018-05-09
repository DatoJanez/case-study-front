const states = {
    dom: [],
}

function subscribe(stateName, callback){
    if (!states[stateName]) return;
    states[stateName].push(callback)
}

function reduce(stateName, ){

}

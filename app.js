const localDB = new PouchDB('offline-first-demo')
const remoteDB = 'http://localhost:5984/offline-first-demo'

const headerText = document.getElementById('header');
const textInput = document.getElementById('textInput');
const button = document.getElementById('saveChangeButton');

localDB.sync(remoteDB, {live: true, retry: true
}).on('change', function(change) {
    console.log('Synced!', change)
}).on('error', function(e){
    console.log('Sync error: ', e)
})

button.onclick = () => {
    headerText.textContent = textInput.value

    localDB.post({
        text: textInput.value,
        timestamp: new Date().getTime()
    })
    .then(function(response) {
        console.log('Locally saved!', response)
    })
    .catch(function(e) {
        console.log('Error: ', e)
    })
};

/*
localDB.put({
    _id: 'test',
    text: 'Hello offline world'
}).then(function(response) {
    console.log('Locally saved!', response)
}).catch(function(e){
    console.log('Error: ', e)
})
*/
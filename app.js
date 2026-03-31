const localDB = new PouchDB("offline-first-demo");
const remoteDB = "http://localhost:5984/offline-first-demo";

const headerText = document.getElementById("header");
const textInput = document.getElementById("textInput");
const colorInput = document.getElementById("colorInput");
const button = document.getElementById("saveChangeButton");

localDB
  .sync(remoteDB, { live: true, retry: true })
  .on("change", function (change) {
    console.log("Synced!", change);
  })
  .on("error", function (e) {
    console.log("Sync error: ", e);
  });

localDB
  .get("header")
  .then(function (doc) {
    headerText.textContent = doc.text;
    headerText.style.color = doc.color;
  })
  .catch(function (e) {
    if (e.name == "not_found") {
      return localDB.put({
        _id: "header",
        text: headerText.textContent,
        color: headerText.style.color || "#000000",
      });
    }
  });

button.onclick = () => {
  localDB.get("header").then(function (doc) {
    return localDB
      .put({
        _id: "header",
        _rev: doc._rev,
        text: textInput.value || doc.text,
        color: colorInput.value || doc.color,
        timestamp: new Date().getTime(),
      })
      .then(function (response) {
        headerText.textContent = textInput.value || doc.text;
        headerText.style.color = colorInput.value || doc.color;
        console.log("Locally saved!", doc);
      })
      .catch(function (e) {
        console.log("Error", e);
      });
  });
};

const sheetName = "Clientes";
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty("key", activeSpreadsheet.getId());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty("key"));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function (header) {
      return header === "codigoCliente"
        ? sheet.getLastRow()
        : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    //var htmlOutput = HtmlService.createHtmlOutput('Se ha registrado exitosamente <a href="https://n9q7x3.csb.app/">Regresar</a>');
    //return htmlOutput;
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: e })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function checkCredentials(username, password) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  for (var i = 0; i < data.length; i++) {
    if (data[i][1] === username) {
      if (data[i][5] === password) {
        return data[i][0];
      } else {
        return "Contraseña incorrecta";
      }
    }
  }
  return "Usuario no registrado";
}

function doGet(e) {
  var username = e.parameter.username;
  var password = e.parameter.password;
  var result = checkCredentials(username, password);
  return ContentService.createTextOutput(result);
}

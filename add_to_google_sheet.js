(function() {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const sheetName = 'Sheet1';
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A:A:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

    function getElementByXPath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    const productTitleElement = getElementByXPath('//*[@id="yDetailTopWrap"]/div[2]/div[1]/div/h2');
    const productTitle = productTitleElement ? productTitleElement.textContent.trim() : 'Title not found';

    const data = {
        values: [[productTitle]]
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            alert('Product title added to Google Sheet successfully!');
        } else {
            alert('Failed to add product title to Google Sheet.');
        }
    }).catch(() => {
        alert('Error occurred while adding product title to Google Sheet.');
    });
})();

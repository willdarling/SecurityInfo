

function presentCertificate() {
    var input = document.getElementById("userInput").value;
    alert(input);
}

async function retrieveCertificate(details) {
  try {
    let securityInfo = await browser.webRequest.getSecurityInfo(
      details.requestId,
      {"certificateChain": true}
    );
    let rootCertificate = securityInfo.certificates[securityInfo.certificates.length - 1];
    let rootName = rootCertificate.subject;
    let chainLength = securityInfo.certificates.length;
    let builtIn = rootCertificate.isBuiltInRoot ? "is" : "is not";
    let timeValid = securityInfo.isNotValidAtThisTime ? "is not" : "is";
    let extendedVal = securityInfo.isExtendedValidation ? "is" : "is not";

    var message = "The root certificate issuer is "+rootName+". The certificate is the root of"+
                  " a chain of "+chainLength+" certificates. This certificate "+builtIn+ "a certificate"+
                  " automatically trusted by this browser. This certificate "+timeValid+" valid at this time."+
                  " This certificate "+extendedVal+" an extended validation certificate";
    alert(message);
  }
  catch(error) {
    console.error(error);
  } 
}

/*
Listen for all onHeadersReceived events.
*/
browser.webRequest.onHeadersReceived.addListener(retrieveCertificate,
  {urls: ["<all_urls>"]},
  ["blocking"]
);
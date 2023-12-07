window.addEventListener('DOMContentLoaded', () => {
    console.log('loaded')
    const resultList = document.getElementById("result");
    const mainCont = document.getElementById("mainCont");
    document.getElementById('autoFillEmail').addEventListener('click', function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            const activeTab = tabs[0];
            console.log('first')
            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"})
        })
    })
    console.log('Here')


    chrome.storage.local.get("saved_emails", (resp) => {

        if (resp.saved_emails && resp.saved_emails.length > 0) {
            resp.saved_emails.forEach(email => {
                const liElem = document.createElement("li")
                liElem.innerText = email
                liElem.addEventListener("click", () => {
                    navigator.clipboard.writeText(email);
                    DisplayChild("#e19526", "Email is copied to clipboard!")
                })
                resultList.appendChild(liElem)
            })

            const ClearButton = document.createElement("button")
            ClearButton.innerText = "Clear Memory"
            ClearButton.setAttribute("id", "ClearButton")
            ClearButton.addEventListener("click", () => {
                chrome.storage.local.remove("saved_emails")
                window.close()
            })
            mainCont.appendChild(ClearButton)
        }

    })
    
})

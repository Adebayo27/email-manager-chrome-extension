function reFetchEmails() {
  chrome.storage.local.get("saved_emails", (resp) => {
    if (resp.saved_emails !== undefined) prevEmails = resp.saved_emails;
  });
}

function callApi() {
    fetch(
        `https://jsonplaceholder.typicode.com/users/${randomNumber(1, 10)}`
      )
    .then((response) => response.json())
    .then((json) => {})
}

let prevEmails = [];

reFetchEmails();


const allInputs = document.querySelectorAll(
  'input[name="email"], input[type="email"]'
);

setTimeout(() => {

    //call api if email inputs are found
    callApi()


  allInputs.forEach((input) => {
    input.addEventListener("focusout", function () {
      // let suggestions = document.getElementById('pm-suggestions');
      // if(suggestions) suggestions.style.display = 'none'
    });
    input.addEventListener("focusin", async function () {
      //Close the existing list if it is open
      closeList();
      // //If the input is empty, exit the function
      reFetchEmails();
      if (prevEmails.length == 0) {
        suggestions = document.createElement("div");
        suggestions.setAttribute("id", "pm-suggestions");
        this.parentNode.appendChild(suggestions);
        suggestion = document.createElement("button");
        suggestion.innerHTML = "Autofill";
        suggestion.addEventListener("click", function () {
          fetch(
            `https://jsonplaceholder.typicode.com/users/${randomNumber(1, 10)}`
          )
            .then((response) => response.json())
            .then((json) => {
            //   console.log(json);
              let email = json?.email.toLowerCase();
              input.value = email;
              chrome.storage.local.get("saved_emails", (resp) => {
                if (resp.saved_emails && resp.saved_emails.length > 0) {
                  chrome.storage.local.set({
                    saved_emails: [...resp.saved_emails, email],
                  });
                } else {
                  chrome.storage.local.set({ saved_emails: [email] });
                }
              });
            });
          closeList();
        });
        suggestions.appendChild(suggestion);
        return;
      }

      //Create a suggestions <div> and add it to the element containing the input field
      suggestions = document.createElement("div");
      suggestions.setAttribute("id", "pm-suggestions");
      this.parentNode.appendChild(suggestions);
      suggestions.style.backgroundColor = "white";
      suggestions.style.color = "black";
      suggestions.style.borderRadius = "5px";
      suggestions.style.padding = "5px";
      suggestions.style.position = "absolute";
      suggestions.style.zIndex = 1;
      // suggestions.style.boxShadow = 'inset 0 0 20px #000000'
      suggestions.style.boxShadow = "5px 10px 20px black";
      title = document.createElement("div");
      title.innerHTML = "Email Manager";
      title.style.color = "blue";
      suggestions.appendChild(title);
      //Iterate through all entries in the list and find matches
      for (let i = 0; i < prevEmails.length; i++) {
        // if (prevEmails[i].toUpperCase().includes(this.value.toUpperCase())) {
        //If a match is found, create a suggestion <div> and add it to the suggestions <div>
        suggestion = document.createElement("div");
        suggestion.innerHTML = prevEmails[i];

        suggestion.addEventListener("click", function () {
          input.value = this.innerHTML;
          closeList();
        });
        suggestion.style.cursor = "pointer";

        suggestions.appendChild(suggestion);
        // }
      }
    });

    function closeList() {
      let suggestions = document.getElementById("pm-suggestions");
      if (suggestions) suggestions.parentNode.removeChild(suggestions);
    }
  });
}, 500);

// chrome.runtime.sendMessage({ greeting: "get-user-data" }, (response) => {
//   console.log("received user data", response);
// });

const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);
inputs.forEach((input, id) => {
  const icon = document.createElement("div");
  icon.innerHTML = `
    <div
        class="pass-manager"
        data-pmId="generative-pm-button-${id}"
        style="transition: background-color 0.2s ease-in-out 0s"
        >
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0)">
            <path
                d="M12.0012 24C18.627 24 24.0024 18.6284 24.0024 12.0012C24.0024 5.37165 18.6294 0 12.0012 0C5.37299 0 0 5.37165 0 11.9988C0 18.6284 5.37299 24 12.0012 24Z"
                fill="#499557"
            ></path>
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.735 2.94507L14.5796 2.87709L14.735 2.94993C14.7374 2.94993 14.735 2.9475 14.735 2.94507Z"
                fill="white"
            ></path>
            <path
                d="M15.7402 20.5184C15.3542 20.5184 15.041 20.8316 15.041 21.2176C15.041 21.6036 15.3542 21.9168 15.7402 21.9168C16.1263 21.9168 16.4395 21.6036 16.4395 21.2176C16.4395 20.8291 16.1263 20.5184 15.7402 20.5184Z"
                fill="white"
            ></path>
            <path
                d="M13.7979 16.8595H10.1172V17.5611H13.7979V16.8595Z"
                fill="white"
            ></path>
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.58908 8.47586V16.0097C5.58908 16.1942 5.73961 16.3448 5.92413 16.3448H18.0807C18.2653 16.3448 18.4158 16.1942 18.4158 16.0097V8.47586C18.4158 8.29134 18.2653 8.14081 18.0807 8.14081H5.92413C5.73718 8.14081 5.58908 8.28891 5.58908 8.47586ZM8.60699 13.3706C8.00972 13.3706 7.52656 12.8874 7.52656 12.2901C7.52656 11.6929 8.00972 11.2097 8.60699 11.2097C9.20426 11.2097 9.68741 11.6929 9.68741 12.2901C9.68741 12.885 9.20426 13.3706 8.60699 13.3706ZM15.3979 13.3706C14.8006 13.3706 14.3175 12.8874 14.3175 12.2901C14.3175 11.6929 14.8006 11.2097 15.3979 11.2097C15.9952 11.2097 16.4783 11.6929 16.4783 12.2901C16.4783 12.885 15.9952 13.3706 15.3979 13.3706Z"
                fill="white"
            ></path>
            <path
                d="M17.7044 18.0856H6.30289C6.11837 18.0856 5.96783 18.2361 5.96783 18.4206V19.6807V19.9988H13.3244H13.4847V20.159V23.9053C15.1284 23.7014 16.6677 23.1672 18.037 22.3709V19.6783V18.4182C18.037 18.2337 17.8889 18.0856 17.7044 18.0856ZM15.7426 22.434C15.0677 22.434 14.5238 21.8877 14.5238 21.2152C14.5238 20.5402 15.0701 19.9963 15.7426 19.9963C16.4176 19.9963 16.9615 20.5426 16.9615 21.2152C16.959 21.8901 16.4127 22.434 15.7426 22.434Z"
                fill="white"
            ></path>
            <path
                d="M5.96539 22.3709C7.73778 23.4052 9.79908 24 11.9988 24C12.3241 24 12.6446 23.983 12.9627 23.9587V20.5184H5.96539V22.3709ZM6.98269 21.1083H7.45856H11.9478C12.0862 21.1083 12.1979 21.22 12.1979 21.3584C12.1979 21.4968 12.0862 21.6085 11.9478 21.6085H6.98269C6.8443 21.6085 6.73262 21.4968 6.73262 21.3584C6.73262 21.22 6.8443 21.1083 6.98269 21.1083Z"
                fill="white"
            ></path>
            <path
                d="M4.13232 21.0574C4.5475 21.4167 4.98452 21.7493 5.44583 22.0504V19.9842C5.06707 19.9842 4.47952 20.3241 4.13232 21.0574Z"
                fill="white"
            ></path>
            <path
                d="M19.8701 21.0573C19.5205 20.3265 18.9329 19.9866 18.5566 19.9866V22.0504C19.0179 21.7469 19.4574 21.4167 19.8701 21.0573Z"
                fill="white"
            ></path>
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.8628 7.91018C12.3848 6.04796 13.7469 3.76814 14.5602 2.90137L14.5772 2.87709C14.5894 2.8601 14.6088 2.85039 14.6258 2.85039C14.7107 2.85282 14.7277 2.90866 14.7326 2.94508L14.7399 2.94993L14.735 2.95236L14.684 2.97664C13.5551 4.40183 12.5742 6.15722 12.1323 8.00001C12.851 8.12626 13.2856 7.54599 13.4992 7.08225C13.5041 7.07011 13.4944 7.05069 13.4822 7.04826L13.1156 6.956C13.0913 6.95115 13.0913 6.9123 13.1156 6.90744L13.5575 6.7909C13.8294 6.73021 14.1499 6.1475 14.2907 5.86829C14.2956 5.85615 14.2907 5.84159 14.2786 5.8343L13.9192 5.64007C13.8974 5.62793 13.9047 5.59637 13.929 5.59394L14.6161 5.53324C14.6209 5.53324 14.6306 5.52838 14.6331 5.5211L15.0409 4.80729C15.0507 4.79272 15.0458 4.77573 15.0288 4.77087L14.6306 4.60577C14.6063 4.59363 14.6088 4.55964 14.6355 4.55722L15.1842 4.50866C15.189 4.50866 15.1988 4.5038 15.2012 4.49652L15.5921 3.82884C15.5969 3.8167 15.5969 3.80213 15.5824 3.79485L15.1842 3.55206C15.1623 3.53992 15.1721 3.5035 15.1988 3.50593L15.6528 3.54235C15.6625 3.54235 15.6746 3.53749 15.6771 3.52535L16.2865 1.66799C16.2913 1.65342 16.2816 1.63643 16.2622 1.64128C15.3566 1.59758 14.6452 1.83552 14.3854 1.97148C14.3757 1.97634 14.3733 1.98605 14.3733 1.99576L14.417 2.44978C14.4218 2.47649 14.383 2.48863 14.3708 2.46435L14.2057 2.17543C14.2009 2.16571 14.1887 2.16086 14.179 2.16329C13.7153 2.25797 13.101 3.0082 12.8412 3.38453C12.8364 3.38939 12.8364 3.3991 12.8364 3.40638L13.05 3.94781C13.0598 3.97209 13.0331 3.99151 13.0112 3.97452L12.7126 3.72687C12.7029 3.72201 12.6907 3.71716 12.681 3.72687C12.528 3.87011 12.1493 4.60577 11.9672 4.97725C11.9623 4.98696 11.9623 4.99424 11.9721 5.00153L12.2877 5.46769C12.3022 5.48954 12.2755 5.51624 12.2537 5.50168L11.8385 5.22489C11.8288 5.22004 11.8142 5.22004 11.807 5.22975C11.6783 5.38028 11.6249 5.9557 11.6127 6.24462C11.6127 6.24948 11.6176 6.25676 11.6224 6.26162L11.9065 6.53354C11.9235 6.54811 11.9114 6.57967 11.8895 6.57725L11.5739 6.55054C11.5617 6.54568 11.5496 6.55539 11.5472 6.56753C11.3772 7.35175 11.637 7.75964 11.8628 7.91018Z"
                fill="white"
            ></path>
            </g>
            <defs>
            <clipPath id="clip0">
                <rect width="24" height="24" fill="white"></rect>
            </clipPath>
            </defs>
        </svg>
        </div>
    `; // Font Awesome class for an envelope icon
  // Append the icon to the input container
  icon.className = "popupMark";
  input.parentNode.insertBefore(icon, input);
  input.setAttribute("data-pmId", `generative-pm-input-${id}`);

  // Adjust input padding to make room for the icon
  // input.style.paddingLeft = `${icon.offsetWidth + 20}px`;
});

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

document.querySelectorAll(".pass-manager").forEach((item, i) => {
  item.addEventListener("click", (event) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${randomNumber(1, 10)}`)
      .then((response) => response.json())
      .then((json) => {
        let email = json?.email.toLowerCase();
        item.parentElement.nextSibling.value = email;
        chrome.storage.local.get("saved_emails", (resp) => {
          if (resp.saved_emails && resp.saved_emails.length > 0) {
            chrome.storage.local.set({
              saved_emails: [...resp.saved_emails, email],
            });
          } else {
            chrome.storage.local.set({ saved_emails: [email] });
          }
        });
      });
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  
  if (request.message == "clicked_browser_action") {
    const inputs = document.querySelectorAll(
      'input[name="email"], input[type="email"]'
    );
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((json) => {
        if(document.activeElement.tagName.toLowerCase() == 'input'){
            document.activeElement.value = json?.email
        }
      });
  }
  return true;
});


const shortenForm = document.querySelector(".shortener-form");
const inputURL = document.querySelector(".long-url");
const barsBtn = document.querySelector(".bars-btn");
const navAuthContainer = document.querySelector(".nav-auth-container");
const errorSpan = document.querySelector(".err-msg");
const outputContainer = document.querySelector('.outputs-container')

const handleBarsClick = () => {
    navAuthContainer.classList.toggle("open");
};

const showError = (input) => {
    let message = '';
    if (input.validity.valueMissing) {
        message = 'This field is required';
    } else if (input.validity.typeMismatch) {
        message = 'Please enter a valid URL';
    }

    input.setCustomValidity(message);

    input.classList.add('invalid');
    errorSpan.textContent = message;
};

const clearError = (input) => {
    input.setCustomValidity('');
    errorSpan.textContent = '';

    input.classList.remove('invalid');
};

// Function to render stored URLs from localStorage
const renderStoredUrls = () => {
    const storedUrls = JSON.parse(localStorage.getItem("shortenedUrls")) || {};

    // Loop through the stored URLs and create DOM elements for each
    Object.keys(storedUrls).forEach((longUrl) => {
        const shortenedUrl = storedUrls[longUrl];

        // Create the output element dynamically
        const outputValue = document.createElement("div");
        outputValue.classList.add("output-value");

        outputValue.innerHTML = `
            <a href="${longUrl}" target="_blank" class="output-long-url">${longUrl}</a>
            <div class="output-url-copy-btn">
                <a href="${shortenedUrl}" target="_blank" class="shortened-url">${shortenedUrl}</a>
                <button class="copy-btn" data-target=".shortened-url">copy</button>
            </div>
        `;

        // Append the new element to the outputs container
        outputContainer.appendChild(outputValue);

        // Add copy functionality to the button
        const copyButton = outputValue.querySelector(".copy-btn");
        copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(shortenedUrl)
                .then(() => {
                    // Change the button’s label
                    copyButton.textContent = 'Copied!';
                    copyButton.classList.add('copied');

                    // Revert after 2 seconds
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                        copyButton.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Copy failed', err);
                });
        });
    });
};

const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!shortenForm.checkValidity()) {
        const firstInvalid = shortenForm.querySelector(':invalid');
        firstInvalid.focus();
        showError(firstInvalid);
        return;
    }

    const longUrl = inputURL.value.trim();

    if (!longUrl) {
        console.log("No URL provided.");
        return;
    }

    console.log("Shortening…");

    // Check if the URL is already shortened
    const storedUrls = JSON.parse(localStorage.getItem("shortenedUrls")) || {};
    if (storedUrls[longUrl]) {
        alert("This URL has already been shortened!");
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ url: longUrl }),
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        console.log(data.result_url);

        // Save the longUrl and shortened URL in localStorage
        storedUrls[longUrl] = data.result_url;
        localStorage.setItem("shortenedUrls", JSON.stringify(storedUrls));

        // Create the output element dynamically
        const outputValue = document.createElement("div");
        outputValue.classList.add("output-value");

        outputValue.innerHTML = `
            <span class="delete-btn" title="Delete">&times;</span>
            <a href="${longUrl}" target="_blank" class="output-long-url">${longUrl}</a>
            <div class="output-url-copy-btn">
                <a href="${data.result_url}" target="_blank" class="shortened-url">${data.result_url}</a>
                <button class="copy-btn" data-target=".shortened-url">copy</button>
            </div>
        `;

        // Append the new element to the outputs container
        outputContainer.appendChild(outputValue);

        // Add the 'show' class after a short delay to trigger the transition
        setTimeout(() => {
            outputValue.classList.add("show");
        }, 10);

        // Add copy functionality to the button
        const copyButton = outputValue.querySelector(".copy-btn");
        copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(data.result_url)
                .then(() => {
                    // Change the button’s label
                    copyButton.textContent = 'Copied!';
                    copyButton.classList.add('copied');

                    // Revert after 2 seconds
                    setTimeout(() => {
                        copyButton.textContent = 'Copy text';
                        copyButton.classList.remove('copied');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Copy failed', err);
                });
        });
        // Add delete functionality to the delete button
        const deleteButton = outputValue.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            const confirmDelete = confirm("Are you sure you want to delete this shortened URL?");
            if (confirmDelete) {
                // Remove the element from the DOM with a smooth transition
                outputValue.classList.add("hide");
                setTimeout(() => {
                    outputValue.remove();
                }, 300); // Match the CSS transition duration

                // Remove the URL from localStorage
                delete storedUrls[longUrl];
                localStorage.setItem("shortenedUrls", JSON.stringify(storedUrls));

                // Notify the user
                alert("The shortened URL has been deleted.");
            }
        });
    } catch (err) {
        alert(err.message);
    }
};

// Attach event listeners
barsBtn.addEventListener("click", handleBarsClick);
shortenForm.addEventListener("submit", handleFormSubmit);
inputURL.addEventListener("input", () => clearError(inputURL));
inputURL.addEventListener("focus", () => clearError(inputURL));

// Render stored URLs on page load
renderStoredUrls();

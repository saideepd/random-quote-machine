const projectName = "random-quote-machine";
let quotesData;

const colors = [
    "#264653",
    "#2a9d8f",
    "#f4a261",
    "#e76f51",
    "#ef476f",
    "#06d6a0",
    "#118ab2",
    "#073b4c",
    "#669bbc",
    "#fe6d73",
    "#4b3f72",
    "#1a659e",
    "#E64A19",
    "#F9A825",
    "#795548",
    "#757575"
];

var currentQuote = "",
    currentAuthor = "";

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: "application/json"
        },
        url: "https://type.fit/api/quotes",
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === "string") {
                quotesData = JSON.parse(jsonQuotes);
                //console.log("quotesData");
                //console.log(quotesData);
            }
        }
    });
}

function getRandomQuote() {
    return quotesData[Math.floor(Math.random() * quotesData.length)];
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote;
    currentAuthor = randomQuote.author;
    $("#tweet-quote").attr(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '"' + currentAuthor)
    );

    $(".quote-text").animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);

        $("#text").text(randomQuote.text);
    });

    $(".quote-author").animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);

        $("#author").html(randomQuote.author);
    });

    var color = Math.floor(Math.random() * colors.length);
    $("html body").animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },
        1000
    );
    $(".button").animate(
        {
            backgroundColor: colors[color]
        },
        1000
    );
}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });

    $("#new-quote").on("click", getQuote);
});

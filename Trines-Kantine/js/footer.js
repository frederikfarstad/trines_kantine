const footer = document.createElement("footer")
footer.id = "footer"
const text_content = document.createElement("div")
text_content.id = "text_content"
const logo = document.createElement("img")
logo.src = "/p1-p2-p3-p4/img/logo.png"
logo.alt = "Logo"
const span = document.createElement("span")
span.id = "images"

const images = [{src: "/p1-p2-p3-p4/img/twitter.png", alt: "Twitter-logo"}, 
{src: "/p1-p2-p3-p4/img/facebook.png", alt: "Facebook-logo"}, 
{src: "/p1-p2-p3-p4/img/instagram.png", alt: "Instagram-logo"}]

function main(){
    document.body.appendChild(footer);
    footer.appendChild(logo)
    footer.appendChild(text_content);
    let text = document.createElement("p")
    text.innerText = "Feedback";
    text_content.appendChild(text);
    text_content.appendChild(span);
    for (let i = 0; i < images.length; i++) {
        let img = document.createElement("img");
        img.src = images[i].src
        img.alt = images[i].alt
        img.className = "soMe"
        span.appendChild(img)
    }
    let copyright = document.createElement("p")
    copyright.innerText = "Copyright © 2021 Trines Kantine. All rights reserved."
    text_content.appendChild(copyright);
}
main()
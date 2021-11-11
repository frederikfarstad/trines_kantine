const footer = document.createElement("footer")
footer.id = "footer"
const text_content = document.createElement("div")
text_content.id = "text_content"
const logo = document.createElement("img")
logo.src = "img/logo2.png"
logo.alt = "Logo"
const span = document.createElement("span")
span.id = "images"


const images = [{src: "img/twitter.png", alt: "Twitter-logo", href: "https://twitter.com"}, 
{src: "img/facebook.png", alt: "Facebook-logo", href: "https://facebook.com"}, 
{src: "img/instagram.png", alt: "Instagram-logo", href: "https://instagram.com"}]





function main(){
    document.body.appendChild(footer);
    footer.appendChild(logo)
    footer.appendChild(text_content);
    let text = document.createElement("p")
    text.innerText = "Feedback";
    text_content.appendChild(text);
    text_content.appendChild(span);
    for (let i = 0; i < images.length; i++) {
        const a = document.createElement("a")
        let img = document.createElement("img");
        img.src = images[i].src
        img.alt = images[i].alt
        a.href = images[i].href
        img.className = "soMe"
        a.appendChild(img)
        span.appendChild(a)
        
        
    }

    let copyright = document.createElement("p")
    copyright.innerText = "Copyright © 2021 Trines Kantine. All rights reserved."
    text_content.appendChild(copyright);
}
main()
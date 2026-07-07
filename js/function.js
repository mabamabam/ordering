


document.addEventListener("DOMContentLoaded", function(){

        // 도마뱀
        window.addEventListener("scroll", () => {
            const y = window.scrollY;

            document.querySelector(".bg").style.transform =
                `translateY(${y * 0.15}px)`;
        });

        
        // 마우스
        const glow = document.querySelector(".cursor-glow");

        document.addEventListener("mousemove", (e)=>{

            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";

        });

    
        // readymade gallery
        const gallery = document.getElementById("gallery");
        const galleryData = [
            {unsold: "images/black/15.jpg"},
            {unsold: "images/black/73.jpg"},
            {unsold: "images/black/85.jpg"},
            {unsold: "images/black/58.jpg"},
            {unsold: "images/black/97.jpg"},
            {unsold: "images/black/40.jpg"},
            {unsold: "images/black/67.jpg"},
            {unsold: "images/black/87.jpg"},
            {unsold: "images/blue/61.jpg"},
            {unsold: "images/black/57.jpg"},
            {unsold: "images/black/79.jpg"},
            {unsold: "images/black/14.jpg"},
            {unsold: "images/white/44.jpg"},
            {unsold: "images/black/69.jpg"},
            {unsold: "images/white/107.jpg"},
            {unsold: "images/white/18.jpg"},
            {unsold: "images/yell/108.jpg"},
            {unsold: "images/yell/41.jpg"},
            {unsold: "images/yell/75.jpg"},
            {unsold: "images/yell/106.jpg"},
            {unsold: "images/yell/92.jpg"},
            {unsold: "images/yell/47.jpg"},
            {unsold: "images/yell/114.jpg"},
            {unsold: "images/yell/22.jpg"},
            {unsold: "images/green/12.jpg"},
            {unsold: "images/green/21.jpg"},
            {unsold: "images/green/66.jpg"},
            {unsold: "images/green/54.jpg"},
            {unsold: "images/green/59.jpg"},
            {unsold: "images/green/32.jpg"},
            {unsold: "images/green/74.jpg"},
            {unsold: "images/green/94.jpg"},
            {unsold: "images/green/62.jpg"},
            {unsold: "images/green/31.jpg"},
            {unsold: "images/green/102.jpg"},
            {unsold: "images/blue/95.jpg"},
            {unsold: "images/blue/28.jpg"},
            {unsold: "images/blue/111.jpg"},
            {unsold: "images/blue/117.jpg"},
            {unsold: "images/blue/64.jpg"},
            {unsold: "images/blue/50.jpg"},
            {unsold: "images/blue/120.jpg"},
            {unsold: "images/blue/101.jpg"},
            {unsold: "images/blue/33.jpg"},
            {unsold: "images/blue/72.jpg"},
            {unsold: "images/blue/55.jpg"},
            {unsold: "images/blue/81.jpg"},
            {unsold: "images/blue/86.jpg"},
            {unsold: "images/blue/100.jpg"},
            {unsold: "images/blue/45.jpg"},
            {unsold: "images/blue/27.jpg"},
            {unsold: "images/blue/118.jpg"},
            {unsold: "images/blue/3.jpg"},
            {unsold: "images/blue/105.jpg"},
            {unsold: "images/blue/99.jpg"},
            {unsold: "images/white/113.jpg"},
            {unsold: "images/white/115.jpg"},
            {unsold: "images/white/104.jpg"},
            {unsold: "images/yell/43.jpg"},
            {unsold: "images/yell/119.jpg"},
            {unsold: "images/yell/16.jpg"},
            {unsold: "images/red/112.jpg"},
            {unsold: "images/red/121.jpg"},
            {unsold: "images/red/30.jpg"},
            {unsold: "images/red/56.jpg"},
            {unsold: "images/red/96.jpg"},
            {unsold: "images/red/93.jpg"},
            {unsold: "images/red/7.jpg"},
            {unsold: "images/red/78.jpg"},
            {unsold: "images/red/68.jpg"},
            {unsold: "images/red/25.jpg"},
        ];

        function renderGallery() {

        gallery.innerHTML = "";
        galleryData.forEach((item) => {

            const article = document.createElement("article");
            article.classList.add("gallery-item");


            article.innerHTML = `
                <img src="${item.unsold}" />
            `;

            gallery.appendChild(article);

        });

    }

    renderGallery();
    
  
});


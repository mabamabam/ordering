


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

  
});


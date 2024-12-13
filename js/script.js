document.addEventListener("DOMContentLoaded", () => {
  const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Обробник події для бургер-меню
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');

      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7}s`;
        }
      });
      burger.classList.toggle('toggle');
    });
  };

  navSlide();
});

let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function() {
  const scrollTop = document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-87px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = scrollTop;
});

// Ініціалізація Swiper для слайдера
new Swiper('.swiper', {
  loop: true,
  spaceBetween: 24,
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1260: {
      slidesPerView: 2,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const teamContainer = document.getElementById("team");

  fetch("json/team.json")
    .then(response => {
      if (!response.ok) throw new Error("Error fetching the data");
      return response.json();
    })
    .then(data => {
      data.forEach(member => {
        const memberCard = document.createElement("div");
        memberCard.classList.add("team-member");

        memberCard.innerHTML = `
          <img src="${member.photo}" alt="${member.name}">
          <div class="member-wrapper">
            <p class="member-name">${member.name}</p>
            <p class="member-role">${member.role}</p>
            <div class="social-icons">
              <a href="${member.social.facebook}" target="_blank"><i class="fab fa-facebook"></i></a>
              <a href="${member.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
              <a href="${member.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>
        `;

        teamContainer.appendChild(memberCard);
      });
    })
    .catch(error => console.error("Error:", error));
});

const contentContainer = document.getElementById('news-container');
function createNews(item) {
  return `
    <div class="news">
      <img src="${item.image}" alt="${item.title}">
      <div class="news-content">
        <h3 class="news-title">${item.title}</h3>
        <p class="news-date">${item.date}</p>
        <p class="news-description">${item.description}</p>
      </div>
    </div>
  `;
}

fetch('json/news.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      contentContainer.innerHTML += createNews(item);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));

  window.addEventListener("load", () => {
    document.body.setAttribute("data-loaded", "true");
  });



  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const isVisited = localStorage.getItem("isVisited");

    const missClickWarning = document.getElementById("missClickWarning");
    missClickWarning.id = "missClickWarning"; 
  
    if (!isVisited) {
      modal.style.display = "flex";
      localStorage.setItem("isVisited", "true");
    }
  
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        missClickWarning.style.display = "block";
        setTimeout(() => {
          missClickWarning.style.display = "none";
        }, 2000);
      }
    });
  });
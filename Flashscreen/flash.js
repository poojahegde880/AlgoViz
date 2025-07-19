// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Initialize particles.js with purple color
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#8e2de2"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#8e2de2",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
  
  // Bubble Sort Visualization
  async function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          await new Promise((resolve) => setTimeout(resolve, 50));
          updateBars(arr);
        }
      }
    }
  }
  
  async function reverseBubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] < arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          await new Promise((resolve) => setTimeout(resolve, 50));
          updateBars(arr);
        }
      }
    }
  }
  
  function generateRandomArray(size, min, max) {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
  }
  
  function createBars(arr) {
    let barsContainer = document.getElementById('bars-container');
    barsContainer.innerHTML = '';
  
    for (let i = 0; i < arr.length; i++) {
      let bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = arr[i] + 'px';
      barsContainer.appendChild(bar);
    }
  }
  
  function updateBars(arr) {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < arr.length; i++) {
      bars[i].style.height = arr[i] + 'px';
    }
  }
  
  async function animateSort() {
    let arr = generateRandomArray(15, 20, 250);
    createBars(arr);
  
    while (true) {
      await bubbleSort([...arr]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await reverseBubbleSort([...arr].reverse());
      await new Promise(resolve => setTimeout(resolve, 1000));
      arr = generateRandomArray(15, 20, 250);
      createBars(arr);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Start animations when page loads
  window.addEventListener('load', () => {
    animateSort();
    
    // Add scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
      observer.observe(el);
    });
  });
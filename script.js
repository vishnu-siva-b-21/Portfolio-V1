$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // typing text animation script
  var typed = new Typed(".typing", {
    strings: ["Developer", "College Student", "Designer", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".typing-2", {
    strings: ["Developer", "College Student", "Designer", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });

  // owl carousel script
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });
});

function send_message() {
  // Get form input values
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  var targetElement = document.getElementById("home");

  // Validate form inputs
  if (name.trim() === "") {
    swal({
      title: "Validation Error!",
      text: "Please fill in all fields",
      icon: "error",
    }).then(() => {
      document.getElementById("name").focus();
    });
    return;
  }

  const nameRegex = /^[A-Za-z\s]+$/;
  if (!name.match(nameRegex)) {
    swal({
      title: "Validation Error!",
      text: "Name must not contain special characters or numbers",
      icon: "error",
    }).then(() => {
      document.getElementById("name").focus();
    });
    return;
  }

  if (name.trim().length <= 2) {
    swal({
      title: "Validation Error!",
      text: "Name field must have more than two characters",
      icon: "error",
    }).then(() => {
      document.getElementById("name").focus();
    });
    return;
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email.match(emailRegex)) {
    swal({
      title: "Validation Error!",
      text: "Please enter a valid email address",
      icon: "error",
    }).then(() => {
      document.getElementById("email").focus();
    });
    return false;
  }

  if (subject.trim() === "" || message.trim() === "") {
    swal({
      title: "Validation Error!",
      text: "Please fill in all fields",
      icon: "error",
    }).then(() => {
      if (subject.trim() === "") {
        document.getElementById("subject").focus();
      } else if (message.trim() === "") {
        document.getElementById("message").focus();
      }
    });
    return false;
  }

  let templateParams = {
    from_name: name,
    email: email,
    subject: subject,
    message: message,
  };

  const service_id = window.env.SERVICE_ID;
  const template_id = window.env.TEMPLATE_ID;
  const publicKey = window.env.PUBLIC_KEY;

  emailjs
    .send(service_id, template_id, templateParams, publicKey)
    .then((response) => {
      swal({
        title: "Email sent successfully!",
        text: "Thanks for reaching out",
        icon: "success",
      });
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      // Reset form fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      swal({
        title: "Email could not be sent!",
        text: "Please try again one more time",
        icon: "error",
      }).then(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      });
    });
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    send_message(); // Call your function to handle form submission
  });

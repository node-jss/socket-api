 

 $(document).ready(function($) {

     'use strict';
     setTimeout(function() {
        $('#home').css({'background-image' : 'url(/img/bg_home.jpg)'});

        $('.flip-items a.singapore').css({'background-image' : 'url(../img/clients/singapore_640.png)'});

        $('.flip-items a.china').css({'background-image' : 'url(../img/clients/flags_PNG14606.png)'});

        $('.flip-items a.korea').css({'background-image' : 'url(../img/clients/korea_south_640.png)'});
        $('.flip-items a.india').css({'background-image' : 'url(../img/clients/11-2-india-flag-transparent.png)'});
        $('.flip-items a.malaysia').css({'background-image' : 'url(../img/clients/malaysia_640.png)'});
        $('.flip-items a.germany').css({'background-image' : 'url(../img/clients/germany_640.png)'});
        $('.flip-items a.australia').css({'background-image' : 'url(../img/clients/Australia-Flag-Free-Download-PNG.png)'});
        $('.flip-items a.vietnam').css({'background-image' : 'url(../img/clients/6-2-vietnam-flag-png.png)'});

        $('.statistics-bg-image').css({'background-image' : 'url(/img/p2pbg.jpg)'});

        $('#contact').css({'background-image' : 'url(../img/contact.jpg)'});
        $('.clients').css({'background-image' : 'url(../img/bg.jpg)'});
        

        
     }, 1000);
  
     $('.lazy').show().lazy().removeClass('lazy');

    var affiliate = location.search;
    if (affiliate) {
        affiliate = affiliate.split("?");
        affiliate = affiliate[1].split("=");
       
        if (affiliate[0] == 'affiliate') {
            // SetCookie('ref', affiliate[1], 2);
            console.log(affiliate[0])
           
        }
    }

    function SetCookie(cookieName,cookieValue,nDays) {
     var today = new Date();
     var expire = new Date();
     if (nDays==null || nDays==0) nDays=1;
     expire.setTime(today.getTime() + 3600000*24*nDays);
     document.cookie = cookieName+"="+escape(cookieValue)
                     + ";expires="+expire.toGMTString();
    }


     $('#preloader').css('display', 'none');


     // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
     $.material.init();

     // Sticky Navigation
     $("#sticky-nav").show().sticky({ topSpacing: 0 });


     // Smooth scroll 
     $(function() {
         $('a[href*="#"]:not([data-toggle="tab"])').on('click', function() {
             if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                 var target = $(this.hash);
                
                 target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                 if (target.length) {
                    $('.navbar-toggle').trigger('click');
                     $('html, body').animate({
                         scrollTop: target.offset().top
                     }, 1000);
                     return false;
                 }
             }
         });
     });


     // Typing text
     $("#animated-text").typed({
         strings: [
             "THE CRYPTO CURRENCY REVOLUTION"
         ],
         typeSpeed: 50,
         loop: true,
     });


     // Reveiws

     $("#clients #owl-carousel").owlCarousel({
         loop: true,
         items: 1,
         dots: true,
     });
     $("#slider").show();
     $("#slider").flipster({
    style: 'carousel',
    spacing: -0.1,
    nav: true,
    buttons: true,
});

     /*Blog*/

     $('#blog #blog-carousel').owlCarousel({
         loop: true,
         margin: 30,
         autoplay: true,
         nav: false,
         dots: false,
         responsive: {
             0: {
                 items: 1
             },
             300: {
                 items: 1
             },
             600: {
                 items: 2
             },
             900: {
                 items: 3
             },
             1200: {
                 items: 3
             }
         }
     });
    

     $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
         preventSubmit: true,
         submitError: function($form, event, errors) {
             // additional error messages or events
         },
         submitSuccess: function($form, event) {
             event.preventDefault(); // prevent default submit behaviour
             // get values from FORM
             var name = $("input#name").val();
             var email = $("input#email").val();
             var message = $("textarea#message").val();
             var firstName = name; // For Success/Failure Message
             // Check for white space in name for Success/Fail message
             if (firstName.indexOf(' ') >= 0) {
                 firstName = name.split(' ').slice(0, -1).join(' ');
             }
             $.ajax({
                 url: "././mail/sendmail.php",
                 type: "POST",
                 data: {
                     name: name,
                     email: email,
                     message: message
                 },
                 cache: false,
                 success: function() {
                     // Success message
                     $('#success').html("<div class='alert alert-success'>");
                     $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                         .append("</button>");
                     $('#success > .alert-success')
                         .append("<strong>Your message has been sent. </strong>");
                     $('#success > .alert-success')
                         .append('</div>');

                     //clear all fields
                     $('#contactForm').trigger("reset");
                 },
                 error: function() {
                     // Fail message
                     $('#success').html("<div class='alert alert-danger'>");
                     $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                         .append("</button>");
                     $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                     $('#success > .alert-danger').append('</div>');
                     //clear all fields
                     $('#contactForm').trigger("reset");
                 },
             })
         },
         filter: function() {
             return $(this).is(":visible");
         },
     });

     // HEADER PARTICLES EFFECT

     particlesJS("particles-js", {
         "particles": {
             "number": {
                 "value": 118,
                 "density": {
                     "enable": true,
                     "value_area": 800
                 }
             },
             "color": {
                 "value": "#ffffff"
             },
             "shape": {
                 "type": "polygon",
                 "stroke": {
                     "width": 1,
                     "color": "#ffffff"
                 },
                 "polygon": {
                     "nb_sides": 5
                 },
                 "image": {
                     "src": "img/github.svg",
                     "width": 100,
                     "height": 100
                 }
             },
             "opacity": {
                 "value": 0.21306986324071361,
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
                 "color": "#ffffff",
                 "opacity": 0.4,
                 "width": 1
             },
             "move": {
                 "enable": true,
                 "speed": 4.2,
                 "direction": "none",
                 "random": true,
                 "straight": false,
                 "out_mode": "out",
                 "bounce": false,
                 "attract": {
                     "enable": true,
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
                     "mode": "repulse"
                 },
                 "onclick": {
                     "enable": true,
                     "mode": "push"
                 },
                 "resize": true
             },
             "modes": {
                 "grab": {
                     "distance": 400,
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

 });

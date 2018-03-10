// countDown
const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date('april 29, 2018 00:00:00').getTime(),
    x = setInterval(function() {

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerHTML = Math.floor(distance / (day)),
        document.getElementById('hours').innerHTML = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes').innerHTML = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds').innerHTML = Math.floor((distance % (minute)) / second);

      //do something later when date is reached
      //if (distance < 0) {
      //  clearInterval(x);
      //  'IT'S MY BIRTHDAY!;
      //}

    }, second)

// Scrolly
    //this is where we apply opacity to the arrow
    $(window).scroll( function(){

      //get scroll position
      var topWindow = $(window).scrollTop();
      //multipl by 1.5 so the arrow will become transparent half-way up the page
      var topWindow = topWindow * 1.5;

      //get height of window
      var windowHeight = $(window).height();

      //set position as percentage of how far the user has scrolled
      var position = topWindow / windowHeight;
      //invert the percentage
      position = 1 - position;

      //define arrow opacity as based on how far up the page the user has scrolled
      //no scrolling = 1, half-way up the page = 0
      $('.arrow-wrap').css('opacity', position);

    });

    //Code stolen from css-tricks for smooth scrolling:
    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });

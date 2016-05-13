/*
 Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
*/
(function(){var b,f;b=this.jQuery||window.jQuery;f=b(window);b.fn.stick_in_parent=function(d){var A,w,J,n,B,K,p,q,k,E,t;null==d&&(d={});t=d.sticky_class;B=d.inner_scrolling;E=d.recalc_every;k=d.parent;q=d.offset_top;p=d.spacer;w=d.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=b(document);null==w&&(w=!0);J=function(a,d,n,C,F,u,r,G){var v,H,m,D,I,c,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));
if(!g.length)throw"failed to find stick parent";v=m=!1;(h=null!=p?p&&a.closest(p):b("<div />"))&&h.css("position",a.css("position"));x=function(){var c,f,e;if(!G&&(I=A.height(),c=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),d=parseInt(g.css("padding-bottom"),10),n=g.offset().top+c+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,
u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:a.outerWidth(!0),height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,c=q,z=E,l=function(){var b,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+c>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,c=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),
h.detach()),b={position:"",width:"",top:""},a.css(b).removeClass(t).trigger("sticky_kit:unstick")),B&&(b=f.height(),u+q>b&&!v&&(c-=l,c=Math.max(b-u,c),c=Math.min(q,c),m&&a.css({top:c+"px"})))):e>F&&(m=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+c>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),
a.css({position:"absolute",bottom:d,top:"auto"}).trigger("sticky_kit:bottom")},y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);b(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",
y),b(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,0)}};n=0;for(K=this.length;n<K;n++)d=this[n],J(b(d));return this}}).call(this);


//sticky parent execution

$(document).ready(function() {

  // sticky header set up ###########//
  (function() {
    var reset_scroll;

    // set the sticky headers and behavior when 
    // stuck and unstuck of the secondary
    return $(".sticky-header, .secondary").stick_in_parent({
      parent: ".sticky-parent"
    }).on("sticky_kit:stick", function(e) {
      if($('#secondary-nav-container').hasClass('is_stuck')) {
        $('#secondary-nav-brand img').addClass('sticky-logo');
      }
    })
    .on("sticky_kit:unstick", function(e) {
        $('#secondary-nav-brand img').removeClass('sticky-logo');
    });

    reset_scroll = function() {
      var scroller;
      scroller = $("body,html");
      scroller.stop(true);
      if ($(window).scrollTop() !== 0) {
        scroller.animate({
          scrollTop: 0
        }, "fast");
      }
      return scroller;
    };

    window.scroll_it = function() {
      var max;
      max = $(document).height() - $(window).height();
      return reset_scroll().animate({
        scrollTop: max
      }, max * 3).delay(100).animate({
        scrollTop: 0
      }, max * 3);
    };

    window.scroll_it_wobble = function() {
      var max, third;
      max = $(document).height() - $(window).height();
      third = Math.floor(max / 3);
      return reset_scroll().animate({
        scrollTop: third * 2
      }, max * 3).delay(100).animate({
        scrollTop: third
      }, max * 3).delay(100).animate({
        scrollTop: max
      }, max * 3).delay(100).animate({
        scrollTop: 0
      }, max * 3);
    };

    $(window).on("resize", (function(_this) {
      return function(e) {
        return $(document.body).trigger("sticky_kit:recalc");
      };
    })(this));

  }).call(this);

  // nav drawer setup ##########################################//
  
  $nav_set = $('#primary-nav li a'); // get the nav
  $nav_drawer = $('#nav-drawer'); // get the nav drawer
  $sub_nav = $('.subnav-block')    // get all the subnav blocks in the drawer

  // nav functions
  $( "#primary-nav li a" ).on( "click", function(e) {
    e.preventDefault();

    // if user has scrolled deep in to the page, get back to the top
    $('html,body').animate({ scrollTop: 0 }, 'fast');

    // remove all active classes
    $($nav_set).removeClass('active');
    
    // set up which subnav is desired so the container will respect the height
    // get the index of the selected nav 
    $selected_index = ($($nav_set).index(this));
    
    // remove active class from submenus
    $sub_nav.removeClass('active');
    // show the subnav with the same index and add the active class
    $selected_subnav = $sub_nav.get($selected_index);
    $selected_subnav_height = $($selected_subnav).height() + 75;

    // if user is clicking a nav link already open and set, close it
    if($(this).find('span').hasClass('nav-caret-up')) {
      drawer_toggle($nav_drawer);   // close the drawer
      reset_nav();                  // reset the nav states
    } else {
      // reset the uninvolved carets
      $($nav_set).each(function(){
        if(!$(this).hasClass('active')) {
          $(this).find('span').removeClass('nav-caret-up').addClass('nav-caret-down');
        }
      });

      $(this).addClass('active'); // add active class to clicked anchor
      
      if($($nav_drawer).hasClass('open')) {
        $($selected_subnav).addClass('active');
        $nav_drawer.animate({
            height: $selected_subnav_height
          }, 250, function() {
        });
      } else {
        $($selected_subnav).addClass('active');
      }
      // all set up - if drawer is not open, open it
      if(!$($nav_drawer).hasClass('open')) {
        drawer_toggle($nav_drawer);
      }
      toggle_caret(this);
    };
  });

   // add slidedown animation to Bootstrap dropdown //
  $('.dropdown').on('show.bs.dropdown', function(e){
    $(this).find(".nav-caret-down").removeClass('nav-caret-down').addClass('nav-caret-up');
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
  });

  // add slideup animation to Bootstrap dropdown //
  $('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find(".nav-caret-up").removeClass('nav-caret-up').addClass('nav-caret-down');
    $(this).find('.dropdown-menu').first().stop(true, true).hide();
  });

  // off canvas close button
  $('.offcanvas-close').on('click', function(e){
    close_off_canvas();
  });
  
  $('.close-drawer a').on('click', function(e){
    e.preventDefault();
    close_drawer();
  });
  
  // toggle secondary nav carets
  $('#secondary-nav li.dropdown a').on('click', function(e){
    toggle_caret(this);
  });

  // hide the off canvas menu if wider than 768px
  var hide_off_canvas_for_wide;
  function testWinSize(){
    hide_off_canvas_for_wide = $(window).width() > 768; // BOOLEAN

    if(hide_off_canvas_for_wide){
      if($('.offcanvas').hasClass('canvas-slid')) {
        $('#masthead .navbar-toggle').click();
      }
    }
  }

  // check on load and resize if the offcanvas menu is behaving
  $(window).on("load resize", testWinSize);

  //toggle language menu 
  $('.dropdown-toggle').click(function() {
    $('.lang-dropdown').toggle("fast");
  });

});


// open close the secondary nav drawer
drawer_toggle = function($drawer) {
  $drawer.slideToggle('fast', function() { 
    $drawer.toggleClass('open');
  });
}

// explicit close of secondary nav drawer
close_drawer = function() {
  $drawer = $('#nav-drawer');
  $drawer.slideUp().toggleClass('open');
  reset_nav();
}

// function to toggle the carets!
toggle_caret = function($el) {
  $caret = $($el).find('span');
  $caret.toggleClass('nav-caret-down').toggleClass('nav-caret-up');
}

// function to reset the primary nav carets
reset_nav = function() {
  $nav_set = $("#primary-nav li a");
  $nav_set.removeClass('active');
  $nav_set.find('span.nav-caret-up').removeClass('nav-caret-up').addClass('nav-caret-down');
}

// explicit close of offcanvas menu
close_off_canvas = function() {
  $('#masthead .navbar-toggle').click();
}
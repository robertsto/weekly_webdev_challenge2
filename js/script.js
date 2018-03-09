//scrolling page to section
jQuery(document).ready(function(jQuery) {            
  var topMenu = jQuery("#ul_navigation"),
      offset = 40,
      topMenuHeight = topMenu.outerHeight()+offset,
      // All list items
      menuItems =  topMenu.find('a[href*="#"]'),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var href = jQuery(this).attr("href"),
        id = href.substring(href.indexOf('#')),
        item = jQuery(id);
        //console.log(item)
        if (item.length) { return item; }
      });

    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      var href = jQuery(this).attr("href"),
        id = href.substring(href.indexOf('#'));
          offsetTop = href === "#" ? 0 : jQuery(id).offset().top-topMenuHeight+1;
      jQuery('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });

    // Bind to scroll
    jQuery(window).scroll(function(){
       // Get container scroll position
       var fromTop = jQuery(this).scrollTop()+topMenuHeight;

       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if (jQuery(this).offset().top < fromTop)
           return this;
       });

       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";               
       
       menuItems.parent().removeClass("active");
       if(id){
            menuItems.parent().end().filter("[href*='#"+id+"']").parent().addClass("active");
       }
       
    })
})


// change menu size
$(document).on("scroll",function(){
  if($(document).scrollTop()>50){ 
    $("#navbar_fixed").removeClass("navbar_large").addClass("navbar_small");
    }
  else{
    $("#navbar_fixed").removeClass("navbar_small").addClass("navbar_large");
    }
});


// hide scroll icon
$(document).on("scroll",function(){
  if($(document).scrollTop()>100){ 
    $("#scroll_animation").removeClass("scroll_ico").addClass("scroll_ico_hiding");
    }
  else{
    $("#scroll_animation").removeClass("scroll_ico_hiding").addClass("scroll_ico");
    }
});


// close menu
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

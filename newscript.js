$(document).ready(function () {
  var windowHeight = $(window).height();
  var $pageContent = $('.page-content');
  var pageContentHeight = $pageContent.outerHeight();
  var middleTop = Math.round(pageContentHeight / 2 - windowHeight / 2);
  var middleBottom = Math.round(pageContentHeight / 2 + windowHeight / 2);

  if ($pageContent.hasClass('home')) {
    console.log('here');
		$('html').addClass('is-home');

    var scrollToMiddle = function () {
				$(window).scrollTop(pageContentHeight / 2 - windowHeight / 2);
		}
		scrollToMiddle();

    $('body').addClass('page-loaded');
		$('.loading').remove();
    var ww = $(window).width();
    var wh = $(window).height();

    var renderer = PIXI.autoDetectRenderer(ww, wh, { transparent: true });
		$('body').prepend(renderer.view);

		var stage = new PIXI.Container(0xffffff, true);

    var picTexture = PIXI.Texture.fromImage('exptest.png');

    var pic = new PIXI.Sprite(picTexture);
		pic.anchor.x = 0.5;
		pic.anchor.y = 0.5;
		pic.position.x = ww/2;
		pic.position.y = wh/2;
		stage.addChild(pic);

    var picBlurFilter = new PIXI.filters.BlurFilter();
    picBlurFilter.blur = 0;

    var picTwistFilter = new PIXI.filters.TwistFilter();
    picTwistFilter.radius = 0;
    picTwistFilter.angle = 1.8;
    picTwistFilter.offset.x = 0.55;
    picTwistFilter.offset.y = 0.9;

    var picDisplacementSprite = PIXI.Sprite.fromImage('displacement_map.jpg');
		stage.addChild(picDisplacementSprite);
		var picDisplacementFilter = new PIXI.filters.DisplacementFilter(picDisplacementSprite);
		picDisplacementFilter.scale.x = 0;
		picDisplacementFilter.scale.y = 0;

    pic.filters = [
      picBlurFilter,
      picTwistFilter,
      picDisplacementFilter,
    ];

    var middle = Math.floor(pageContentHeight/2 - windowHeight/2);
    console.log(middle);
    var count = 0;

    function animate() {
      $(window).scroll(function(e) {
        console.log(middle);
        var scroll = $(window).scrollTop();
        var delay = 100; // number of pixels to wait before applying effect
        var factorPic = (scroll-middle-delay)/(wh*3);

        //Pic
        if (scroll > (middle+100)) {
          stage.setChildIndex(pic, 1);
          picBlurFilter.blur = (scroll-(middle-100))/400;
          picTwistFilter.radius = factorPic;
          picDisplacementFilter.scale.x = factorPic * 10;
          picDisplacementFilter.scale.y = factorPic * 100;
          pic.scale = new PIXI.Point(factorPic*2 + 1, factorPic*2 + 1);
        } else {
          picBlurFilter.blur = 0;
          picTwistFilter.radius = 0;
        }
      });
      // Animate displacement
      picDisplacementSprite.x = count*10;
      picDisplacementSprite.y = count*20;

      count += 0.05;

	    requestAnimationFrame(animate);
	    renderer.render(stage);
		}
		animate();
  }
});

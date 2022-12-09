"use strict";
(function () {
	// Global variables
	var userAgent = navigator.userAgent.toLowerCase(),
		initialDate = new Date(),

		$document = $( document ),
		$window = $( window ),
		$html = $( "html" ),
		$body = $( "body" ),

		isDesktop = $html.hasClass( "desktop" ),
		isIE = userAgent.indexOf( "msie" ) !== -1 ? parseInt( userAgent.split( "msie" )[ 1 ], 10 ) : userAgent.indexOf( "trident" ) !== -1 ? 11 : userAgent.indexOf( "edge" ) !== -1 ? 12 : false,
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ),
		windowReady = false,
		isNoviBuilder = false,
		loaderTimeoutId,

		plugins = {
			
			materialParallax:        $( ".parallax-container" ),
			counter:                 $( ".counter" ),
			particlesJs:             $( '#particles-js' )
		};


	
	function isScrolledIntoView ( elem ) {
		if ( isNoviBuilder ) return true;
		return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
	}


	// Initialize scripts that require a finished document
	$( function () {
		
		// jQuery Count To
		if ( plugins.counter.length ) {
			for ( var i = 0; i < plugins.counter.length; i++ ) {
				var $counterNotAnimated = $( plugins.counter[ i ] ).not( '.animated' );
				$document.on( "scroll", $.proxy( function () {
					var $this = this;

					if ( (!$this.hasClass( "animated" )) && (isScrolledIntoView( $this )) ) {
						$this.countTo( {
							refreshInterval: 40,
							from:            0,
							to:              parseInt( $this.text(), 10 ),
							speed:           $this.attr( "data-speed" ) || 1000
						} );
						$this.addClass( 'animated' );
					}
				}, $counterNotAnimated ) )
					.trigger( "scroll" );
			}
		}

		// Material Parallax
		if ( plugins.materialParallax.length ) {
			if ( !isNoviBuilder && !isIE && !isMobile ) {
				plugins.materialParallax.parallax();

				// heavy pages fix
				$window.on( 'load', function () {
					setTimeout( function () {
						$window.scroll();
					}, 500 );
				} );
			} else {
				for ( var i = 0; i < plugins.materialParallax.length; i++ ) {
					var parallax = $( plugins.materialParallax[ i ] ),
						imgPath = parallax.data( "parallax-img" );

					parallax.css( {
						"background-image": 'url(' + imgPath + ')',
						"background-size":  "cover"
					} );
				}
			}
		}

		// particlesJs
		if ( plugins.particlesJs.length ) {
			particlesJS( 'particles-js', {
				"particles":     {
					"number":      {
						"value":   200,
						"density": {
							"enable":     true,
							"value_area": 800
						}
					},
					"color":       {
						"value": "#000000"
					},
					"shape":       {
						"type":    "circle",
						"stroke":  {
							"width": 0,
							"color": "#000000"
						},
						"polygon": {
							"nb_sides": 5
						},
						"image":   {
							"src":    "img/github.svg",
							"width":  100,
							"height": 100
						}
					},
					"opacity":     {
						"value":  0.5,
						"random": false,
						"anim":   {
							"enable":      false,
							"speed":       1,
							"opacity_min": 0.1,
							"sync":        false
						}
					},
					"size":        {
						"value":  5,
						"random": true,
						"anim":   {
							"enable":   false,
							"speed":    40,
							"size_min": 0.1,
							"sync":     false
						}
					},
					"line_linked": {
						"enable":   true,
						"distance": 150,
						"color":    "#000000",
						"opacity":  0.4,
						"width":    1
					},
					"move":        {
						"enable":    true,
						"speed":     6,
						"direction": "none",
						"random":    true,
						"straight":  false,
						"out_mode":  "out",
						"attract":   {
							"enable":  false,
							"rotateX": 600,
							"rotateY": 1200
						}
					}
				},
				"interactivity": {
					"detect_on": "canvas",
					"events":    {
						"onhover": {
							"enable": true,
							"mode":   "grab"
						},
						"onclick": {
							"enable": true,
							"mode":   "push"
						},
						"resize":  true
					},
					"modes":     {
						"grab":    {
							"distance":    400,
							"line_linked": {
								"opacity": 1
							}
						},
						"bubble":  {
							"distance": 400,
							"size":     40,
							"duration": 2,
							"opacity":  8,
							"speed":    3
						},
						"repulse": {
							"distance": 200
						},
						"push":    {
							"particles_nb": 4
						},
						"remove":  {
							"particles_nb": 2
						}
					}
				},
				"retina_detect": true,
				"config_demo":   {
					"hide_card":           false,
					"background_color":    "#b61924",
					"background_image":    "",
					"background_position": "50% 50%",
					"background_repeat":   "no-repeat",
					"background_size":     "cover"
				}
			} )
		}

		

	} );
}());
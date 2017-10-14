$(function() {
	/*banner*/
	if($('#slides').length){
		$('#slides').slidesjs({
			play:{
				active: false,
				effect: "fade",
				auto: true,
				interval: 4000
			},
			effect: {
				fade: {
				speed: 1500,
				crossfade: true
				}
			},
			pagination: {
				active: true
			},
			navigation:{
				active: false
			}
		});
	}
});
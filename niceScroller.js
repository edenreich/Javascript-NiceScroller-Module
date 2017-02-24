(function(window, document) {

	'use stricts';

	var elements;

	var pageYOffsetTop;
	var pageYOffsetBottom;


	var NiceScroller = {
		
		init: function() {
			// fetch all the elements with class of 'nice'.
			elements = this.fetchElements();

			// hide the elements with the class of 'nice' initially.
			this.hideAll(elements);

			// listen to the scroll event and update the current scroll position.
			window.onscroll = this.scrolling.bind(this);
		},

		/**
		 * fetching all the classes that should be animated.
		 */
		fetchElements: function() {
			var elements = document.getElementsByClassName('nice');
			var elementCollection = [];
			var effect;

			for(var i = 0; i < elements.length; i++) {
				
				if(elements[i].className.split(' ').pop() == 'nice') {
					effect = null;
				} else {
					effect = elements[i].className.split(' ').pop();
					elements[i].className = elements[i].className.substring(0, elements[i].className.indexOf('nice')+4);
				}

				elementCollection.push({
					node: elements[i],
					effectClass: effect
				});
			}

			return elementCollection;
		},

		/**
		 * update the current positions of the window.
		 */
		scrolling: function() {
			pageYOffsetTop = window.pageYOffset;
			pageYOffsetBottom = window.pageYOffset + window.innerHeight;
			
			for (var i = 0; i < elements.length; i++) {
				if(pageYOffsetTop < elements[i].node.offsetTop 
					&& pageYOffsetBottom > elements[i].node.offsetTop
					&& !elements[i].node.hasClass('animated')) {
					
					this.inSight.call(elements[i].node, elements[i].effectClass);
				}
			}
		},

		/**
		 * hide the requested elements. 
		 */
		hideAll: function(elements) {
			for(var i = 0 ; i < elements.length; i++) {
				elements[i].node.style.opacity = '0';	
			}
		},

		/**
		 * the event that would be could once an nice element is in sight.
		 */
		inSight: function(effect) {
			if(effect === null)
				this.className = this.className + ' fade-in animated';

			this.className = this.className + ' ' + effect + ' animated';
		}
	};

	NiceScroller.init();
	
}(window, document));
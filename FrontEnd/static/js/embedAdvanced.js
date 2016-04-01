(function(window){
	var embedIDs = 1,
		scrollTimer = -1,
		previousHeight = {},

		con = {
			log: function(s){console.log(s);},
			warn: function(s){console.warn?console.warn(s):console.log(s);},
			error: function(s){console.error?console.error(s):console.log(s);}
		},
		tgbDivs = (function(){
			var divs = [],
				elems = document.getElementsByClassName('tagboard-embed');
			for (var i = 0; i < elems.length; ++i) {
				if (elems[i].nodeName === 'DIV') {
					divs.push(elems[i]);
				}
			}
			return divs;
		})(),
		tgbDomain = (window.tagboardOptions && window.tagboardOptions.domain) || window.tagboardDomain || "https://tagboard.com",

		pageScrolled = function _pageScrolled() {
			if (scrollTimer != -1) {
				clearTimeout(scrollTimer);
			}

			scrollTimer = window.setTimeout(scrollFinished, 50);
		},

		execForFrames = function _execForFrame(func, frame_id) {
			// Optional frame_id to run for specific embed frame
			var iframes = document.getElementsByClassName('tagboard-iframe');
			for (var i = 0; i < iframes.length; ++i) {
				var ifrm = iframes[i],
					match = ifrm.getAttribute('tgb-frame-id') == frame_id;
				if (ifrm.tagName.toLowerCase() === 'iframe' && (!frame_id || match)) {
					func(ifrm);
					if (frame_id) {
						return;
					}
				}
			}
		},

		scrollFinished = function _scrollFinished(frame_id) {
			execForFrames(function(ifrm){
				var divYOffset = 0;

				for (var element = ifrm; element != null; element = element.offsetParent) {
					divYOffset += element.offsetTop;
				}

				ifrm.contentWindow.postMessage('scrollPos:' + Math.max(0, window.pageYOffset - divYOffset), tgbDomain);
			}, frame_id);
		},

		setFrameHeight = function _setFrameHeight(height, frame_id){
			execForFrames(function(ifrm){
				if(ifrm.getAttribute('fixed-height') != 1) {
					var prev = parseInt(ifrm.style.height, 10),
						newHeight = height,
						event = document.createEvent("CustomEvent");

					if (height < prev && previousHeight[frame_id] !== height) { newHeight = prev;	}

					ifrm.style.height = newHeight + "px";

					// Fire off event only if height has changed
					if(previousHeight[frame_id] !== height) {
						event.initCustomEvent("tgb.embedHeight", true, true, { height: height, iframe: ifrm }); // Because IE
						window.dispatchEvent(event);
					}

					previousHeight[frame_id] = height;
				}
			}, frame_id);
		},

		tagboardAuthWindow,
		authRequested = function _authRequested(network, doConnect) {
			var top = (window.innerHeight / 2) - 300;
				left = (window.innerWidth / 2) - 400,
				authUrl = tgbDomain + "/u/auth_child?network=" + network + "&connect=" + (doConnect ? "1" : "");
			tagboardAuthWindow = window.open(authUrl, "tgbauthwin", "width=800,height=600,resizable=1,location=1,top="+top+",left="+left);
			// check for window open fail - i.e. pop-up blocker doing it's thing
			if (!tagboardAuthWindow) {
				return window.tagboardAuthComplete(false, "The auth window was blocked. Please allow it to be opened and try again.");
			}

			function checkChild() {
				if (tagboardAuthWindow.closed) {
					return window.tagboardAuthComplete(true);
				}
				setTimeout(checkChild, 500);
			}

			checkChild();
		},

		insertIFrame = function _insertIFrame(div, options) {
			var opts = [],
				layout = "",
				embedID = embedIDs++;

			if (options.mobilePostCount) { opts.push('mpc=' + options.mobilePostCount); }
			if (options.postCount) { opts.push('pc=' + options.postCount); }
			if (options.layout) { layout = "/" + options.layout; }
			if (options.inlineMedia) { opts.push('im=' + !!options.inlineMedia); }
			if (options.inverted) { opts.push('in=' + !!options.inverted); }
			if (options.animationType) { opts.push('at=' + options.animationType); }
			if (options.toolbar) { opts.push('tb=' + options.toolbar); }
			if (options.mediaOnly) { opts.push('mo=' + !!options.mediaOnly); }
			if (options.feedType) { opts.push('ft=' + options.feedType); }
			if (options.hashtagColor) { opts.push('hc=' + options.hashtagColor); }
			if (options.fontColor) { opts.push('fc=' + options.fontColor); }
			if (options.bgColor) { opts.push('bc=' + options.bgColor); }
			if (options.roundedCorners) { opts.push('rc=' + !!options.roundedCorners); }
			if (options.infiniteScroll) { opts.push('is=' + !!options.infiniteScroll); }
			if (options.gutter) { opts.push('gutter=' + options.gutter); }
			if (options.adSupported) { opts.push('as=' + !!options.adSupported); }
			if (options.adSupported && options.adDimensions) { opts.push('ad=' + options.adDimensions); }
			if (options.adSupported && options.adURI) { opts.push('au=' + options.adURI); }
			if (options.disableHashtag) { opts.push('dh=' + !!options.disableHashtag); }
			if (options.largePostPosition) { opts.push('bp=' + options.largePostPosition); }


			opts.push('id='+embedID);
			opts = '#' + opts.join('&');

			var ifrm = document.createElement("IFRAME");
			ifrm.setAttribute("src", tgbDomain + "/" + options.tagboard + "/embed" + layout + opts);
			ifrm.setAttribute("onload", "tagboardQueryHeight("+embedID+")");
			ifrm.setAttribute("frameborder", "0");
			ifrm.setAttribute("class", "tagboard-iframe");
			ifrm.setAttribute("tgb-frame-id", embedID);
			ifrm.name="tagboard";
			ifrm.setAttribute("style", "width:100%;");
			if (options.fixedHeight) {
				ifrm.setAttribute("fixed-height", "1");
				ifrm.style.height = "100%";
			} else {
				ifrm.style.height = "600px"; // Default initial height
				ifrm.setAttribute("scrolling", "no");
			}
			div.appendChild(ifrm);
		},

		handleFrameMessage = function _handleFrameMessage(e) {
			if (e.origin == tgbDomain) {
				var dataObj = {};
				e.data.split('&').forEach(function(e){
					var d = e.split(':');
					dataObj[d[0]] = d.length > 1 ? d[1] : d[0];
				});

				if (dataObj.height) {
					setFrameHeight(parseInt(dataObj.height), dataObj.frame_id);

					if(dataObj.height > 600) {

					}
				}

				if (dataObj.auth) {
					authRequested(dataObj.auth, dataObj.frame_id);
				}
			}
		};

	if (tgbDivs.length > 0) {
		tgbDivs.forEach(function(div){
			var options = {
				tagboard: div.getAttribute('tgb-slug'),
				layout: div.getAttribute('tgb-layout'),
				mobilePostCount: div.getAttribute('tgb-mobile-count'),
				postCount: div.getAttribute('tgb-post-count'),
				fixedHeight: div.getAttribute('tgb-fixed-height') === 'true',
				inlineMedia: div.getAttribute('tgb-inline-media') === 'true',
				inverted: div.getAttribute('tgb-inverted') === 'true',
				animationType: div.getAttribute('tgb-animation-type'),
				toolbar: div.getAttribute('tgb-toolbar'),
				mediaOnly: div.getAttribute('tgb-media-only') === 'true',
				feedType: div.getAttribute('tgb-feed-type'),
				hashtagColor: div.getAttribute('tgb-hashtag-color'),
				fontColor: div.getAttribute('tgb-font-color'),
				bgColor: div.getAttribute('tgb-bg-color'),
				gutter: div.getAttribute('tgb-gutter'),
				roundedCorners: div.getAttribute('tgb-rounded-corners') === 'true',
				infiniteScroll: div.getAttribute('tgb-infinite-scroll') === 'true',
				adSupported: div.getAttribute('tgb-ad-supported') === 'true',
				adDimensions: div.getAttribute('tgb-ad-dimensions'),
				adURI: div.getAttribute('tgb-ad-uri'),
				disableHashtag: div.getAttribute('tgb-disable-hashtag') === 'true',
				largePostPosition: div.getAttribute('tgb-large-position')
			};

			if (options.tagboard) {
				insertIFrame(div, options);
			}
		});
	} else {
		con.error("Tagboard script expected DIV with class: 'tagboard-embed'");
		return;
	}

	window.tagboardQueryHeight = function queryHeight(frame_id) {
		execForFrames(function(ifrm){
			ifrm.contentWindow.postMessage('height?', tgbDomain);
			scrollFinished(frame_id);
		}, frame_id);
	}

	window.tagboardAuthComplete = function _tagboardAuthComplete(success, failMessage) {
		var authMessage = ["authComplete", success ? "1" : "", failMessage].join(":");
		// close the auth child window
		tagboardAuthWindow && typeof tagboardAuthWindow.close === "function" && tagboardAuthWindow.close();
		// notify the embed of the auth status

		execForFrames(function(ifrm){
			ifrm.contentWindow.postMessage(authMessage, tgbDomain);
		});
	}

	window.handleFrameMessage = handleFrameMessage;
	window.pageScrolled = pageScrolled;

	window.addEventListener('message', window.handleFrameMessage, false);
	window.addEventListener('scroll', window.pageScrolled, false);

	if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
		window.addEventListener('resize', function() {
			execForFrames(function(ifrm){
				ifrm.style.width = ifrm.parentNode.clientWidth + "px";
				setTimeout(function(){ ifrm.style.width = "100%"; }, 250);
			});
		}, true);
	}
})(window);
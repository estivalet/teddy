/**
 * 
 * @param {*} str 
 */
function baseName(str) {
	var base = new String(str).substring(str.lastIndexOf('/') + 1); 
	return base;
}

/**
 * 
 * @param {*} x 
 */
function rand(x) {
	return Math.random() * x >> 0;
}

/**
 * 
 * @param {*} path 
 * @param {*} success 
 * @param {*} error 
 */
function loadJSON(path, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success) {
					success(JSON.parse(xhr.responseText));
                }
			} else {
				if (error) {
					error(xhr);
                }
			}
		}
	};
	xhr.open("GET", path, true);
	xhr.send();
}

function timestamp() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }


function convertImageDataToImage(imagedata) {
	return new Promise((resolve, reject) => {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = imagedata.width;
		canvas.height = imagedata.height;
		ctx.putImageData(imagedata, 0, 0);
	
		var image = new Image();
		image.onload = () => resolve(image)
		image.onerror = reject
		image.src = canvas.toDataURL();
	});
}
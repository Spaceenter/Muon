$(function() {

	$("#calculate").click(function() {
		$("#result").css("display", "block");

		var l1 = parseFloat($("input[name=l1]").val());
		var w1 = parseFloat($("input[name=w1]").val());
		var l2 = parseFloat($("input[name=l2]").val());
		var w2 = parseFloat($("input[name=w2]").val());
		var loff = parseFloat($("input[name=loff]").val());
		var woff = parseFloat($("input[name=woff]").val());
		var distance = parseFloat($("input[name=distance]").val());
		var n_event = parseFloat($("input[name=n_event]").val());
		var norm_rate = parseFloat($("input[name=norm_rate]").val());

		var percentage = get_accepted_ratio(l1, w1, l2, w2, loff, woff, distance, n_event);
		var cos_theta;
		if (distance == 0 && loff == 0 && woff == 0) {
			cos_theta = 1;
		} else {
			cos_theta = distance / Math.sqrt(distance*distance + loff*loff + woff*woff);
		}
		var rate_min = l1 * w1 * norm_rate * percentage;
		var rate_min_norm = rate_min / cos_theta / cos_theta;

		$("#percentage").text(format_floating_point_number(percentage * 100));
		$("#rate_min").text(format_floating_point_number(rate_min));
		$("#rate_hour").text(format_floating_point_number(rate_min * 60));
		$("#cos_theta").text(format_floating_point_number(cos_theta));
		$('#rate_min_norm').text(format_floating_point_number(rate_min_norm));
		$('#rate_hour_norm').text(format_floating_point_number(rate_min_norm * 60));
	});

	function get_accepted_ratio(l1, w1, l2, w2, loff, woff, distance, n_event) {
		var n_accepted = 0;
		for(var i = 0; i < n_event; i++) {
			var x = (Math.random() - 0.5) * l1;
			var y = (Math.random() - 0.5) * w1;
			var theta = generate_theta();
			var phi = Math.random() * 2 * Math.PI;
			var x_low = x + distance * Math.tan(theta) * Math.cos(phi) + loff;
			var y_low = y + distance * Math.tan(theta) * Math.sin(phi) + woff;
			if (x_low > -0.5*l2 && x_low < 0.5*l2 && y_low > -0.5*w2 && y_low < 0.5*w2) {
				n_accepted += 1;
			}
		}
		return n_accepted/n_event;
	}

	function generate_theta() {
		while (true) {
			var theta = Math.random() * 0.5 * Math.PI;
			var pdf = Math.cos(theta) * Math.cos(theta) * Math.sin(theta); 
			var pdf_r = Math.random() * 2.0 / 3.0 / Math.sqrt(3);
			if (pdf_r < pdf) return theta;
		}
	}

	function format_floating_point_number(num) {
		return parseFloat(Math.round(num * 100) / 100).toFixed(2)
	}

});
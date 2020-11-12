
//# sourceMappingURL=forms.js.map

/*
	форма Поиска
	------------------------------------------
	использованные библиотеки:
 	------------------------------------------ */
(function() {

	var $form = $("[data-form=\"search\"]");

	if (!$form["length"]) return false;

	var $inp = $form.find(".form-control");
	var placeholder = {
		"desktop": 	$inp.data("placeholder-desktop"),
		"phone": 		$inp.data("placeholder-phone")
	};

	var check = function() {
		$inp.attr("placeholder", typeof DEVICE!="undefined" ? placeholder[DEVICE] : placeholder["desktop"]);
	};

	check();

	$(document).bind("eventDevice", function() {
		check();
	});

})();
//------------------------------------------




/*
	форма Авторизации
	------------------------------------------
	использованные библиотеки:
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

})();
//------------------------------------------




/*
	форма Купить в 1 клик
	------------------------------------------
	использованные библиотеки:
	- http://robinherbots.github.io/Inputmask/
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

	var $form = $("[data-form=\"order\"]");

	if (!$form["length"]) return false;

	//маски
	$form.find("[data-inputmask]").inputmask({
		showMaskOnHover: false,
		placeholder: "_"
	});

})();
//------------------------------------------




/*
	форма Фильтрации
	------------------------------------------
	использованные библиотеки:
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

	var $form = $("[data-form=\"filters\"]");

	if (!$form["length"]) return false;

	var $modal 	= $(".modal--filters");
	var $sort 	= $form.find("[name=\"sort\"]");

	$form
		.find("[data-button=\"sort\"]").on("click", function(e) {
			var $btn = $(this);
			var sort = $sort.val();
			if (sort=="desc") {
				$sort.val("asc");
				$btn
					.removeClass("sort--desc")
					.addClass("sort--asc");
			} else {
				$sort.val("desc");
				$btn
					.removeClass("sort--asc")
					.addClass("sort--desc");
			}
			e.preventDefault();
		});


	$modal
		.on("shown.bs.modal", function() {
			//модалка открылась
		})
		.on("hidden.bs.modal", function() {
			//модалка закрылась
		});

	$form
		.find("[data-button=\"apply\"]").on("click", function() {
			alert("видимо должна страница перезагрузиться с новыми параметрами");
		}).end()
		.find("[data-button=\"reset\"]").on("click", function() {
			$(this).parents(".modal").find("[type=\"checkbox\"]").prop("checked", false);
		});
})();
//------------------------------------------




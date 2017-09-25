$(function() {

  	// jquery coding inside this function
  	let key = 'uvF145qvSLKIWMiedZfpdGxSH8lmHajb';

  	let portfolioHTML = $('#portfolio-template').text();
	let portfolioTemplate = Template7(portfolioHTML).compile();

 	if($('#behance-api').length>0){


		let urlProjects = 'https://api.behance.net/v2/users/ilonaveresk/projects?client_id='+key; 
		$.ajax({
			url: urlProjects,
			dataType: 'jsonp',
			success: function(res){

				let currentPage = 1;

				let projects = res.projects;

				function showPortfolios(pageNumber){

					let startIndex = (pageNumber - 1) * 6;
					let endIndex = startIndex + 5;

					if(endIndex > projects.length - 1){
						endIndex = projects.length - 1;
					}

					$('.project-container').empty()
					for(i=startIndex; i<=endIndex; i++){

						let project = projects[i];
						let output = portfolioTemplate(project);
						$(output).appendTo('.project-container')						
				
					}

				}

				showPortfolios(currentPage);
				
			}			
		});
	}


// ================  MAP  ==================

	let center = [55.7765730186677,37.705078125];
	let map = L.map('map', {attributionControl: false}).setView(center,4);
	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhhbHl4OTAiLCJhIjoiY2o2YjdrZHRlMWJmYjJybDd2cW1rYnVnNSJ9.j_DQLfixHfhioVjH6qmqkw').addTo(map);

	
	let location =[
					{
						latlng:[55.727110085045986,37.705078125],
						description: 'Moscow, RUSSIA',
						content:'<img src="images/moscow-map.jpg">',
						iconImage: 'images/pointer.svg'
					}
					];

	_(location).each(function(city){

		let pointerIcon = L.icon({
									iconUrl: city.iconImage,
									iconSize:[50,50]
								});
		let marker = L.marker(city.latlng,{icon:pointerIcon}).addTo(map);
		marker.bindPopup('<div class="pop-up">'+city.description+city.content+'</div>')


	});

});



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
				let projects = res.projects;

				let currentPage = 1;

				let lastPage = Math.ceil(projects.length/6);

				

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

				$('.arrows .fa-angle-down').on('click',function(){
					currentPage++;

					if(currentPage > lastPage){
						currentPage = lastPage;
					}
					showPortfolios(currentPage);
				});

				$('.arrows .fa-angle-up').on('click',function(){
					currentPage--;

					if(currentPage < 1){
						currentPage = 1;
					}
					showPortfolios(currentPage);
				});
				
			}			
		});

		let urlUser = 'https://api.behance.net/v2/users/ilonaveresk?client_id='+key; 
		$.ajax({
			url: urlUser,
			dataType: 'jsonp',
			success: function(res){
			
				let user = res.user;
				$('.about-text h1').text(user.display_name);
				$('.about-text .company').text(user.company);
				$('.about-text .city').text(user.location);
				$('.about-text .social-media a').attr('href',user.social_links["0"].url);
				$('.about-text .social-media a').text(user.social_links["0"].url);
				$('.about-text .social-media2 a').attr('href',user.social_links["2"].url);
				$('.about-text .social-media2 a').text(user.social_links["2"].url);
				$('.about-text .website').text(user.website);

				console.log(res);
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

	//---------- Draw Graphs

	let viewsData = [
		{name:'bla', value:100},
		{name:'bla1', value:150},
		{name:'bla2', value:120},
		{name:'bla3', value:150},
	];

	let width = 400;
	let height = 300;
	let margin = 50;
	let viewsGraph = d3.select('#views').append('g');
	viewsGraph.attr('transform','translate('+margin+','+margin+')')
							


	viewsGraph.selectAll('rect')
		.data(viewsData)
		.enter()
		.append('rect')
		.attr('height',function(d){ return d.value})
		.attr('width',40)
		.attr('x',function(d,i){ return i*80})
		.attr('y',function(d){ return height - d.value})




	let apprecData = [
		{name: 'dada', value: 20},
		{name: 'dada', value: 40},
		{name: 'dada', value: 60},
		{name: 'dada', value: 80},
	];

	let apprecGraph = d3.select('#appreciations').append('g');
	apprecGraph.attr('transform','translate('+margin+','+margin+')')


	apprecGraph.selectAll('rect')
		.data(apprecData)
		.enter()
		.append('rect')
		.attr('height',function(d){ return d.value})
		.attr('width',40)
		.attr('x',function(d,i){ return i*80})
		.attr('y',function(d){ return height - d.value})





	let follData = [
		{name: 'jaja', value: 30},
		{name: 'jaja', value: 80},
		{name: 'jaja', value: 110},
		{name: 'jaja', value: 90},
	];

	let follGraph = d3.select('#followers').append('g');
	follGraph.attr('transform','translate('+margin+','+margin+')')

	follGraph.selectAll('rect')
		.data(follData)
		.enter()
		.append('rect')
		.attr('height',function(d){ return d.value})
		.attr('width',40)
		.attr('x',function(d,i){ return i*80})
		.attr('y',function(d){ return height - d.value})





	let followingData = [
		{name: 'gaga', value: 70},
		{name: 'gaga', value: 60},
		{name: 'gaga', value: 120},
		{name: 'gaga', value: 80},
	];

	let followingGraph = d3.select('#following').append('g');
	followingGraph.attr('transform','translate('+margin+','+margin+')')

	followingGraph.selectAll('rect')
		.data(followingData)
		.enter()
		.append('rect')
		.attr('height',function(d){ return d.value})
		.attr('width',40)
		.attr('x',function(d,i){ return i*80})
		.attr('y',function(d){ return height - d.value})
});













